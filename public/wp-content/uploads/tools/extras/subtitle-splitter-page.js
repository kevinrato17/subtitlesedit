(() => {
  const modeEl = document.getElementById("splitMode");
  const valEl = document.getElementById("splitValue");
  const fmtEl = document.getElementById("splitFormat");
  const fileEl = document.getElementById("splitFile");
  const btn = document.getElementById("splitBtn");
  const out = document.getElementById("splitOutput");

  btn.addEventListener("click", () => {
    const f = fileEl.files[0];
    if (!f) { out.innerHTML = "<em>Please upload a subtitle file.</em>"; return; }

    const reader = new FileReader();
    reader.onload = e => {
      const txt = e.target.result.trim();
      if (!txt) return;

      const parts = splitSubtitles(txt, modeEl.value, parseFloat(valEl.value), fmtEl.value);
      out.innerHTML = "";
      
      parts.forEach((p, i) => {
        const link = document.createElement("a");
        link.textContent = `Download part ${i+1} (${p.cues} cues)`;
        link.href = URL.createObjectURL(new Blob([p.text], {type:"text/plain"}));
        link.download = `split_part_${i+1}.${fmtEl.value}`;
        link.style.display = "block";           // Each link on its own row
        link.style.marginBottom = "6px";        // Small spacing
        link.style.color = "#0ea5e9";           // Your theme blue
        link.style.fontWeight = "600";
        out.appendChild(link);
      });
    };
    reader.readAsText(f);
  });

  function splitSubtitles(text, mode, value, fmt) {
    const blocks = text.split(/\r?\n\r?\n/).filter(Boolean);
    const parts = [];
    if (mode === "cues") {
      for (let i=0; i<blocks.length; i+=value) { const chunk = blocks.slice(i, i+value).join("\n\n"); parts.push({text: chunk, cues: blocks.slice(i,i+value).length}); } } else if (mode === "minutes") { const lines = text.split(/\r?\n/); let current = [], currentStart = 0, partCues = 0; const durMs = value * 60000; const tsRe = /(\d{2}:\d{2}:\d{2}[.,]\d{3})\s-->/;
      function toMs(t){const p=t.replace(",",".").split(":");const s=p[2].split(".");return((+p[0]*60+ +p[1])*60+ +s[0])*1000+ +s[1];}
      lines.forEach(line=>{
        const m=line.match(tsRe);
        if(m){
          const start=toMs(m[1]);
          if(start-currentStart>=durMs && current.length){
            parts.push({text:current.join("\n"), cues:partCues});
            current=[line]; currentStart=start; partCues=1;
            return;
          }
          partCues++;
        }
        current.push(line);
      });
      if(current.length) parts.push({text:current.join("\n"), cues:partCues});
    }
    return parts;
  }
})();

(function(){
  const out = document.getElementById("splitOutput");
  const fileEl = document.getElementById("splitFile");
  const copy = document.getElementById("btnSplitCopy");
  const clear = document.getElementById("btnSplitClear");
  const download = document.getElementById("btnSplitDownload");

  if(clear){
    clear.addEventListener("click", ()=>{
      if(fileEl) fileEl.value="";
      if(out) out.innerHTML="";
    });
  }
  if(copy){
    copy.addEventListener("click", async ()=>{
      if(!out) return;
      const links = out.querySelectorAll("a[href^=\"blob:\"]");
      if(!links.length) return;
      const texts = await Promise.all(Array.from(links).map(a=>fetch(a.href).then(r=>r.text())));
      await navigator.clipboard.writeText(texts.join("\n\n"));
      const t = copy.textContent; copy.textContent="Copied!";
      setTimeout(()=> copy.textContent=t, 900);
    });
  }
  if(download){
    download.addEventListener("click", ()=>{
      if(!out) return;
      const links = out.querySelectorAll("a");
      if(!links.length) return;
      links.forEach((a,i)=>{ setTimeout(()=>a.click(), i*250); });
    });
  }
})();
