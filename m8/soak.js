"use strict";
function render05(root){
const S=window.M8_SOAK,fs=S.fights.filter(f=>f.rounds.some(r=>r.isAbnormal));
const rs=f=>f.rounds.filter(r=>r.isAbnormal),round=r=>'第 '+r.cycle+' 轮 · 第 '+r.withinCycle+' 次分担';
const names=xs=>xs.map(p=>p.name+(p.role==='坦克'?'（坦克）':'')).join('、')||'无';
const cause=r=>[r.lowCount?'分担 '+r.count+' 人':'',r.unhatched.length?'分担结束后 '+r.unhatched.map(p=>p.name).join('、')+' 仍背蛋':''].filter(Boolean).join('；');
const top=el('section',undefined,'summary');add(top,el('h2','05 分担复盘'),para(S.abnormalFightCount+' 把 · '+S.abnormalCount+' 次异常结算'),para(S.scope,'scope'));top.append(table(['场次','分担轮次','时间','异常情况'],fs.flatMap(f=>rs(f).map(r=>['第 '+f.fightId+' 把',round(r),r.time,cause(r)]))));root.append(top);
if(!fs.length){root.append(para('本晚各次分担均达到8人，轮次结束时已完成孵化。'));return;}
const filters=el('div',undefined,'controls'),label=el('label','场次'),select=el('select');select.id='soakFightFilter';select.append(new Option('全部异常场次',''));for(const f of fs)select.append(new Option('第 '+f.fightId+' 把 · F'+f.fightId,String(f.fightId)));if(!fs.some(f=>String(f.fightId)===window.m8SoakFight))window.m8SoakFight='';select.value=window.m8SoakFight||'';select.onchange=()=>{window.m8SoakFight=select.value;render()};label.append(select);filters.append(label);root.append(filters);
for(const f of fs){if(window.m8SoakFight&&String(f.fightId)!==window.m8SoakFight)continue;const card=el('article',undefined,'fight soak-fight');card.dataset.fight=f.fightId;card.append(el('h3','第 '+f.fightId+' 把 · F'+f.fightId));
for(const r of rs(f)){const block=el('section',undefined,'issue soak-round');block.dataset.round=r.number;add(block,el('h4',round(r)+' · '+r.time),para(cause(r),'impact'));
if(r.unhatched.length)block.append(table(['仍持蛋人员','拿蛋时间','本次分担'],r.unhatched.map(p=>[p.name,p.pickedAt,p.participated?'已计入':'分担标记 —'])));
block.append(para('结算前存活 '+r.aliveBefore+' 人 · 已死亡 '+r.deadBefore.length+' 人'+(r.spiritBefore.length?' · 救赎之魂 '+r.spiritBefore.length+' 人':'')+'。'));
if(r.lowCount&&r.aliveBefore<8)block.append(para('当时存活人数为 '+r.aliveBefore+' 人，分担人数受到减员限制。','scope'));
block.append(para('实际分担 '+r.count+' 人：'+names(r.participants)+'。'));
const protectedPlayers=r.protected.filter(p=>p.counted);if(protectedPlayers.length)block.append(para('免疫或吸收仍计入：'+protectedPlayers.map(p=>p.name+'（'+p.kind+'）').join('、')+'。','scope'));
const detail=el('details',undefined,'roster');detail.append(el('summary','当时存活与减员名单'));detail.append(para('存活可行动：'+r.aliveNames.join('、')+'。'));if(r.unavailable.length)detail.append(table(['此前减员','时间','状态'],r.unavailable.map(p=>[p.name,p.time,p.kind])));if(r.priorRestriction.length)detail.append(para('仍有前次分担限制：'+names(r.priorRestriction)+'。'));detail.append(link('对应分担日志 ↗',r.url));block.append(detail);card.append(block);}
root.append(card);}}
