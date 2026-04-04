(() => {
  const file = document.getElementById("shiftFile"),
        input = document.getElementById("shiftIn"),
        output = document.getElementById("shiftOut"),
        shiftVal = document.getElementById("shiftSeconds"),
        apply = document.getElementById("applyShift"),
        copy = document.getElementById("copyShift"),
        dl = document.getElementById("downloadShift"),
        clr = document.getElementById("clearShift");

  // Load uploaded file
  file.addEventListener("change", e=>{
    const f = e.target.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = ev => { input.value = ev.target.result; };
    r.readAsText(f);
  });

  // Apply precise shift
  apply.addEventListener("click", ()=>{
    const t = input.value.trim();
    if(!t) return;
    const s = parseFloat(shiftVal.value) || 0;
    const re = /(\d{2}:\d{2}:\d{2}[.,]\d{3})\s-->\s(\d{2}:\d{2}:\d{2}[.,]\d{3})/g;
    const out = t.replace(re, (_,a,b)=> `${shift(a,s)} --> ${shift(b,s)}`);
    output.value = out;
  });

  function shift(t, s){
    const vtt = t.includes(".");
    const [hms, msStr] = t.split(vtt?".":",");
    const [h,m,sec] = hms.split(":").map(Number);
    const ms = parseInt(msStr,10);
    let totalMs = (h*3600 + m*60 + sec)*1000 + ms + s*1000;
    if (totalMs < 0) totalMs = 0;

    const hh = Math.floor(totalMs/3600000);
    const mm = Math.floor((totalMs%3600000)/60000);
    const ss = Math.floor((totalMs%60000)/1000);
    const mss = Math.round(totalMs%1000);

    const hPad = String(hh).padStart(2,'0');
    const mPad = String(mm).padStart(2,'0');
    const sPad = String(ss).padStart(2,'0');
    const msPad = String(mss).padStart(3,'0');
    return `${hPad}:${mPad}:${sPad}${vtt?".":","}${msPad}`;
  }

  copy.addEventListener("click", async()=>{ if(output.value) await navigator.clipboard.writeText(output.value); });
  dl.addEventListener("click", ()=>{
    if(!output.value) return;
    const blob = new Blob([output.value],{type:"text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shifted.srt";
    a.click(); URL.revokeObjectURL(a.href);
  });
  clr.addEventListener("click", ()=>{ input.value=""; output.value=""; file.value=""; });
})();
