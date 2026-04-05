// SubtitlesEdit.com — safe-converter.js (standalone, ASCII only)
(function(){
  "use strict";

  function $(id){ return document.getElementById(id); }

  function setFS(v){
    var px = (parseInt(v,10)||16)+"px";
    var inp = $("se3-in"), out = $("se3-out");
    if (inp) inp.style.fontSize = px;
    if (out) out.style.fontSize = px;
  }

  function pad(n,w){ if(w===void 0) w=2; n=String(n); while(n.length<w) n="0"+n; return n; }
  function toH(sec, sep){
    sec = Math.max(0, +sec||0);
    var h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60);
    var ms=Math.round((sec - Math.floor(sec))*1000);
    return pad(h,2)+":"+pad(m,2)+":"+pad(s,2)+sep+pad(ms,3);
  }
  function isSRT(s){
    return /-->\s*\d{2}:\d{2}:\d{2},\d{3}/.test(s) || /,\d{3}\s*-->/.test(s);
  }
  function setStatus(msg, rgb){
    var el=$("se3-status");
    if(!el) return;
    el.textContent = msg || "";
    el.style.color = rgb || "rgb(85,85,85)";
  }

  function parseSRT(text){
    var lines = String(text).replace(/\r/g,"").split("\n");
    var out = [], i=0;
    while(i<lines.length){
      if(!lines[i] || !lines[i].trim()){ i++; continue; }
      if(/^\d+$/.test(lines[i].trim())) i++;
      if(i>=lines.length) break;
      var t = lines[i++].trim();
      var m = t.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
      if(!m) continue;
      var st=(+m[1])*3600+(+m[2])*60+(+m[3])+(+m[4])/1000;
      var en=(+m[5])*3600+(+m[6])*60+(+m[7])+(+m[8])/1000;
      var txt=[];
      while(i<lines.length && lines[i].trim()!==""){ txt.push(lines[i++]); }
      out.push({start:st,end:en,text:txt.join("\n")});
      while(i<lines.length && (!lines[i] || !lines[i].trim())) i++;
    }
    return out;
  }

  function parseVTT(text){
    var s = String(text).replace(/\r/g,"").replace(/^WEBVTT[^\n]*\n+/, "");
    var lines = s.split("\n");
    var out = [], i=0;
    while(i<lines.length){
      if(!lines[i] || !lines[i].trim()){ i++; continue; }
      if(lines[i] && lines[i].indexOf("-->")===-1) i++; // cue id
      if(i>=lines.length) break;
      var t = lines[i++].trim();
      var m = t.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
      if(!m) continue;
      var st=(+m[1])*3600+(+m[2])*60+(+m[3])+(+m[4])/1000;
      var en=(+m[5])*3600+(+m[6])*60+(+m[7])+(+m[8])/1000;
      var txt=[];
      while(i<lines.length && lines[i].trim()!==""){ txt.push(lines[i++]); }
      out.push({start:st,end:en,text:txt.join("\n")});
      while(i<lines.length && (!lines[i] || !lines[i].trim())) i++;
    }
    return out;
  }

  function toVTT(cues){
    var a = ["WEBVTT",""];
    var i, c;
    for(i=0;i<cues.length;i++){
      c = cues[i];
      a.push(toH(c.start,".")+" --> "+toH(c.end,"."));
      a.push(c.text||"");
      a.push("");
    }
    return a.join("\n");
  }

  function init(){
    var fontSel = $("se3-font");
    if (fontSel){ setFS(fontSel.value); fontSel.addEventListener("change", function(){ setFS(fontSel.value); }); }

    var inp = $("se3-in"), out = $("se3-out");

    var file = $("se3-file");
    if (file){
      file.addEventListener("change", function(e){
        var f = e.target.files && e.target.files[0];
        if(!f) return;
        var fr = new FileReader();
        fr.onload = function(){ inp.value = String(fr.result||""); setStatus("Loaded "+f.name, "rgb(10,127,46)"); };
        fr.onerror= function(){ setStatus("Error reading file", "rgb(185,28,28)"); };
        fr.readAsText(f);
      });
    }

    var btnClear = $("se3-clear");
    if (btnClear){ btnClear.addEventListener("click", function(){ inp.value=""; out.value=""; setStatus("Cleared."); }); }

    var btnCopy = $("se3-copy");
    if (btnCopy){
      btnCopy.addEventListener("click", function(){
        if(!navigator.clipboard){ setStatus("Clipboard API not available", "rgb(180,83,9)"); return; }
        navigator.clipboard.writeText(out.value||"").then(function(){
          setStatus("Copied.", "rgb(10,127,46)");
        }).catch(function(){
          setStatus("Clipboard blocked by browser.", "rgb(180,83,9)");
        });
      });
    }

    var btnDownload = $("se3-download");
    if (btnDownload){
      btnDownload.addEventListener("click", function(){
        var blob = new Blob([out.value||""], {type:"text/plain"});
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "converted.vtt";
        a.click();
        URL.revokeObjectURL(a.href);
      });
    }

    var btnConvert = $("se3-convert");
    if (btnConvert){
      btnConvert.addEventListener("click", function(){
        var raw = (inp.value||"").trim();
        if(!raw){ setStatus("Paste text or choose a file first.", "rgb(180,83,9)"); return; }
        var cues;
        try { cues = isSRT(raw) ? parseSRT(raw) : parseVTT(raw); }
        catch (e){ setStatus("Parse error. Ensure valid SRT or VTT.", "rgb(185,28,28)"); return; }
        out.value = toVTT(cues);
        setStatus("Converted "+cues.length+" cues → VTT.", "rgb(10,127,46)");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
