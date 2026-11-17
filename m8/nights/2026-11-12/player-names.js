'use strict';
window.M8People = (() => {
  const D=window.M8_PLAYER_DATA;
  const canonical=Object.assign(Object.create(null),D.aliases);
  for(const name of Object.keys(D.roster))canonical[name]=name;
  const esc=s=>s.replace(/[\\^$.*+?()[\]{}|]/g,'\\$&');
  const tokens=Object.keys(canonical).sort((a,b)=>b.length-a.length);
  const pattern=new RegExp(tokens.map(name=>/^[A-Za-z0-9_]+$/.test(name)?'(?<![A-Za-z0-9_])'+esc(name)+'(?![A-Za-z0-9_])':esc(name)).join('|'),'g');
  const fullName=name=>canonical[String(name)]||String(name);
  const colorFor=name=>D.colors[D.roster[fullName(name)]]||null;
  function expand(value){return String(value??'').replace(pattern,name=>canonical[name]);}
  function setText(element,value){
    const text=String(value??'');const fragment=document.createDocumentFragment();let end=0;
    for(const match of text.matchAll(pattern)){
      fragment.append(document.createTextNode(text.slice(end,match.index)));
      const name=canonical[match[0]],span=document.createElement('span');
      span.className='player-name';span.dataset.player=name;span.dataset.playerClass=D.roster[name];
      span.style.color=colorFor(name);span.textContent=name;fragment.append(span);
      end=match.index+match[0].length;
    }
    fragment.append(document.createTextNode(text.slice(end)));element.replaceChildren(fragment);return element;
  }
  function styleSelect(select){
    for(const option of select.options){
      option.textContent=expand(option.textContent);
      const color=colorFor(option.value);
      if(color){option.style.color=color;option.style.fontWeight='700';option.dataset.player=fullName(option.value);}
      else{option.style.removeProperty('color');option.style.removeProperty('font-weight');delete option.dataset.player;}
    }
    const color=colorFor(select.value);
    if(color){select.style.color=color;select.style.fontWeight='700';select.dataset.player=fullName(select.value);}
    else{select.style.removeProperty('color');select.style.removeProperty('font-weight');delete select.dataset.player;}
    if(!select.dataset.playerStyled){select.addEventListener('change',()=>styleSelect(select));select.dataset.playerStyled='true';}
  }
  return Object.freeze({fullName,colorFor,expand,setText,styleSelect,roster:D.roster,aliases:D.aliases,colors:D.colors});
})();
