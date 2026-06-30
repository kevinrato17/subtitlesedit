(() => {
  const fileEl = document.getElementById("rollupFile");
  const btn = document.getElementById("rollupBtn");
  const out = document.getElementById("rollupOutput");
  const clearBtn = document.getElementById("btnRollupClear");
  const statusEl = document.getElementById("rollupFileStatus");
  const inputPreviewEl = document.getElementById("rollupInputPreview");
  const outputPreviewEl = document.getElementById("rollupOutputPreview");
  if (!btn || !out) return;

  const PREVIEW_CUE_LIMIT = 50;

  function buildPreview(cues) {
    if (!cues.length) return "";
    const shown = cues.slice(0, PREVIEW_CUE_LIMIT);
    const lines = ["WEBVTT", ""];
    shown.forEach((c) => {
      lines.push(`${fmtTs(c.start)} --> ${fmtTs(c.end)}`);
      lines.push(c.text);
      lines.push("");
    });
    let text = lines.join("\n").replace(/\n+$/, "") + "\n";
    if (cues.length > PREVIEW_CUE_LIMIT) {
      text += `\n... and ${cues.length - PREVIEW_CUE_LIMIT} more cues (preview truncated)\n`;
    }
    return text;
  }

  const TS_LINE =
    /(\d{2}:\d{2}:\d{2}[.,]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[.,]\d{3})/;
  const MAX_ROLLUP_GAP_MS = 2000;
  const TERMINAL = [".", "!", "?"];

  function parseTs(str) {
    const t = String(str).trim();
    const idx = Math.max(t.lastIndexOf(","), t.lastIndexOf("."));
    const timePart = idx >= 0 ? t.slice(0, idx) : t;
    const msPart = idx >= 0 ? t.slice(idx + 1) : "0";
    const a = timePart.split(":");
    const hh = parseInt(a[0], 10) || 0;
    const mm = parseInt(a[1], 10) || 0;
    const ss = parseInt(a[2], 10) || 0;
    const mmm = parseInt(msPart, 10) || 0;
    return hh * 3600000 + mm * 60000 + ss * 1000 + mmm;
  }

  function fmtTs(ms) {
    let t = Math.max(0, Math.round(ms));
    const mmm = t % 1000;
    t = Math.floor(t / 1000);
    const ss = t % 60;
    t = Math.floor(t / 60);
    const mm = t % 60;
    const hh = Math.floor(t / 60);
    const pad = (n, l) => String(n).padStart(l, "0");
    return `${pad(hh, 2)}:${pad(mm, 2)}:${pad(ss, 2)}.${pad(mmm, 3)}`;
  }

  function parseCues(text) {
    const clean = String(text).replace(/\r/g, "").trim();
    const isVTT = /^WEBVTT/.test(clean);
    const body = isVTT ? clean.replace(/^WEBVTT[^\n]*\n?/, "") : clean;
    const cues = [];
    body.split(/\n{2,}/).forEach((block) => {
      const lines = block.split("\n");
      while (lines.length && lines[0].trim() === "") lines.shift();
      while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
      if (!lines.length) return;
      let tsIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (TS_LINE.test(lines[i])) {
          tsIdx = i;
          break;
        }
      }
      if (tsIdx < 0) return;
      const m = lines[tsIdx].match(TS_LINE);
      cues.push({
        start: parseTs(m[1]),
        end: parseTs(m[2]),
        text: lines.slice(tsIdx + 1).join("\n").trim(),
      });
    });
    return cues;
  }

  function norm(s) {
    return String(s).replace(/\s+/g, " ").trim().toLowerCase();
  }

  function isRollupContinuation(prevText, currText) {
    const pLines = prevText.split("\n").map((l) => l.trim()).filter(Boolean);
    const cLines = currText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!pLines.length || !cLines.length) return false;

    const pFull = norm(pLines.join(" "));
    const cFull = norm(cLines.join(" "));

    // Case A: previous full text is a prefix of current
    if (cFull === pFull) return true;
    if (cFull.startsWith(pFull + " ")) return true;
    if (cFull.startsWith(pFull) && cFull.length > pFull.length) {
      const next = cFull.charAt(pFull.length);
      if (",.!?;:".indexOf(next) >= 0) return true;
    }

    // Case B: two-line cues, top line stable, bottom line growing
    if (pLines.length === 2 && cLines.length === 2) {
      if (norm(pLines[0]) === norm(cLines[0])) {
        const pb = norm(pLines[1]);
        const cb = norm(cLines[1]);
        if (cb === pb) return true;
        if (cb.startsWith(pb + " ")) return true;
        if (cb.startsWith(pb) && cb.length > pb.length) {
          const next = cb.charAt(pb.length);
          if (",.!?;:".indexOf(next) >= 0) return true;
        }
      }
    }

    // Transitional: single-line prev grew into a two-line curr where
    // curr's top line equals prev's text
    if (pLines.length === 1 && cLines.length === 2) {
      if (norm(pLines[0]) === norm(cLines[0])) return true;
    }

    return false;
  }

  function extractNew(committed, prevCleaned) {
    const lines = committed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length <= 1) {
      return committed.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    }
    if (!prevCleaned) {
      return lines.join(" ").replace(/\s+/g, " ").trim();
    }
    const top = lines[0].replace(/\s+$/, "");
    const lastCh = top.charAt(top.length - 1);
    if (TERMINAL.indexOf(lastCh) >= 0) {
      return lines.slice(1).join(" ").replace(/\s+/g, " ").trim();
    }
    return lines.join(" ").replace(/\s+/g, " ").trim();
  }

  function stripWordOverlap(prevText, currText) {
    const pw = prevText.split(/\s+/).filter(Boolean);
    const cw = currText.split(/\s+/).filter(Boolean);
    const punc = /[,.!?;:]+$/;
    const clean = (w) => w.toLowerCase().replace(punc, "");
    let bestK = 0;
    const max = Math.min(pw.length, cw.length);
    for (let k = max; k >= 1; k--) {
      let match = true;
      for (let j = 0; j < k; j++) {
        if (clean(pw[pw.length - k + j]) !== clean(cw[j])) {
          match = false;
          break;
        }
      }
      if (match) {
        bestK = k;
        break;
      }
    }
    return cw.slice(bestK).join(" ").trim();
  }

  function buildChains(cues) {
    if (!cues.length) return [];
    const chains = [];
    let chainStart = cues[0].start;
    let chainLast = cues[0];
    for (let i = 1; i < cues.length; i++) {
      const prev = chainLast;
      const curr = cues[i];
      const gap = curr.start - prev.end;
      if (gap <= MAX_ROLLUP_GAP_MS && isRollupContinuation(prev.text, curr.text)) {
        chainLast = curr;
      } else {
        chains.push({ start: chainStart, end: chainLast.end, raw: chainLast.text });
        chainStart = curr.start;
        chainLast = curr;
      }
    }
    chains.push({ start: chainStart, end: chainLast.end, raw: chainLast.text });
    return chains;
  }

  function flattenChains(chains) {
    const out = [];
    let prevText = "";
    let prevEnd = -Infinity;
    chains.forEach((c) => {
      let text = extractNew(c.raw, prevText);
      if (!text) return;
      if (prevText && c.start - prevEnd <= MAX_ROLLUP_GAP_MS) {
        const stripped = stripWordOverlap(prevText, text);
        if (stripped) text = stripped;
      }
      out.push({ start: c.start, end: c.end, text: text });
      prevText = text;
      prevEnd = c.end;
    });
    return out;
  }

  function mergeUnterminated(cleaned) {
    if (!cleaned.length) return [];
    const merged = [];
    let buf = { ...cleaned[0] };
    for (let i = 1; i < cleaned.length; i++) {
      const c = cleaned[i];
      const lastCh = buf.text.replace(/\s+$/, "").slice(-1);
      if (TERMINAL.indexOf(lastCh) < 0) {
        buf.text = (buf.text.replace(/\s+$/, "") + " " + c.text.replace(/^\s+/, "")).trim();
        buf.end = c.end;
      } else {
        merged.push(buf);
        buf = { ...c };
      }
    }
    merged.push(buf);
    return merged;
  }

  function renderVtt(cues) {
    const lines = ["WEBVTT", ""];
    cues.forEach((c) => {
      lines.push(`${fmtTs(c.start)} --> ${fmtTs(c.end)}`);
      lines.push(c.text);
      lines.push("");
    });
    return lines.join("\n").replace(/\n+$/, "") + "\n";
  }

  function showMessage(html) {
    out.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = html;
    out.appendChild(div);
  }

  if (fileEl) {
    fileEl.addEventListener("change", () => {
      const f = fileEl.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const cues = parseCues(String(e.target.result || ""));
        if (statusEl) {
          statusEl.textContent = cues.length
            ? `Loaded: ${f.name} (${cues.length} cues detected)`
            : `Loaded: ${f.name} (no cues detected)`;
        }
        if (inputPreviewEl) {
          inputPreviewEl.value = buildPreview(cues);
        }
        if (outputPreviewEl) {
          outputPreviewEl.value = "";
        }
      };
      reader.readAsText(f, "UTF-8");
    });
  }

  btn.addEventListener("click", () => {
    const f = fileEl && fileEl.files[0];
    if (!f) {
      showMessage("<em>Please choose a .vtt file.</em>");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const cues = parseCues(String(e.target.result || ""));
      if (!cues.length) {
        showMessage("<em>No subtitle cues found in this file.</em>");
        return;
      }
      const cleaned = mergeUnterminated(flattenChains(buildChains(cues)));
      if (!cleaned.length) {
        showMessage("<em>No content could be extracted from this file.</em>");
        return;
      }
      const text = renderVtt(cleaned);
      const before = cues.length;
      const after = cleaned.length;
      if (outputPreviewEl) {
        outputPreviewEl.value = buildPreview(cleaned);
      }
      out.innerHTML = "";
      const stat = document.createElement("p");
      stat.className = "text-sm text-[#475569] mb-2";
      stat.textContent = `Cleaned: ${before} cues reduced to ${after}.`;
      out.appendChild(stat);
      const link = document.createElement("a");
      link.textContent = "Download cleaned .vtt";
      link.href = URL.createObjectURL(
        new Blob([text], { type: "text/vtt;charset=utf-8" })
      );
      link.download = (f.name || "subtitles").replace(/\.vtt$/i, "") + ".cleaned.vtt";
      link.style.display = "inline-block";
      link.style.color = "#0ea5e9";
      link.style.fontWeight = "600";
      out.appendChild(link);

      const lastCh = cleaned[cleaned.length - 1].text.replace(/\s+$/, "").slice(-1);
      if (TERMINAL.indexOf(lastCh) < 0) {
        const note = document.createElement("p");
        note.className = "text-xs text-[#64748b] mt-2";
        note.textContent =
          "Note: the final cue does not end in terminal punctuation. The source file may have been cut off mid-sentence; the trailing fragment has been preserved as-is.";
        out.appendChild(note);
      }
    };
    reader.readAsText(f, "UTF-8");
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (fileEl) fileEl.value = "";
      if (statusEl) statusEl.textContent = "";
      if (inputPreviewEl) inputPreviewEl.value = "";
      if (outputPreviewEl) outputPreviewEl.value = "";
      out.innerHTML = "";
    });
  }
})();
