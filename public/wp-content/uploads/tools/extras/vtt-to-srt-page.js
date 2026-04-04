(() => {
  const f = document.getElementById("se4-file"),
        i = document.getElementById("se4-in"),
        o = document.getElementById("se4-out"),
        b = document.getElementById("se4-convert"),
        c = document.getElementById("se4-copy"),
        d = document.getElementById("se4-download"),
        clr = document.getElementById("se4-clear");
  f.addEventListener("change", e=>{
    const file = e.target.files[0];
    if(!file) return;
    const r = new FileReader();
    r.onload = ev => { i.value = ev.target.result; };
    r.readAsText(file);
  });
  b.addEventListener("click", ()=>{
    const t = i.value.trim();
    if(!t) return;
    const out = t
      .replace(/^WEBVTT\s*\n*/i,"")
      .replace(/\.(\d{3})/g, ",$1")
      .replace(/\n\n+/g,"\n\n")
      .split(/\n\n/)
      .filter(Boolean)
      .map((blk, idx) => {
        const body = blk.trim().replace(/^\d+\s*(?:\r\n|\n|\r)/, "");
        return `${idx+1}\n${body}`;
      })
      .join("\n\n");
    o.value = out;
  });
  c.addEventListener("click", async ()=>{ if(o.value) await navigator.clipboard.writeText(o.value); });
  d.addEventListener("click", ()=>{
    if(!o.value) return;
    const blob = new Blob([o.value], {type:"text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "converted.srt";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  clr.addEventListener("click", ()=>{
    i.value = ""; o.value = ""; f.value = "";
  });
})();
