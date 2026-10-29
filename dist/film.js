(function () {
  'use strict';
  var canvas=document.querySelector('.film-stage canvas'), ctx=canvas.getContext('2d');
  var play=document.getElementById('film-play'), seek=document.getElementById('film-seek'), caption=document.getElementById('film-caption'), status=document.getElementById('film-status');
  var scenes=[
    ['01 / 一个问题','均匀了，就不动了吗？','从肉眼看见的分布，走进持续运动的微观世界。'],
    ['02 / 打开隔板','没有领队的漫游','每个粒子的路径都在改变；隔板移除后，两侧可以互相穿行。'],
    ['03 / 看见整体','从起点算，净转移了多少？','以最初左 76、右 0 为基准；箭头表示截至当前的累计净转移。'],
    ['04 / 动态平衡','均匀之后，仍在交换','这里人为重设均匀分布，用作观察对照。'],
    ['05 / 时间的线索','一张快照，不能说明停止','数量相近不等于粒子静止。沿时间看，才看得见变化。'],
    ['06 / 轮到你了','让直觉，遇见观察','回到互动实验，预测、操作，再观察。']
  ];
  var subtitles=[
    [0,4.7,'看起来均匀了，分子就会停下来吗？'],[4.7,10,'把目光放到微观世界。'],
    [10,14.8,'移除隔板，粒子开始互相穿行。'],[14.8,20,'每一个粒子的方向，都不固定。'],
    [20,24.9,'起初粒子全部在左侧；现在有多少到了右侧？'],[24.9,30,'这里统计累计净转移，不表示每一刻的流动方向。'],
    [30,34.9,'切到人为设置的均匀分布状态。'],[34.9,40,'粒子仍然来回交换；动态平衡，仍有运动。'],
    [40,44.8,'一张快照，只告诉你这一刻的分布。'],[44.8,50,'连续观察，才能看见运动与数量波动。'],
    [50,54.8,'回到分子漫游，移除隔板，调整温度。'],[54.8,60.1,'用三次预测，验证你的直觉。']
  ];
  var N=76,FPS=30,frames=1801,paths=new Float32Array(frames*N*2), angles=new Float32Array(N), seed=73029;
  function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
  // Precompute every position once. Seeking and playback sample identical seeded paths.
  for(var i=0;i<N;i++){paths[i*2]=.055+random()*.38;paths[i*2+1]=.08+random()*.84;angles[i]=random()*Math.PI*2;}
  for(var f=1;f<frames;f++)for(var p=0;p<N;p++){
    var at=(f*N+p)*2,old=((f-1)*N+p)*2,x=paths[old],y=paths[old+1];
    if(f===900){x=p<N/2?.05+random()*.41:.54+random()*.41;y=.08+random()*.84;}
    angles[p]+=(random()-.5)*.65;
    var nx=x+Math.cos(angles[p])*.0045,ny=y+Math.sin(angles[p])*.010;
    if(nx<.025||nx>.975){angles[p]=Math.PI-angles[p];nx=Math.max(.025,Math.min(.975,nx));}
    if(ny<.06||ny>.94){angles[p]=-angles[p];ny=Math.max(.06,Math.min(.94,ny));}
    if(f<300&&nx>.485){nx=.485;angles[p]=Math.PI-angles[p];}
    paths[at]=nx;paths[at+1]=ny;
  }
  var t=0,running=false,raf=0,last=0,previousScene=-1,previousCaption=-1,captions=true,lastDraw=-1;
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chapters=Array.from(document.querySelectorAll('.film-chapters button'));
  function roundBox(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
  function sample(time,index){var raw=Math.min(1800,Math.max(0,time*FPS)),a=Math.floor(raw),b=Math.min(1800,a+1),k=raw-a;if(a===899)k=0;var u=(a*N+index)*2,v=(b*N+index)*2;return[paths[u]*(1-k)+paths[v]*k,paths[u+1]*(1-k)+paths[v+1]*k];}
  function draw(){if(!ctx)return;var scene=Math.min(5,Math.floor(t/10));ctx.clearRect(0,0,1080,608);var bg=ctx.createLinearGradient(0,0,1080,608);bg.addColorStop(0,'#183b30');bg.addColorStop(1,'#10241f');ctx.fillStyle=bg;ctx.fillRect(0,0,1080,608);
    ctx.strokeStyle='#254739';ctx.lineWidth=1;for(var x=30;x<1080;x+=45){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,608);ctx.stroke();}for(var y=20;y<608;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(1080,y);ctx.stroke();}
    var bx=78,by=268,bw=924,bh=236;ctx.fillStyle='#0b211cbb';roundBox(bx,by,bw,bh,18);ctx.fill();ctx.strokeStyle='#557857';ctx.stroke();
    ctx.setLineDash(t<10?[]:[5,9]);ctx.strokeStyle=t<10?'#a1b797':'#42634b';ctx.lineWidth=t<10?4:1.5;ctx.beginPath();ctx.moveTo(540,by+12);ctx.lineTo(540,by+bh-12);ctx.stroke();ctx.setLineDash([]);
    var left=0;
    for(var i=0;i<N;i++){var pos=sample(t,i);if(pos[0]<.5)left++;var px=bx+pos[0]*bw,py=by+pos[1]*bh;ctx.fillStyle=i===0?'#ffb49a':'#b8ee81';ctx.beginPath();ctx.arc(px,py,i===0?6:3.4,0,Math.PI*2);ctx.fill();if(i===0){ctx.strokeStyle='#ff9e8699';ctx.lineWidth=2;ctx.beginPath();ctx.arc(px,py,12,0,Math.PI*2);ctx.stroke();if(scene===4){ctx.strokeStyle='#ff9e8677';ctx.beginPath();for(var j=0;j<30;j++){var history=sample(Math.max(30,t-j*.04),0);var hx=bx+history[0]*bw,hy=by+history[1]*bh;if(!j)ctx.moveTo(hx,hy);else ctx.lineTo(hx,hy);}ctx.stroke();}}}
    if(scene===2){var phase=(t%2)/2;ctx.globalAlpha=.35+.55*Math.sin(phase*Math.PI);ctx.strokeStyle='#ff9e86';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(420,390);ctx.lineTo(652,390);ctx.lineTo(635,375);ctx.moveTo(652,390);ctx.lineTo(635,405);ctx.stroke();ctx.globalAlpha=1;ctx.fillStyle='#ffd2bf';ctx.font='18px system-ui';ctx.textAlign='center';ctx.fillText('相对初始：累计净转移 '+(N-left)+' 个向右',540,437);}
    if(scene===2||scene===3||scene===4){ctx.fillStyle='#8fae96';ctx.font='14px system-ui';ctx.textAlign='left';ctx.fillText('左 '+left+'  /  右 '+(N-left)+' · 示意粒子数',100,527);ctx.textAlign='right';ctx.fillText(scene===2?'初始状态：左 76 / 右 0':scene===4?'金色轨迹：同一个粒子的近期路径':'双向交换持续发生',980,527);}
    if(scene===0){ctx.strokeStyle='#ff9e8644';ctx.lineWidth=3;ctx.beginPath();ctx.arc(900,145,42+Math.sin(t)*6,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#ff9e86';ctx.font='bold 60px system-ui';ctx.textAlign='center';ctx.fillText('?',900,166);}
    if(scene!==previousScene){previousScene=scene;document.getElementById('scene-kicker').textContent=scenes[scene][0];document.getElementById('scene-title').textContent=scenes[scene][1];document.getElementById('scene-note').textContent=scenes[scene][2];document.querySelector('.film-ending').hidden=scene!==5;chapters.forEach(function(button,k){button.setAttribute('aria-current',String(k===scene));});}
    var sub=subtitles.findIndex(function(s){return t>=s[0]&&t<s[1];});if(sub!==previousCaption){previousCaption=sub;caption.textContent=sub<0?'':subtitles[sub][2];}
    document.getElementById('film-symbol').textContent='';
    seek.value=t;seek.setAttribute('aria-valuetext',t.toFixed(1)+' 秒，共 60 秒');document.getElementById('film-time').textContent='00:'+String(Math.floor(t)).padStart(2,'0')+' / 01:00';if(t>=60)document.getElementById('film-time').textContent='01:00 / 01:00';
  }
  function setRunning(value){running=value;play.textContent=running?'暂停':'播放';play.setAttribute('aria-label',running?'暂停动画':'播放动画');status.textContent=running?'正在播放。无旁白音轨，逐句字幕同步显示。':t>=60?'播放结束。进入分子漫游，亲手验证。':'已暂停，可拖动进度回看。';last=0;if(running&&!raf)raf=requestAnimationFrame(tick);}
  function tick(now){raf=0;if(!running)return;if(last)t=Math.min(60,t+(now-last)/1000);last=now;if(!reduced||now-lastDraw>=150||t>=60){draw();lastDraw=now;}if(t>=60){setRunning(false);return;}raf=requestAnimationFrame(tick);}
  play.addEventListener('click',function(){if(!running&&t>=60)t=0;setRunning(!running);draw();});
  document.getElementById('film-replay').addEventListener('click',function(){t=0;last=0;draw();setRunning(true);});
  seek.addEventListener('input',function(){t=Number(seek.value);last=0;draw();if(t>=60)setRunning(false);});
  document.getElementById('film-captions').addEventListener('click',function(){captions=!captions;caption.hidden=!captions;this.setAttribute('aria-pressed',String(captions));this.textContent='字幕：'+(captions?'开':'关');});
  chapters.forEach(function(button){button.addEventListener('click',function(){t=Number(button.dataset.time);last=0;draw();});});
  document.addEventListener('visibilitychange',function(){if(document.hidden&&running)setRunning(false);});
  function resize(){if(!ctx)return;var box=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2.5);canvas.width=Math.max(1,Math.round(box.width*dpr));canvas.height=Math.max(1,Math.round(box.height*dpr));ctx.setTransform(canvas.width/1080,0,0,canvas.height/608,0,0);draw();}
  var observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;if(observer)observer.observe(canvas);else window.addEventListener('resize',resize);
  window.addEventListener('pagehide',function(){setRunning(false);cancelAnimationFrame(raf);raf=0;if(observer)observer.disconnect();});
  window.addEventListener('pageshow',function(event){if(!event.persisted)return;if(observer)observer.observe(canvas);resize();setRunning(false);});
  resize();draw();status.textContent=reduced?'已按减少动态效果偏好暂停。按播放开始；字幕和逐镜头跳转均可使用。':'准备播放。按播放开始这段 60 秒动画；无旁白音轨。';
  // A small read-only hook supports reproducibility checks without altering playback.
  window.ScienceFilm=Object.freeze({duration:60,seed:73029,sample:function(time,index){return sample(Math.max(0,Math.min(60,time)),Math.max(0,Math.min(N-1,Math.floor(index))));},getTime:function(){return t;}});
})();
