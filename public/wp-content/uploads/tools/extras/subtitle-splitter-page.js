(() => {
  const modeEl = document.getElementById("splitMode");
  const valEl = document.getElementById("splitValue");
  const fmtEl = document.getElementById("splitFormat");
  const fileEl = document.getElementById("splitFile");
  const btn = document.getElementById("splitBtn");
  const out = document.getElementById("splitOutput");
  if (!btn || !out) return;

  const TS_LINE =
    /(\d{2}:\d{2}:\d{2}[.,]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[.,]\d{3})/;

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

  function fmtTs(ms, fmt) {
    const sep = fmt === "vtt" ? "." : ",";
    let t = Math.max(0, Math.round(ms));
    const mmm = t % 1000;
    t = Math.floor(t / 1000);
    const ss = t % 60;
    t = Math.floor(t / 60);
    const mm = t % 60;
    const hh = Math.floor(t / 60);
    const pad = (n, l) => String(n).padStart(l, "0");
    return `${pad(hh, 2)}:${pad(mm, 2)}:${pad(ss, 2)}${sep}${pad(mmm, 3)}`;
  }

  // Parse SRT or VTT into [{start, end, text}]. Cue numbers / VTT ids / cue
  // settings are dropped; timing and text are kept.
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
      if (tsIdx < 0) return; // skip WEBVTT/NOTE/STYLE blocks and stray text
      const m = lines[tsIdx].match(TS_LINE);
      cues.push({
        start: parseTs(m[1]),
        end: parseTs(m[2]),
        text: lines.slice(tsIdx + 1).join("\n"),
      });
    });
    return cues;
  }

  // Render one group of cues, renumbered from 1, in the chosen format.
  function renderPart(cues, fmt) {
    const lines = [];
    if (fmt === "vtt") lines.push("WEBVTT", "");
    cues.forEach((c, i) => {
      if (fmt === "vtt") {
        lines.push(`${fmtTs(c.start, "vtt")} --> ${fmtTs(c.end, "vtt")}`);
      } else {
        lines.push(String(i + 1));
        lines.push(`${fmtTs(c.start, "srt")} --> ${fmtTs(c.end, "srt")}`);
      }
      lines.push(c.text || "");
      lines.push("");
    });
    return lines.join("\n").trim() + "\n";
  }

  // Group cues by cue count or by elapsed minutes (whole cues only).
  function splitCues(cues, mode, value) {
    const groups = [];
    if (mode === "minutes") {
      const durMs = (value || 1) * 60000;
      let group = [];
      let anchor = null;
      cues.forEach((c) => {
        if (group.length && c.start - anchor >= durMs) {
          groups.push(group);
          group = [];
          anchor = null;
        }
        if (anchor === null) anchor = c.start;
        group.push(c);
      });
      if (group.length) groups.push(group);
    } else {
      const n = Math.max(1, Math.floor(value || 1));
      for (let i = 0; i < cues.length; i += n) {
        groups.push(cues.slice(i, i + n));
      }
    }
    return groups;
  }

  btn.addEventListener("click", () => {
    const f = fileEl.files[0];
    if (!f) {
      out.innerHTML = "<em>Please upload a subtitle file.</em>";
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const cues = parseCues(String(e.target.result || ""));
      if (!cues.length) {
        out.innerHTML = "<em>No subtitle cues found in this file.</em>";
        return;
      }
      const fmt = fmtEl.value === "vtt" ? "vtt" : "srt";
      const mode = modeEl.value === "minutes" ? "minutes" : "cues";
      const value = parseFloat(valEl.value);
      const groups = splitCues(cues, mode, value);
      out.innerHTML = "";
      groups.forEach((g, i) => {
        const partText = renderPart(g, fmt);
        const link = document.createElement("a");
        link.textContent = `Download part ${i + 1} (${g.length} cues)`;
        link.href = URL.createObjectURL(
          new Blob([partText], { type: "text/plain;charset=utf-8" })
        );
        link.download = `split_part_${i + 1}.${fmt}`;
        link.style.display = "block";
        link.style.marginBottom = "6px";
        link.style.color = "#0ea5e9";
        link.style.fontWeight = "600";
        out.appendChild(link);
      });
    };
    reader.readAsText(f, "UTF-8");
  });
})();

(function () {
  const out = document.getElementById("splitOutput");
  const fileEl = document.getElementById("splitFile");
  const clear = document.getElementById("btnSplitClear");
  const download = document.getElementById("btnSplitDownload");
  if (clear) {
    clear.addEventListener("click", () => {
      if (fileEl) fileEl.value = "";
      if (out) out.innerHTML = "";
    });
  }
  if (download) {
    download.addEventListener("click", () => {
      if (!out) return;
      const links = out.querySelectorAll("a");
      if (!links.length) return;
      links.forEach((a, i) => {
        setTimeout(() => a.click(), i * 250);
      });
    });
  }
})();
