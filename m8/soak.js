'use strict';
function render05(root) {
  const S=window.M8_SOAK;
  const roundLabel=r=>'第 '+(r.cycle||Math.ceil(r.number/2))+' 轮 · 第 '+(r.withinCycle||((r.number-1)%2+1))+' 次分担';
  const label=p=>p.name+(p.role==='坦克'?'（坦克）':'');
  const names=xs=>xs.map(label).join('、')||'无';
  const top=el('section',undefined,'summary');
  add(top,el('h2','05 分担复盘'),para(S.scope,'scope'),para(S.assignmentCaution,'scope'));
  top.append(table(['场次','分担轮次','落砸时间','实际人数'],S.fights.flatMap(f=>f.rounds.map(r=>['第 '+f.pull+' 把 · F'+f.fightId,roundLabel(r),r.status==='not_completed'?'未完成':r.time,r.status==='not_completed'?'—':r.count+' 人']))));
  root.append(top);
  const filters=el('div',undefined,'controls'),fl=el('label','场次'),select=el('select');
  select.id='soakFightFilter';select.append(new Option('全部场次',''));
  for(const f of S.fights)select.append(new Option('第 '+f.pull+' 把 · F'+f.fightId,String(f.fightId)));
  select.value=window.m8SoakFight||'';select.onchange=()=>{window.m8SoakFight=select.value;render()};fl.append(select);filters.append(fl);root.append(filters);
  for(const f of S.fights) {
    if(window.m8SoakFight&&String(f.fightId)!==window.m8SoakFight)continue;
    const card=el('article',undefined,'fight soak-fight');card.dataset.fight=String(f.fightId);
    add(card,el('h3','第 '+f.pull+' 把 · F'+f.fightId),para(f.summary,'impact'));
    for(const c of (f.cycles||[]))if(c.unrecordedBoth?.length){card.append(para('第 '+c.cycle+' 轮两次均未记入，第二次落砸前仍存活：'+names(c.unrecordedBoth)+'。','scope'));}
    for(const r of f.rounds) {
      const block=el('section',undefined,'issue soak-round');
      if(r.status==='not_completed') {add(block,el('h4',roundLabel(r)+' · 未完成'),para('战斗在本次落砸完成前结束。','muted'));card.append(block);continue}
      add(block,el('h4',roundLabel(r)+' · '+r.time+' · 确认 '+r.count+' 人'));
      block.append(para('确认分担：'+names(r.participants)+'。','soak-participants'));
      const countedProtected=r.protected.filter(p=>p.counted);
      if(countedProtected.length)block.append(para('零伤仍计入：'+countedProtected.map(p=>label(p)+'（'+p.kind+'，已确认分担）').join('、')+'。','scope'));
      const ambiguous=r.protected.filter(p=>!p.counted&&!p.hasPriorRestriction);
      if(ambiguous.length)block.append(para('有免疫/吸收记录但未确认本次分担：'+names(ambiguous)+'。','scope'));
      const detail=el('details',undefined,'roster');
      detail.append(el('summary','核对未记入人员：存活且无前次限制 '+r.unrecordedEligible.length+' 人 · 前次限制 '+r.priorRestriction.length+' 人 · 已减员 '+r.unavailable.length+' 人'));
      detail.append(para('当次未记入，落砸时存活且无前次限制：'+names(r.unrecordedEligible)+'。'));
      detail.append(para('落砸时仍有前次分担限制：'+names(r.priorRestriction)+'。'));
      if(r.unavailable.length)detail.append(table(['落砸前已减员','时间','状态'],r.unavailable.map(p=>[label(p),p.time,p.kind])));
      else detail.append(para('落砸前没有减员。','muted'));
      detail.append(link('对应减益日志 ↗',r.url));block.append(detail);card.append(block);
    }
    root.append(card);
  }
  const methods=el('details',undefined,'panel');methods.append(el('summary','核对口径'));
  methods.append(para('每次分担人数来自同一落砸来源的新增的灵魂绞杀者记录，确认名单包含免疫与全吸收玩家；死亡、救赎之魂和前次限制另列。','scope'));
  for(const src of S.methodSources){const p=para(src.fact,'scope');p.append(document.createTextNode(' '),link('技能来源 ↗',src.url));methods.append(p)}
  root.append(methods);
}
