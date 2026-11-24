
'use strict';
(() => {
 const d=window.AUDIT;
 const $=id=>document.getElementById(id);
 if(!d){$('filter-state').textContent='复盘数据未加载。请打开完整本地文件夹。';return;}
 const fmt=s=>s==null?'—':Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
 function make(tag,txt){const e=document.createElement(tag);if(txt!=null)e.textContent=txt;return e;}
 const p=(b,txt,cl)=>{const x=make('p',txt);x.className=cl||'';b.append(x);return x;};
 const h=(b,txt)=>b.append(make('h3',txt));
 const cards=(b,arr)=>{if(!arr.length)return;const ul=make('ul');ul.className='cards';for(const x of arr)ul.append(make('li',x));b.append(ul);};
 const table=(b,cols,rows)=>{if(!rows.length){p(b,'此范围没有符合本项口径的记录。','empty');return;}const wrap=make('div');wrap.className='scroll-table';const tb=make('table'),thead=make('thead'),tr=make('tr');for(const c of cols){const th=make('th',c);th.scope='col';tr.append(th);}thead.append(tr);tb.append(thead);const body=make('tbody');for(const r of rows){const y=make('tr');for(const c of r)y.append(make('td',c));body.append(y);}tb.append(body);wrap.append(tb);b.append(wrap);};
 const fold=(b,label)=>{const x=make('details'), s=make('summary',label);x.append(s);b.append(x);return x;};
 const bars=(b,rows)=>{if(!rows.length){p(b,'此范围没有匹配目标的有效伤害记录。','empty');return;} const ul=make('ol'),top=Math.max(...rows.map(r=>r[1]),1);ul.className='bars';for(const [n,v] of rows){const li=make('li',n+' · '+v.toLocaleString('zh-CN')+' 点'),m=make('div'),fill=make('i');m.className='bar';fill.style.width=Math.max(1,100*v/top)+'%';m.append(fill);li.append(m);ul.append(li);}b.append(ul);};
 const fit=(selected,rows)=>rows.filter(r=>!selected||r[0]===selected);
 const agg=(selected,rows)=>{const z={};for(const [fid,name,v] of fit(selected,rows))z[name]=(z[name]||0)+v;return Object.entries(z).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'zh'));};
 const filter=$('fight-filter');
 for(const f of d.fights){const o=make('option','F'+f.id+' · P'+f.p+' · '+fmt(f.length));o.value=f.id;filter.append(o);}
 const q=new URL(location.href); const requested=Number(q.searchParams.get('fight')); if(d.fights.some(f=>f.id===requested))filter.value=requested;
 const ns='http://www.w3.org/2000/svg';
 function pointAt(points,t){let lo=0,hi=points.length;while(lo<hi){const m=Math.floor((lo+hi)/2);if(points[m][0]<=t+.05)lo=m+1;else hi=m;}return points[lo-1]||null;}
 const sv=(n,props={})=>{const e=document.createElementNS(ns,n);for(const [k,v] of Object.entries(props))e.setAttribute(k,v);return e;};
 let stopPlay=()=>{};
 function replay(block,r){
   const grid=make('div'), arena=sv('svg',{viewBox:'0 0 420 420',class:'arena',role:'img','aria-label':'战斗坐标的本地回放图'}), side=make('div'), tools=make('div');grid.className='replay-grid';side.className='replay-side';tools.className='replay-buttons';
   const pointer=make('output');const slider=make('input');slider.type='range';slider.min=r.start;slider.max=r.end;slider.step='0.1';slider.value=r.start;slider.setAttribute('aria-label','回放进度');
   const status=make('p'), names=make('div');status.setAttribute('aria-live','polite');
   const draw=(v)=>{
     arena.replaceChildren(); for(const [x1,y1,x2,y2] of [[210,25,210,405],[25,210,395,210]])arena.append(sv('line',{x1,y1,x2,y2,class:'replay-axes'}));
     const cue=sv('text',{x:210,y:22,class:'replay-caption','text-anchor':'middle'});cue.textContent='Boss 侧';arena.append(cue);
     const alive=[];for(const tr of r.tracks){const point=pointAt(tr.points,v);if(!point||v-point[0]>1.4)continue;
       const held=tr.holds.some(([a,b])=>a<=v&&v<b), mx=210+(point[2]-r.center[1])*r.scale, my=210-(point[1]-r.center[0])*r.scale, dead=tr.dead!=null&&tr.dead<=v;
       const id=tr.key;const circle=sv('circle',{cx:mx,cy:my,r:held?8:6,fill:dead?'#596579':held?'#68e0b1':'#90baff',stroke:'#122337','stroke-width':1.1,class:'replay-dot'});const t=sv('title');t.textContent=id;circle.append(t);arena.append(circle);
       alive.push(id+(held?'（持蛋）':''));
     }
     pointer.value=fmt(v); pointer.textContent=fmt(v);
     const active=r.markers.filter(m=>m[0]<=v+.05).at(-1);status.textContent=active?'最近标记：'+fmt(active[0])+' '+active[1]:'此时间点之前暂无事件标记';
     names.textContent='当前有坐标：'+alive.length+' 人';names.title=alive.join('、');
   };
   const go=vv=>{slider.value=Math.min(r.end,Math.max(r.start,vv));draw(Number(slider.value));};
   slider.addEventListener('input',()=>draw(Number(slider.value)));
   const reset=make('button','回到起点'),play=make('button','播放');reset.type=play.type='button';
   let id=0;const off=()=>{if(id)clearInterval(id);id=0;play.textContent='播放';};
   stopPlay=off;
   play.onclick=()=>{if(id){off();return;}if(Number(slider.value)>=r.end)go(r.start);play.textContent='暂停';let tick=performance.now();id=setInterval(()=>{const t=performance.now(),v=Number(slider.value)+(t-tick)/1000;if(v>=r.end){go(r.end);off();return;}tick=t;go(v);},160);};
   reset.onclick=()=>{off();go(r.start);};
   tools.append(play,reset);
   side.append(tools,pointer,slider,status,names);
   const jump=make('div');jump.className='replay-buttons';for(const [t,l] of r.markers){const btn=make('button',fmt(t)+' '+l);btn.type='button';btn.onclick=()=>{off();go(t+.05);};jump.append(btn);}side.append(jump);
   p(side,'绿点为持蛋者，蓝点为其他队员，灰点为死亡。图中只显示最近 1.4 秒内有坐标的队员，未补画缺失位置。','legend');grid.append(arena,side);block.append(grid);draw(r.start);
 }
 function render(){
   stopPlay();
   const f=Number(filter.value), focus=d.fights.find(x=>x.id===f);
   $('filter-state').textContent=focus?'筛选：F'+f+'，P'+focus.p+'，'+fmt(focus.length)+'，剩余 '+focus.hp+'%':'显示全部 26 把';
   for(let m=1;m<=8;m++)$('body-'+m).replaceChildren();
   const b=Array.from({length:8},(_,i)=>$('body-'+(i+1)));
   p(b[0],'只比较 P1 结束的 11 把。F17 为无羁之怒；其余 10 把中，6 把首个异常是持蛋贴近，4 把是背蛋吃波。8 把集中在 1:57 至 2:09。');
   table(b[0],['场次','时间','首个异常','当时记录'],fit(f,d.hatch).map(([id,t,c,n])=>['F'+id,fmt(t),c,n]));
   const found=d.replays[String(f||37)]; if(found){h(b[0],'F'+(f||37)+' · 持蛋与 P2 事件坐标回放');replay(b[0],found);}
   const carry=fit(f,d.carry);
   const carryD=fold(b[0],'全部持蛋与薄膜的场次计数');
   table(carryD,['场次','阶段','持蛋次数','薄膜首次/叠层条数'],carry.map(x=>['F'+x[0],'P'+x[1],x[2],x[3]]));
   p(b[1],d.waveNote);
   bars(b[1],agg(f,d.waves)); if(d.rubbleNote)p(b[1],d.rubbleNote);
   p(b[2],d.shellNote);bars(b[2],agg(f,d.shell));
   p(b[3],d.heartNote);bars(b[3],agg(f,d.heart));
   p(b[4],d.soakNote);table(b[4],['场次','时间','参与光环','口径'],fit(f,d.soak).map(([id,t,c,n])=>['F'+id,fmt(t),c,n]));
   const soakDetail=fold(b[4],'分担窗口计数');table(soakDetail,['场次','有参与光环的窗口','少于 8 人窗口'],fit(f,d.soakTotals).map(v=>['F'+v[0],v[1],v[2]]));
   p(b[5],d.rageNote);table(b[5],['场次','时间','事件','统计说明'],fit(f,d.rage).map(([id,t,c,n])=>['F'+id,fmt(t),c,n]));
   p(b[6],d.p2Note);table(b[6],['场次','时间','事件','记录'],fit(f,d.p2).map(([id,t,c,n])=>['F'+id,fmt(t),c,n]));
   p(b[7],d.vinesNote);
   if(!f)cards(b[7],['F30 3:20 · 1 层','F29 3:23 · 1 层','F25 3:25 · 2 层','F23 3:56、3:58 · 3 层']);
   table(b[7],['场次','时间','层数/覆盖','致死记录'],fit(f,d.coverage).map(([id,t,c,n])=>['F'+id,fmt(t),c,n]));
   if(!f||f===37){
     const d6=fold(b[7],'F37 3:36 · 6 层非坦克首跳承伤');
     p(d6,'列出首跳有直接伤害记录的非坦克。减免估值不含吸收，包含其他减伤及被动效果。');
     table(d6,['队员','原始伤害','实际扣血','吸收','溢出','其他减免估值'],d.first6.map(r=>[r[0],...r.slice(1).map(v=>v.toLocaleString('zh-CN'))]));
   }
   const dv=fold(b[7],'凋萎静脉直接致死 · 逐把计数');table(dv,['场次','最早直接致死','直接致死人数'],fit(f,d.vines).map(([id,t,c])=>['F'+id,fmt(t),c]));
 }
 filter.onchange=render;$('reset').onclick=()=>{filter.value='';render();};render();
 window.__audit={render};
})();
