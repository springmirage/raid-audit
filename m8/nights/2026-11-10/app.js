/* Static read-only viewer. Archive JSON is the source of truth. */
'use strict';
// Presentation-only wording changes keep all archived versions and evidence intact.
const factualReplacements = [
  [
    "优先 1：0:24–0:25 尾部近战覆盖。",
    ""
  ],
  [
    "优先 2：第一砸前保护好蛋。",
    ""
  ],
  [
    "优先 3：0:40–0:44 第一砸与毒波衔接。",
    ""
  ],
  [
    "出现提前破蛋及薄膜，不能都算作盘卷成功。",
    "出现提前破蛋及薄膜。"
  ],
  [
    "F17 第二砸附近的破蛋不按时间邻近强行判成功。",
    "F17 第二砸附近同时记录到破蛋、毒波与薄膜。"
  ],
  [
    "，不能把这场全部问题只归到尾部。",
    "。"
  ],
  [
    "首死后大量去壳不能算成功破蛋。",
    "首批减员后出现连续去壳。"
  ],
  [
    "39.867 秒的两条不得并入成功第一砸。",
    "39.867 秒的两条发生在第一砸之前。"
  ],
  [
    "8 次拾蛋，不能等同 8 次成功破蛋",
    "8 次拾蛋及后续腐臭卵心记录"
  ],
  [
    "第二砸附近不能只按相邻时间判成功",
    "第二砸附近的破蛋、毒波与薄膜记录"
  ],
  [
    "第一砸前未见薄膜，适合对照",
    "首个薄膜出现在第一砸之后"
  ],
  [
    "本场可用来对照没有早期薄膜时的第一砸血线。",
    ""
  ],
  [
    "先解决 0:24 尾部猛击",
    "0:24 尾部猛击与首批减员"
  ],
  [
    "盘卷阶段不作为有效分担样本",
    "减员后的盘卷记录"
  ],
  [
    "优先看首个异常，后续死亡仅用于说明影响链。",
    "记录首批异常与后续死亡时间。"
  ],
  [
    "以下列出最早 3 名不同玩家的死亡前直接伤害。重复死亡或后续收尾不另做失误次数。",
    "以下列出最早 3 名不同玩家死亡前的直接伤害。"
  ],
  [
    "拾蛋记录与腐臭卵心结果分开展示；去壳本身可能由死亡等原因造成。",
    "分别列出剧毒之壳、腐臭卵心与对应事件时间。"
  ],
  [
    "事实来自 WCL 原始事件。因果与个人责任需要额外证据。",
    "来源：WCL 原始事件。"
  ],
  [
    "未获得可靠喊灭边界，本页不把全部末段死亡列为可归责失误。",
    "下表列出死亡前直接伤害与死亡事件时间。"
  ],
  [
    "腐臭卵心不是腐臭薄膜。相邻于盘卷的事件不自动判作成功；无确定位置与触发原因时保留待核。",
    "腐臭卵心记录破蛋后的减益；腐臭薄膜记录团队叠层。"
  ],
  [
    "不能仅据此确定哪位玩家离位。",
    ""
  ],
  [
    "最后一击是结果，不单独证明根因。",
    "此条为死亡前的最后一击。"
  ],
  [
    "拾取状态，只证明获得剧毒之壳，不证明成功破蛋。",
    "记录获得剧毒之壳的时间。"
  ],
  [
    "这是尾部盘卷结算施法；伤害为全团伤害，不能据伤害命中人数推定进圈人数。",
    "记录尾部盘卷结算施法；该技能造成全团伤害。"
  ],
  [
    "破蛋结果需要结合对应盘卷、毒波、薄膜与死亡逐项判断。",
    "记录获得腐臭卵心的时间。"
  ],
  [
    "技能文字支持机制分类，不足以确定个人责任。",
    ""
  ],
  [
    "；另外的去壳事件要结合死亡和异常孵化区分。",
    "。"
  ]
];
function factualCopy(value) {
  let result=String(value??'');
  for(const [from,to] of factualReplacements)result=result.split(from).join(to);
  return result.replace(/\n口径：[\s\S]*$/, '\n来源：WCL原始事件。全部战斗止于P1。').trim();
}
function factualArchiveView(source) {
  const view=JSON.parse(JSON.stringify(source));
  for(const night of view.nights) {
    night.summary=factualCopy(night.summary);
    for(const fight of night.fights)for(const review of fight.reviews) {
      delete review.nextAction;
      for(const field of ['title','conclusion','process','rule'])review[field]=factualCopy(review[field]);
      for(const evidence of review.evidence)evidence.note=factualCopy(evidence.note);
    }
  }
  return view;
}
const data=factualArchiveView(window.M8_AUDIT);
const $=id=>document.getElementById(id);
let mode='current';
const txt=(tag,value,cls)=>{const e=document.createElement(tag);M8People.setText(e,displayTimes(value));if(cls)e.className=cls;return e;};
const displayTimes=v=>String(v??'').replace(/(\d+):(\d{2})\.\d+/g,'$1:$2').replace(/(\d+)\.\d+(?=\s*[–~]\s*\d+\.\d+\s*秒)/g,(_,n)=>Math.floor(Number(n)/60)+':'+String(Number(n)%60).padStart(2,'0')).replace(/(\d+)(?:\.\d+)?\s*秒/g,(_,n)=>Math.floor(Number(n)/60)+':'+String(Number(n)%60).padStart(2,'0'));
const unique=a=>[...new Set(a)];
function options(id,values,placeholder,selected=''){const el=$(id);el.replaceChildren(new Option(placeholder,''),...values.map(v=>new Option(typeof v==='string'?v:v.label,typeof v==='string'?v:v.value)));el.value=selected;if(el.selectedIndex<0)el.value='';M8People.styleSelect(el);}
function latestNights(){return unique(data.nights.map(n=>n.date)).sort().reverse().map(date=>data.nights.filter(n=>n.date===date).sort((a,b)=>b.revision-a.revision)[0]);}
function nights(){let ns=latestNights();if($('dateFilter').value)ns=ns.filter(n=>n.date===$('dateFilter').value);if(mode==='history'&&$('dateFilter').value&&$('revisionFilter').value)ns=data.nights.filter(n=>n.date===$('dateFilter').value&&n.revision===Number($('revisionFilter').value));return ns;}
const fightKey=f=>f.reportCode+':'+f.fightId;
function controls(){const fs=nights().flatMap(n=>n.fights);options('fightFilter',unique(fs.map(fightKey)).map(k=>{const f=fs.find(f=>fightKey(f)===k);return{value:k,label:`${f.reportCode} · 第 ${f.fightId} 场${f.label?' · '+f.label:''}`};}),'全部场次',$('fightFilter').value);options('playerFilter',unique(fs.flatMap(f=>f.reviews.flatMap(r=>r.players))).sort(),'全部玩家',$('playerFilter').value);}
function revisions(){const date=$('dateFilter').value;const ns=data.nights.filter(n=>n.date===date).sort((a,b)=>b.revision-a.revision);options('revisionFilter',ns.map(n=>({value:String(n.revision),label:`版本 ${n.revision} · ${n.savedAt}`})),'最新归档版本');$('archiveRevision').hidden=mode!=='history'||!date;}
function safeLink(url,label){try{const parsed=new URL(url);if(parsed.protocol!=='https:'&&parsed.protocol!=='http:')return txt('span',label);const a=txt('a',label);a.href=parsed.href;a.target='_blank';a.rel='noopener noreferrer';return a;}catch{return txt('span',label);}}
function time(sec){if(sec===null||sec===undefined)return '待确认';const n=Math.floor(sec);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;}
function block(label,value,cls=''){if(!value)return null;const e=txt('div','','copy-block '+cls);e.append(txt('strong',label),txt('p',value));return e;}
function render(){const phase=mode==='current'?data.currentPhase:$('phaseFilter').value;const query=$('query').value.trim().toLocaleLowerCase();const player=$('playerFilter').value;const picked=$('fightFilter').value;const ns=nights();const results=$('results');results.replaceChildren();$('nightSummary').replaceChildren();let fights=0,reviews=0;
for(const n of ns){if(n.summary&&!query&&!player&&!picked&&(!phase||n.fights.some(f=>f.reviews.some(r=>r.phase===phase))))$('nightSummary').append(txt('p',`${n.date} · 当晚备注\n${n.summary}`,'night-note'));
for(const f of n.fights){if(picked&&fightKey(f)!==picked)continue;const rs=f.reviews.filter(r=>(!phase||r.phase===phase)&&(!player||r.players.includes(player))&&(!query||JSON.stringify(r).toLocaleLowerCase().includes(query)));if(!rs.length&&(phase||player||query))continue;fights++;reviews+=rs.length;const card=txt('article','','fight');const head=txt('div','','fightHead');head.append(txt('h3',`${n.date} · 第 ${f.fightId} 场${f.label?' · '+f.label:''}`),txt('p',`${f.reportCode} · ${f.durationSeconds===null?'时长待确认':time(f.durationSeconds)} · 最远阶段：${f.reachedPhase||'待确认'} · 归档版本 ${n.revision}`,'meta'));if(f.sourceUrl)head.append(safeLink(f.sourceUrl,'查看原始日志 ↗'));card.append(head);
if(!rs.length)card.append(txt('p','该场已归档，复盘内容尚未录入。','meta'));
for(const r of rs){const rec=txt('section','','record');rec.append(txt('h4',`${r.phase} · ${r.title}`));if(r.players.length)rec.append(txt('p',r.players.join('、'),'people'));for(const [label,value,cls] of [['结论',r.conclusion,''],['经过',r.process,''],['判定口径',r.rule,'']]){const b=block(label,value,cls);if(b)rec.append(b);}if(r.evidence.length){const wrap=txt('div','','table-wrap');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',M8People.expand(r.title)+'的证据表，可横向滚动');const table=document.createElement('table');const thead=document.createElement('thead');const tr=document.createElement('tr');['战斗时间','玩家 / 对象','事件','证据与说明'].forEach(s=>tr.append(txt('th',s)));thead.append(tr);const tbody=document.createElement('tbody');for(const ev of r.evidence){const row=document.createElement('tr');row.append(txt('td',time(ev.seconds)),txt('td',ev.actor),txt('td',ev.event));const cell=txt('td',ev.note);if(ev.url){cell.append(txt('br',''),safeLink(ev.url,'查看证据 ↗'));}row.append(cell);tbody.append(row);}table.append(thead,tbody);wrap.append(table);rec.append(wrap);}card.append(rec);}results.append(card);}}
$('filterState').textContent=`已归档 ${latestNights().length} 晚 · ${latestNights().reduce((s,n)=>s+n.fights.length,0)} 场 ｜ 当前显示 ${fights} 场、${reviews} 条复盘`;
if(!results.children.length){const empty=txt('div','','empty');empty.append(txt('h3',data.nights.length?'没有符合条件的复盘':'等待第一晚开荒'),txt('p',data.nights.length?'可清除筛选，或切换历史复盘查看早期阶段。':'尚未录入活动日期、场次或复盘内容。首晚归档后将在这里显示。'));results.append(empty);}}
function setMode(next){mode=next;$('currentView').setAttribute('aria-pressed',String(mode==='current'));$('historyView').setAttribute('aria-pressed',String(mode==='history'));$('sectionNumber').textContent=mode==='current'?'01':'02';$('sectionTitle').textContent=mode==='current'?`${data.currentPhase} · 当前阶段复盘`:'历史复盘';$('viewDescription').textContent=mode==='current'?'仅展示当前开荒阶段。进度推进后，早期阶段仍保存在历史复盘中。':'保留每晚、每场的复盘；旧阶段与旧版结论均可回看。';options('phaseFilter',data.phases,'全部阶段',mode==='current'?data.currentPhase:'');$('phaseFilter').disabled=mode==='current';revisions();controls();render();}
$('focusBadge').textContent=`当前重点 · ${data.currentPhase}`;options('dateFilter',latestNights().map(n=>n.date),'全部日期');$('currentView').onclick=()=>setMode('current');$('historyView').onclick=()=>setMode('history');$('dateFilter').onchange=()=>{revisions();controls();render();};$('revisionFilter').onchange=()=>{controls();render();};for(const id of ['fightFilter','phaseFilter','playerFilter'])$(id).onchange=render;$('query').oninput=render;$('reset').onclick=()=>{for(const id of ['dateFilter','fightFilter','playerFilter','query'])$(id).value='';setMode(mode);};setMode('current');
