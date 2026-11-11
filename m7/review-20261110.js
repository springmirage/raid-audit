function initNov10(){
 if(location.hash==='#ghost')history.replaceState(null,'',location.pathname+location.search);
 document.body.classList.add('nov10');document.title=DATA.title+' · 11月10日';
 $('pageTitle').textContent=DATA.title;$('subtitle').textContent=DATA.subtitle;$('intro').textContent=DATA.intro;
 for(const id of ['ghost','circle','interrupt'])$(id).hidden=true;
 const nav=document.querySelector('.board-nav');nav.innerHTML=DATA.categories.map((c,i)=>`<a href="#nov10-${c.id}">${String(i+1).padStart(2,'0')} · ${esc(c.label)}</a>`).join('');
 $('ghost').insertAdjacentHTML('beforebegin',`<div class="nov10-scope"><strong>复盘范围</strong><p>${esc(DATA.scope)}</p></div><div id="nov10Results"></div><details class="nov10-method"><summary>证据与判定口径</summary><ul>${DATA.coverage.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></details>`);
 $('footerText').textContent=DATA.footer;
 $('dateFilter').innerHTML=Object.entries(AUDIT_DATES).sort(([a],[b])=>b.localeCompare(a)).map(([d,m])=>`<option value="${d}">${esc(m.label)}</option>`).join('');$('dateFilter').value=AUDIT_DATE;
 $('dateFilter').addEventListener('change',()=>{let u=new URL(location.href);u.searchParams.set('date',$('dateFilter').value);u.hash='';location.assign(u.href)});
 $('fightFilter').innerHTML='<option value="">全部 P3 场次</option>'+DATA.fights.map(f=>`<option value="${f.id}">WCL ${f.id}</option>`).join('');
 $('playerFilter').innerHTML='<option value="">全部玩家</option>'+Object.keys(DATA.roster).sort((a,b)=>a.localeCompare(b,'zh-CN')).map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join('');
 $('query').placeholder='查找分担、套圈、名字或经过';
 for(const id of ['fightFilter','playerFilter','query'])$(id).addEventListener(id==='query'?'input':'change',renderNov10);
 $('reset').addEventListener('click',()=>{for(const id of ['fightFilter','playerFilter','query'])$(id).value='';let u=new URL(location.href);for(const k of ['fight','player','q'])u.searchParams.delete(k);u.hash='';history.replaceState(null,'',u);renderNov10()});
 const u=new URL(location.href);if(DATA.fights.some(f=>String(f.id)===u.searchParams.get('fight')))$('fightFilter').value=u.searchParams.get('fight');if(Object.hasOwn(DATA.roster,u.searchParams.get('player')))$('playerFilter').value=u.searchParams.get('player');$('query').value=u.searchParams.get('q')||'';
 renderNov10();
}
function nov10Accept(r){const s=state();return(!s.fid||r.fight===Number(s.fid))&&(!s.player||r.players.includes(s.player))&&(!s.q||JSON.stringify(r).toLowerCase().includes(s.q))}
function renderNov10(){
 const s=state(),records=DATA.records.filter(nov10Accept);
 $('filterState').textContent=`当前查看：11月10日 · ${s.fid?'WCL '+s.fid:'全部 P3 场次'} · ${s.player||'全部玩家'} · ${records.length} 项问题${s.q?' · “'+s.q+'”':''}`;
 $('playerFilter').style.color=COLORS[DATA.roster[s.player]]||'#1d2939';
 $('nov10Results').innerHTML=DATA.categories.map((c,i)=>{let rows=records.filter(r=>r.category===c.id);return `<section id="nov10-${c.id}"><div class="chapter"><span>${String(i+1).padStart(2,'0')}</span><h2>${esc(c.title)}</h2><p>${esc(c.description)}</p></div>${rows.map(r=>`<article class="fight nov10-record ${r.context?'nov10-context':''}" id="${esc(r.key)}"><div class="fightHead"><div><span class="eyebrow">WCL ${r.fight} · ${esc(r.phase||'P3')} · ${esc(r.time)}</span><h3>${esc(r.title)}</h3></div><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">查看 WCL ↗</a></div>${[['process','经过'],['result','结果'],['reminder',r.context?'复盘边界':'下次怎么做']].filter(([k])=>r[k]).map(([k,label])=>`<div class="copy-block"><h4>${label}</h4><p>${prose(r[k])}</p></div>`).join('')}<details class="nov10-evidence"><summary>核对依据</summary><p>${prose(r.evidenceText)}</p>${r.evidenceRows?.length?`<div class="read-table-wrap"><table class="read-table"><thead><tr>${r.evidenceHeaders.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${r.evidenceRows.map(row=>`<tr>${row.map(x=>`<td>${prose(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}</details></article>`).join('')||'<p class="empty">这组筛选没有已收录的问题。</p>'}</section>`}).join('');
}

window.addEventListener('pageshow',()=>{const date=document.getElementById('dateFilter');if(date)date.value=AUDIT_DATE;});
