(() => {
  // Settings (tweak if you like)
  const MIN_GAP_MS = 0;      // add no extra gap unless there is an actual overlap
  const MIN_DUR_MS = 300;    // enforce a minimum cue duration of 300 ms

  // Elements
  const fileEl = document.getElementById("fixFile");
  const inEl   = document.getElementById("fixIn");
  const outEl  = document.getElementById("fixOut");
  const btnFix = document.getElementById("fixBtn");
  const btnClr = document.getElementById("fixClear");
  const btnDl  = document.getElementById("fixDownload");

  // Load file into input box
  fileEl.addEventListener("change", e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => { inEl.value = ev.target.result; };
    r.readAsText(f);
  });

  // Fix overlaps (only when they actually overlap)
  btnFix.addEventListener("click", () => {
    const raw = inEl.value.trim();
    if (!raw) return;

    // Detect format (SRT vs VTT) for output delimiter
    const isVtt = /^WEBVTT\b/m.test(raw) || /\d{2}:\d{2}:\d{2}\.\d{3}\s-->/m.test(raw);
    const delim = isVtt ? "." : ",";

    // timestamp pattern
    const tsRe = /(\d{2}:\d{2}:\d{2}[.,]\d{3})\s-->\s(\d{2}:\d{2}:\d{2}[.,]\d{3})/;

    let lastEnd = -Infinity;
    const lines = raw.split(/\r?\n/);

    const fixed = lines.map(line => {
      const m = line.match(tsRe);
      if (!m) return line;

      let start = toMs(m[1]);
      let end   = toMs(m[2]);

      // Only adjust if overlapping previous cue
      const minStartAllowed = (isFinite(lastEnd) ? lastEnd + MIN_GAP_MS : start);
      const newStart = (start < minStartAllowed) ? minStartAllowed : start;

      // Enforce minimum duration only if necessary
      const newEnd = (end - newStart < MIN_DUR_MS) ? newStart + MIN_DUR_MS : end;

      // Track end of this cue
      lastEnd = newEnd;

      return `${fromMs(newStart, delim)} --> ${fromMs(newEnd, delim)}`;
    }).join("\n");

    outEl.value = fixed;
  });

  // Utilities
  function toMs(t) {
    // Accepts "HH:MM:SS,mmm" or "HH:MM:SS.mmm"
    const parts = t.replace(",", ".").split(":");
    const sParts = parts[2].split(".");
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    const s = parseInt(sParts[0], 10) || 0;
    const ms = parseInt(sParts[1], 10) || 0;
    return (((h * 60 + m) * 60) + s) * 1000 + ms;
  }
  function fromMs(ms, delimiter) {
    if (ms < 0) ms = 0;
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const msR = Math.round(ms % 1000);
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}${delimiter}${String(msR).padStart(3,"0")}`;
  }

  // Right side actions
  btnDl.addEventListener("click", () => {
    const txt = outEl.value.trim();
    if (!txt) return;
    const isVttOut = /-->\s*\d{2}:\d{2}:\d{2}\.\d{3}/m.test(txt);
    const blob = new Blob([txt], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `fixed.${isVttOut ? "vtt" : "srt"}`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  // Left side clear
  btnClr.addEventListener("click", () => {
    inEl.value = "";
    outEl.value = "";
    fileEl.value = "";
  });
})();
