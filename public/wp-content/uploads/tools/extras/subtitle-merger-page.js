(() => {
  const fileEl = document.getElementById('mergeFiles');
  const outEl = document.getElementById('mergeOut');
  const fmtEl = document.getElementById('mergeFormat');

  // ---------- Parser ----------
  const timeToMs = (t) => {
    // "HH:MM:SS,mmm" or "HH:MM:SS.mmm"
    const m = t.match(/^(\d{2}):(\d{2}):(\d{2})([.,](\d{3}))?$/);
    if(!m) return null;
    const ms = (parseInt(m[1])*3600 + parseInt(m[2])*60 + parseInt(m[3]))*1000 + (m[5]?parseInt(m[5]):0);
    return ms;
  };
  const msToSRT = (ms) => {
    ms = Math.max(0, Math.round(ms));
    const h = String(Math.floor(ms/3600000)).padStart(2,'0');
    const m = String(Math.floor((ms%3600000)/60000)).padStart(2,'0');
    const s = String(Math.floor((ms%60000)/1000)).padStart(2,'0');
    const z = String(ms%1000).padStart(3,'0');
    return `${h}:${m}:${s},${z}`;
  };
  const msToVTT = (ms) => msToSRT(ms).replace(',', '.');

  function parse(text){
    const isVTT = /^WEBVTT/m.test(text.trim());
    text = text.replace(/\r/g,'').trim();
    if(isVTT) text = text.replace(/^WEBVTT[^\n]*\n?/,'').trim();
    // split blocks by blank lines
    const blocks = text.split(/\n{2,}/);
    const cues = [];
    for(const b of blocks){
      const lines = b.split('\n').filter(Boolean);
      if(lines.length === 0) continue;
      // find timing line
      let i=0;
      // skip possible numeric index or cue-id
      if(/^\d+$/.test(lines[0]) || (!lines[0].includes('-->') && lines.length>1)) i=1;
      const timing = lines[i] || '';
      const tm = timing.match(/(\d{2}:\d{2}:\d{2}[.,]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[.,]\d{3})/);
      if(!tm) continue;
      const start = timeToMs(tm[1]);
      const end   = timeToMs(tm[2]);
      const textLines = lines.slice(i+1).join('\n');
      if(start==null || end==null) continue;
      cues.push({start, end, text:textLines});
    }
    return {cues};
  }

  function render(cues, as='srt'){
    const lines = [];
    if(as==='vtt') lines.push('WEBVTT','');
    cues.forEach((c,idx)=>{
      if(as==='srt'){
        lines.push(String(idx+1));
        lines.push(`${msToSRT(c.start)} --> ${msToSRT(c.end)}`);
      }else{
        lines.push(`${msToVTT(c.start)} --> ${msToVTT(c.end)}`);
      }
      lines.push(c.text || '');
      lines.push('');
    });
    return lines.join('\n').trim() + '\n';
  }

  async function readAll(files){
    const texts = await Promise.all([...files].map(f => f.text()));
    return texts.map(t => parse(t).cues).flat();
  }

  document.getElementById('btnMerge').addEventListener('click', async ()=>{
    outEl.value = 'Processing...';
    const cues = await readAll(fileEl.files);
    const sorted = cues.sort((a,b)=> a.start - b.start || a.end - b.end);
    const fmt = fmtEl.value;
    outEl.value = render(sorted, fmt);
  });

  document.getElementById('btnMergeDownload').addEventListener('click', ()=>{
    const fmt = fmtEl.value;
    const blob = new Blob([outEl.value], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fmt==='srt' ? 'merged.srt' : 'merged.vtt';
    a.click();
    URL.revokeObjectURL(a.href);
  });
})();

(function(){
  const outEl = document.getElementById('mergeOut');
  const copy  = document.getElementById('btnMergeCopy');
  const clear = document.getElementById('btnMergeClear');

  if(copy){
    copy.addEventListener('click', async ()=>{
      if(!outEl || !outEl.value.trim()) return;
      await navigator.clipboard.writeText(outEl.value);
      const t = copy.textContent; copy.textContent='Copied!';
      setTimeout(()=> copy.textContent=t, 900);
    });
  }
  if(clear){
    clear.addEventListener('click', ()=>{
      if(outEl) outEl.value = '';
      const file = document.getElementById('mergeFiles');
      if(file) file.value='';
    });
  }
})();
