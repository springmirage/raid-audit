function installNov5(){
 if(AUDIT_DATE!=='2026-11-05')return;
 document.querySelector('.board-nav').innerHTML='<a href="#transition">01 · P2.5</a><a href="#p3">02 · P3机制</a><a href="#ghost">03 · 撞鬼</a><a href="#circle">04 · 套圈</a><a href="#interrupt">05 · 打断</a><a href="#rescue">06 · 救人</a><a href="#shield">07 · P3 盾伤害</a>';
 $('ghost').insertAdjacentHTML('beforebegin','<section id="transition"><div class="chapter"><span>01</span><h2>P2.5 · 阶段复盘</h2><p>五把P2.5的实际减员与BOSS回血。</p></div><div id="nov5TransitionTable"></div><div id="nov5TransitionResults"></div></section><section id="p3"><div class="chapter"><span>02</span><h2>P3 · 机制复盘</h2></div><div id="nov5P3Table"></div><div id="nov5P3Results"></div></section>');
 document.querySelector('footer').insertAdjacentHTML('beforebegin','<section id="rescue"><div class="chapter"><span>06</span><h2>恐惧行军 · 救人</h2><p>只展开死亡前没有救出的波次。</p></div><div id="nov5RescueResults"></div></section><section id="shield"><div class="chapter"><span>07</span><h2>P3 盾伤害</h2><p>仅统计 P3 护盾期间的伤害。</p></div><div id="nov5ShieldResults"></div></section>');
 for(const [id,num]of [['ghost','03'],['circle','04'],['interrupt','05']])$(id).querySelector('.chapter span').textContent=num;
 for(const id of ['interruptSummaryResults','interruptCounts','interrupt-melee','interrupt-ranged','interrupt-unknown','interruptSharedTitle','interruptSharedResults','interruptMovement'])$(id).hidden=true;
 document.querySelector('.interrupt-tabs').hidden=true;
 $('interrupt').insertAdjacentHTML('beforeend','<div id="nov5InterruptTable"></div><div id="nov5InterruptResults"></div>');
 $('circleResults').insertAdjacentHTML('beforebegin','<div id="nov5CircleTable"></div>');
 $('nov5P3Results').insertAdjacentHTML('afterend','<div id="nov5PersonnelResults"></div>');
}
function nov5Cards(id,items,label){
 $(id).innerHTML=items.filter(accepts).map(x=>{let html=renderRecord(x,label);if(x.evidenceText)html=html.replace('</article>',`<details class="nov2-evidence"><summary>查看核对依据</summary><p>${prose(x.evidenceText)}</p></details></article>`);return html;}).join('')||'<p class="empty">本筛选范围没有需要展开的异常。</p>';
}
function nov5Table(headers,rows){return nov3Table(headers,rows);}
function renderNov5(){
 const s=state(),phase=DATA.phaseSummary.filter(x=>!s.fid||x.fight===Number(s.fid));
 $('nov5TransitionTable').innerHTML=nov5Table(['WCL场次','P2.5开始','P3开始','debuff最高层','P2.5经过'],phase.map(x=>[x.fight,x.start,x.p3,x.stack,x.transition]));
 $('nov5P3Table').innerHTML=nov5Table(['WCL场次','练到位置','关键结果'],phase.map(x=>[x.fight,x.reached,x.outcome]));
 $('nov5CircleTable').innerHTML=nov5Table(['WCL场次','阶段／轮次','点名','时间','结果'],DATA.circleTableRows.filter(x=>(!s.fid||x.fight===Number(s.fid))&&(!s.player||x.players.includes(s.player))&&(!s.q||JSON.stringify(x).toLowerCase().includes(s.q))).map(x=>[x.fight,x.label,x.players.join('、'),x.time,x.result]));
 $('nov5InterruptTable').innerHTML=nov5Table(['WCL场次','正常打断简报'],DATA.interruptTableRows.filter(x=>!s.fid||x.fight===Number(s.fid)).map(x=>[x.fight,x.summary]));
 for(const [id,items,label]of [['nov5TransitionResults',DATA.transitionReviews,'P2.5'],['nov5P3Results',DATA.p3Reviews,'P3'],['ghostResults',DATA.ghosts,'本人鬼接触'],['resonanceResults',DATA.resonance,'恶毒共鸣'],['circleResults',DATA.circles,'套圈'],['nov5InterruptResults',DATA.interrupts.shared,'大怪打断'],['nov5RescueResults',DATA.rescueReviews,'救人']])nov5Cards(id,items,label);
 $('nov5PersonnelResults').innerHTML=DATA.p3Personnel.filter(x=>(!s.fid||x.fight===Number(s.fid))&&(!s.player||JSON.stringify(x).includes(s.player))&&(!s.q||JSON.stringify(x).toLowerCase().includes(s.q))).map(x=>`<article class="fight">${head(x,'P3 · 分担、搬球与大怪人员记录')}<h3>分担点名与参与证据</h3><p>分担围绕点名目标9码展开，接触、站位和防护分别列示。</p>${nov5Table(['次数／时间','点名','伤害／吸收／零伤接触','站位参考（9码）','免疫／减伤','其他免疫操作','结果'],x.soaks.filter(r=>!s.player||JSON.stringify(r).includes(s.player)).map(r=>['第'+r.ordinal+'次 '+r.start+'→'+r.impact,r.marked,r.contacts,r.nearby,r.defenses,r.otherImmune||'—',r.result]))}${x.soaks.length<2?'<p>本把没有出现P3第2次分担读条。</p>':''}<h3>绿紫球拾取与放下</h3><p>逐次列出绿紫球拾取与放下，死亡落球单独注明。</p>${nov5Table(['颜色','玩家','拾取','结束／放下','实际结束记录'],x.orbs.filter(r=>!s.player||r.player===s.player).map(r=>[r.color,r.player,r.pickup,r.end,r.result]))}<h3>P3大怪逐条打断</h3>${x.reads.length?nov5Table(['波次／目标','条数','开始','结束','实际打断者／结果'],x.reads.filter(r=>!s.player||r.result.includes(s.player)).map(r=>[r.npc,'第'+r.ordinal+'条',r.start,r.end,r.result])):'<p>本把未练到P3新大怪打断。</p>'}</article>`).join('');
 $('nov5ShieldResults').innerHTML=DATA.shieldReviews.filter(x=>x.phase==='P3'&&(!s.fid||x.fight===Number(s.fid))&&(!s.player||x.rows.some(r=>r.name===s.player))&&(!s.q||JSON.stringify(x).toLowerCase().includes(s.q))).map(x=>{
  const rows=s.player?x.rows.filter(r=>r.name===s.player):x.rows,max=Math.max(1,...x.rows.map(r=>r.damage));
  return `<article class="fight">${head(x,'P3第'+x.ordinal+'盾')}<h3>${esc(x.start)}–${esc(x.end)} · ${esc(x.status)}</h3><div class="nov2-bars">${rows.map(r=>`<div class="nov2-bar-row"><div class="nov2-bar-top"><span>${r.rank}. ${person(r.name)}</span><strong>${(r.damage/10000).toFixed(2)}万</strong></div><div class="nov2-bar-track"><span style="width:${(r.damage/max*100).toFixed(3)}%;background:${COLORS[r.className]||'#64748b'}"></span></div></div>`).join('')}</div></article>`;
 }).join('')||'<p class="empty">当前筛选范围没有 P3 盾伤害记录。</p>';
 $('filterState').textContent=`当前查看：11月5日 · ${s.fid?title(s.fid):'全部场次'} · ${s.player||'全部玩家'}${s.q?' · “'+s.q+'”':''}`;
 $('playerFilter').style.color=COLORS[DATA.roster[s.player]]||'#1d2939';
}
