'use strict';
function render05(root) {
  const S=window.M8_SOAK;
  const label=p=>p.name+(p.role==='坦克'?'（坦克）':'');
  const names=xs=>xs.map(label).join('、')||'无';
  const top=el('section',undefined,'summary');
  add(top,el('h2','05 分担复盘'),para(S.scope,'scope'),para(S.assignmentCaution,'scope'));
  top.append(table(['场次','第一砸确认','第二砸确认'],S.fights.map(f=>['第 '+f.pull+' 把 · F'+f.fightId,...f.rounds.map(r=>r.status==='not_completed'?'未完成':r.time+' · '+r.count+'人')])));
  root.append(top);
  const filters=el('div',undefined,'controls'),fl=el('label','场次'),select=el('select');
  select.id='soakFightFilter';select.append(new Option('全部场次',''));
  for(const f of S.fights)select.append(new Option('第 '+f.pull+' 把 · F'+f.fightId,String(f.fightId)));
  select.value=window.m8SoakFight||'';select.onchange=()=>{window.m8SoakFight=select.value;render()};fl.append(select);filters.append(fl);root.append(filters);
  for(const f of S.fights) {
    if(window.m8SoakFight&&String(f.fightId)!==window.m8SoakFight)continue;
    const card=el('article',undefined,'fight soak-fight');card.dataset.fight=String(f.fightId);
    add(card,el('h3','第 '+f.pull+' 把 · F'+f.fightId),para(f.summary,'impact'));
    if(f.unrecordedBoth.length) {
      card.append(para('两次均未记入，第二砸前仍存活：'+names(f.unrecordedBoth)+'。','action'));
      card.append(para('先对当晚分组和站位任务。坦克另有职责，名单本身不作缺席定责。','scope'));
    }
    for(const r of f.rounds) {
      const block=el('section',undefined,'issue soak-round');
      if(r.status==='not_completed') {add(block,el('h4',(r.number===1?'第一砸':'第二砸')+' · 未完成'),para('没有完成落砸，不填0人，也不列缺席。','muted'));card.append(block);continue}
      add(block,el('h4',(r.number===1?'第一砸':'第二砸')+' · '+r.time+' · 确认 '+r.count+' 人'));
      block.append(para('确认分担：'+names(r.participants)+'。','soak-participants'));
      const countedProtected=r.protected.filter(p=>p.counted);
      if(countedProtected.length)block.append(para('零伤仍计入：'+countedProtected.map(p=>label(p)+'（'+p.kind+'，已确认分担）').join('、')+'。','scope'));
      const ambiguous=r.protected.filter(p=>!p.counted&&!p.hasPriorRestriction);
      if(ambiguous.length)block.append(para('有免疫/吸收记录但未确认本次分担：'+names(ambiguous)+'。不能单凭零伤判断到场或缺席。','scope'));
      const detail=el('details',undefined,'roster');
      detail.append(el('summary','核对未记入人员：存活且无前次限制 '+r.unrecordedEligible.length+' 人 · 前次限制 '+r.priorRestriction.length+' 人 · 已减员 '+r.unavailable.length+' 人'));
      detail.append(para('当次未记入，落砸时存活且无前次限制：'+names(r.unrecordedEligible)+'。'));
      detail.append(para('第一砸限制仍在，不重复算第二砸：'+names(r.priorRestriction)+'。'));
      if(r.unavailable.length)detail.append(table(['落砸前已减员','时间','状态'],r.unavailable.map(p=>[label(p),p.time,p.kind])));
      else detail.append(para('落砸前没有减员。','muted'));
      detail.append(link('对应减益日志 ↗',r.url));block.append(detail);card.append(block);
    }
    root.append(card);
  }
  const methods=el('details',undefined,'panel');methods.append(el('summary','核对口径'));
  methods.append(para('先看每次落砸新增的灵魂绞杀者，再查死亡、救赎之魂和前次限制。保护技能不从确认名单中扣人；全团伤害名单、伤害高低和地面距离采样不用于反推到场人数。','scope'));
  for(const src of S.methodSources){const p=para(src.fact,'scope');p.append(document.createTextNode(' '),link('技能来源 ↗',src.url));methods.append(p)}
  root.append(methods);
}
