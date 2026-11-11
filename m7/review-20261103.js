function nov3DpsState(text){return String(text).split(/(盾前\d+:\d{2}(?:\.\d+)?有死亡记录)/g).map(part=>/^盾前/.test(part)?`<span class="nov3-death">${esc(part)}</span>`:esc(part)).join('');}
function installNov3(){
 if(AUDIT_DATE!=='2026-11-03')return;
 document.querySelector('.board-nav').innerHTML='<a href="#transition">01 · P2.5</a><a href="#p3">02 · P3 机制</a><a href="#ghost">03 · 撞鬼</a><a href="#circle">04 · 套圈</a><a href="#interrupt">05 · 打断</a><a href="#rescue">06 · 救人</a><a href="#shield">07 · 打盾与DPS</a>';
 $('ghost').insertAdjacentHTML('beforebegin','<section id="transition"><div class="chapter"><span>01</span><h2>P2.5 · 灵魂绑定与残片</h2><p>5把过渡并列核对。表内场次均为WCL编号；时间从开怪开始计算。</p></div><div id="nov3TransitionTable"></div><div id="nov3TransitionResults"></div></section><section id="p3"><div class="chapter"><span>02</span><h2>P3 · 搬球、分担与首盾</h2><p>重点展开失败经过。第14场在过渡期已经崩盘，P3收尾不追加判责。</p></div><div id="nov3P3Table"></div><div id="nov3P3Results"></div></section>');
 document.querySelector('footer').insertAdjacentHTML('beforebegin','<section id="rescue"><div class="chapter"><span>06</span><h2>恐惧行军 · 救人</h2><p>正常点名、再次接触和漏断后的失控分别核对。</p></div><div id="nov3RescueResults"></div></section><section id="shield"><div class="chapter"><span>07</span><h2>打盾与DPS表现</h2><p>破盾量只计Boss护盾实际吸收的伤害，宠物归主人。死亡、搬球和技能覆盖同时列出，数值不直接等同执行责任。</p></div><div id="nov3ShieldResults"></div><div id="nov3DpsResults"></div></section>');
 $('ghost').querySelector('.chapter span').textContent='03';$('circle').querySelector('.chapter span').textContent='04';$('interrupt').querySelector('.chapter span').textContent='05';
 for(const id of ['interruptSummaryResults','interruptCounts','interrupt-melee','interrupt-ranged','interrupt-unknown','interruptSharedTitle','interruptSharedResults','interruptMovement'])$(id).hidden=true;
 document.querySelector('.interrupt-tabs').hidden=true;
 $('interrupt').insertAdjacentHTML('beforeend','<div id="nov3InterruptResults"></div>');
}
function nov3Table(headers,rows,highlightFight=null){return `<div class="nov2-table-scroll"><table class="nov2-table nov3-table"><thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,index)=>`<td${row[0]===highlightFight&&index===row.length-1?' class="nov3-important"':''}>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function nov3Cards(id,items,label){$(id).innerHTML=items.filter(accepts).map(x=>{let h=renderRecord(x,label,x.key!=='dps-tempo-25');if(x.targetAudit)h=h.replace('</article>',`<details class="nov2-evidence nov3-target-audit"><summary>逐人施法与目标（13名DPS）</summary>${nov3Table(['玩家','盾内带主目标的输出施法事件','核对结论'],x.targetAudit.map(row=>[row.name,row.casts,row.note]))}</details></article>`);if(x.evidenceText)h=h.replace('</article>',`<details class="nov2-evidence"><summary>查看核对依据</summary><p>${prose(x.evidenceText)}</p>${(x.evidenceLinks||[]).map(l=>`<p><a href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.title)} ↗</a></p>`).join('')}</details></article>`);return h;}).join('')||'<p class="empty">当前筛选范围没有需要展开的问题记录。</p>';}
function renderNov3(){
 const s=state();const selected=DATA.phaseSummary.filter(x=>!s.fid||x.fight===Number(s.fid));
 $('nov3TransitionTable').innerHTML=nov3Table(['WCL场次','P2.5开始','P3开始','debuff最高层','P2.5经过'],selected.map(x=>[x.fight,x.start,x.p3,x.stack,x.transition]));
 $('nov3P3Table').innerHTML=nov3Table(['WCL场次','练到的位置','关键结果'],selected.map(x=>[x.fight,x.reached,x.outcome]),17);
 nov3Cards('nov3TransitionResults',DATA.transitionReviews,'P2.5');nov3Cards('nov3P3Results',DATA.p3Reviews,'P3');
 nov3Cards('ghostResults',DATA.ghosts,'本人鬼接触');nov3Cards('resonanceResults',DATA.resonance,'恶毒共鸣');nov3Cards('circleResults',DATA.circles,'套圈');nov3Cards('nov3InterruptResults',DATA.interrupts.shared,'大怪打断');nov3Cards('nov3RescueResults',DATA.rescueReviews,'救人');
 if(DATA.rescueSuccessSummary&&accepts(DATA.rescueSuccessSummary))$('nov3RescueResults').insertAdjacentHTML('beforeend',`<p class="intro">${prose(DATA.rescueSuccessSummary.process)}</p>`);
 $('nov3ShieldResults').innerHTML=DATA.shieldReviews.filter(x=>(!s.fid||x.fight===Number(s.fid))&&(!s.player||x.rows.some(r=>r.name===s.player))&&(!s.q||JSON.stringify(x).toLowerCase().includes(s.q))).map(x=>{
  const rows=s.player?x.rows.filter(r=>r.name===s.player):x.rows,max=Math.max(1,...x.rows.map(r=>r.damage));
  return `<article class="fight">${head(x,x.phase+'首盾')}<h3>${esc(x.start)}–${esc(x.end)} · ${esc(x.status)}</h3><p>${prose(x.process)}</p><p class="nov2-unit">全团破盾量 ${(x.total/10000).toFixed(2)}万 · 下列为DPS贡献 · 宠物归主人</p><div class="nov2-bars">${rows.map(r=>`<div class="nov2-bar-row"><div class="nov2-bar-top"><span>${r.rank}. ${person(r.name)}</span><strong>${(r.damage/10000).toFixed(2)}万</strong></div><div class="nov2-bar-track"><span style="width:${(r.damage/max*100).toFixed(3)}%;background:${COLORS[r.className]||'#64748b'}"></span></div><p class="nov2-burst">${nov3DpsState(r.state||'本盾期间存活')}${r.burst?.length?' · '+r.burst.map(esc).join('；'):''}</p>${r.zeroReason?`<p class="nov2-burst nov3-zero-reason">${prose(r.zeroReason)}</p>`:''}</div>`).join('')}</div></article>`;
 }).join('')||'<p class="empty">当前筛选范围没有打到P3首盾的记录。</p>';
 nov3Cards('nov3DpsResults',DATA.dpsReviews,'输出节奏');
 $('filterState').textContent=`当前查看：11月3日 · ${s.fid?title(s.fid):'全部场次'} · ${s.player||'全部玩家'}${s.q?' · “'+s.q+'”':''}`;
 $('playerFilter').style.color=COLORS[DATA.roster[s.player]]||'#1d2939';
}
