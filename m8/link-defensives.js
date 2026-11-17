"use strict";
function render08(root){
const data=window.M8_LINK_DEFENSIVES||[];
const names={465:'虔诚光环',31224:'暗影斗篷',1307578:'Soulcoil Barrier',374349:'新生光焰',363916:'黑曜鳞片',1246768:'真言术：盾',48707:'反魔法护罩',186265:'灵龟守护',104773:'不灭决心',1966:'佯攻',97463:'集结呐喊',22812:'树皮术',374227:'微风',235450:'棱光护体',145629:'反魔法领域',108416:'黑暗契约',118038:'剑在人在',184662:'复仇之盾',403876:'圣佑术',642:'圣盾术',6940:'牺牲祝福',48792:'冰封之韧',264735:'优胜劣汰',19236:'绝望祷言',47788:'守护之魂',414658:'Ice Cold',120954:'壮胆酒',108271:'星界转移',386208:'防御姿态'};
const immune=new Set([31224,186265,642]),absorb=new Set([1307578,1246768,48707,235450,108416,184662]),health=new Set([97463,19236]),heal=new Set([374349,47788]);
const spell=b=>`${names[b.spell]||b.name}（${immune.has(b.spell)?'免疫':absorb.has(b.spell)?'吸收':health.has(b.spell)?'增血':heal.has(b.spell)?'恢复':b.spell===120954?'减伤与增血':'减伤'}）`;
const num=n=>n==null?'—':Number(n).toLocaleString('zh-CN');
const top=el('section',undefined,'panel');add(top,el('h2','08 拉线减伤'),para('首次拉线逐跳记录 · 双侧非坦克'),para('数值单位为点。实际扣血、吸收、致死溢出与总减免分别列出；总减免包含全能等被动效果。每跳按当时生效的防护列示。','scope'));root.append(top);
for(const f of data){const card=el('article',undefined,'fight');add(card,el('h3','第 '+f.fight+' 把 · F'+f.fight),para(f.sixStackTime==null?'首批拉断5根，随后第6根重新形成1层。':time(f.sixStackTime)+' 叠至6层；实际6层跳点 '+[...new Set(f.players.flatMap(p=>p.hits.filter(h=>h.sixStackWindow).map(h=>time(h.time))))].join('、')));
card.append(table(['拉断时间','人员'],f.links.map(x=>[time(x.time),x.name])));
for(const side of ['小梅侧','以血侧',null]){const ps=f.players.filter(p=>p.side===side);if(!ps.length)continue;card.append(el('h4',side||'位置记录待核对'));
for(const p of ps){const detail=el('details',undefined,'detail');const six=p.hits.filter(h=>h.sixStackWindow);detail.append(el('summary',p.name+' · '+(six.length?'六层实际扣血 '+num(six.reduce((a,h)=>a+h.amount,0))+' · '+six.length+' 跳':'六层伤害记录 —')));
const active=p.buffIntervals.filter(b=>b.source===p.id||[145629,97463,6940,47788].includes(b.spell));detail.append(para(active.length?active.map(b=>time(b.start)+' '+spell(b)+(b.end==null?'': ' 至 '+time(b.end))).join('；'):'该时段主动防护记录 —'));
if(p.hits.length)detail.append(table(['时间 / 层数','当跳生效防护','实际扣血','吸收','致死溢出','总减免','减免前伤害'],p.hits.map(h=>[time(h.time)+' / '+(h.stack??'—')+(h.sixStackWindow?' · 六层':''),h.buffs.map(spell).join('、')||'主动防护记录 —',num(h.amount),num(h.absorbed),num(h.overkill),num(h.mitigated),num(h.unmitigatedAmount)])));
for(const de of p.death){const hit=de.lethalEvent||p.hits.find(h=>h.overkill>0&&Math.abs(h.time-de.time)<.15);detail.append(para(time(de.time)+' 死亡 · '+(de.spellID===1317955?'拉线伤害':({1286835:'坏死蒸汽',1292403:'毒波',1287265:'幽魂盘卷',1308275:'薄膜伤害',1:'近战攻击'}[de.spellID]||de.spell))+(hit?' · 致死扣血 '+num(hit.amount)+' · 溢出 '+num(hit.overkill):'')));}
card.append(detail);}}
card.append(link('本把日志 ↗','https://cn.warcraftlogs.com/reports/KBaZGNDwvR4Vck8x?fight='+f.fight));root.append(card);}}
