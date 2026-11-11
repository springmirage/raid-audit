#!/usr/bin/env python3
"""Local-only archive tool. Append revisions, never delete existing nights/fights/reviews."""
import argparse, copy, datetime, json, os, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
def read(path):
    return json.loads(Path(path).read_text(encoding='utf-8-sig'))
def require(condition, message):
    if not condition: raise ValueError(message)
def text(value): return isinstance(value,str)
def nonempty(value): return text(value) and bool(value.strip())
def key(f): return (f['reportCode'], f['fightId'])
def validate(n, phases, partial=False):
    require(isinstance(n,dict),'夜归档必须为对象')
    date=n.get('date',''); require(text(date) and re.fullmatch(r'\d{4}-\d{2}-\d{2}',date),'date 必须为 YYYY-MM-DD')
    datetime.date.fromisoformat(date)
    require(text(n.get('summary','')),'summary 必须为文字')
    require(isinstance(n.get('fights'),list),'fights 必须为列表')
    seen=set()
    for f in n['fights']:
        require(isinstance(f,dict),'场次必须为对象')
        require(nonempty(f.get('reportCode')),'reportCode 不可为空')
        require(type(f.get('fightId')) is int and f['fightId']>0,'fightId 必须为正整数')
        require(key(f) not in seen,'同夜 reportCode + fightId 重复'); seen.add(key(f))
        require(f.get('reachedPhase','') in phases+[''],'reachedPhase 不在已配置阶段中')
        seconds=f.get('durationSeconds'); require(seconds is None or (type(seconds) in (int,float) and 0<=seconds<86400),'durationSeconds 无效')
        for field in ['label','sourceUrl']: require(text(f.get(field,'')),field+' 必须为文字')
        require(isinstance(f.get('reviews', [] if partial else None),list),'reviews 必须为列表'); ids=set()
        for r in f.get('reviews',[]):
            require(isinstance(r,dict),'复盘必须为对象')
            require(nonempty(r.get('id')) and r['id'] not in ids,'复盘 id 必须唯一且非空'); ids.add(r['id'])
            if not partial or 'phase' in r: require(r.get('phase') in phases,'复盘 phase 不在已配置阶段中')
            if not partial or 'title' in r: require(nonempty(r.get('title')),'title 不可为空')
            for field in ['conclusion','process','nextAction','rule']: require(text(r.get(field,'')),field+' 必须为文字')
            require(isinstance(r.get('players',[]),list) and all(nonempty(p) for p in r.get('players',[])),'players 必须为名字列表')
            require(isinstance(r.get('evidence',[]),list),'evidence 必须为列表')
            for e in r.get('evidence',[]):
                require(isinstance(e,dict),'证据必须为对象'); sec=e.get('seconds')
                require(sec is None or(type(sec) in (int,float) and 0<=sec<86400),'证据 seconds 无效')
                for field in ['actor','event','note','url']: require(text(e.get(field,'')),field+' 必须为文字')
    return n

def normalize(n):
    n=copy.deepcopy(n);n.setdefault('summary','')
    for f in n['fights']:
        for field in ['label','sourceUrl','reachedPhase']: f.setdefault(field,'')
        f.setdefault('durationSeconds',None);f.setdefault('reviews',[])
        for r in f['reviews']:
            for field in ['conclusion','process','nextAction','rule']:r.setdefault(field,'')
            r.setdefault('players',[]);r.setdefault('evidence',[])
            for e in r['evidence']:
                e.setdefault('seconds',None)
                for field in ['actor','event','note','url']: e.setdefault(field,'')
    return n

def config(root):
    c=read(root/'config.json')
    require(isinstance(c.get('phases'),list) and c['phases'] and all(nonempty(p) for p in c['phases']),'phases 无效')
    require(c.get('currentPhase') in c['phases'],'currentPhase 不在 phases 中')
    return c

def archives(root): return [read(p) for p in sorted((root/'archive').glob('*/*.json'))]
def build(root):
    c=config(root); ns=archives(root)
    for n in ns: validate(n,c['phases'])
    payload={**c,'nights':ns}
    output='window.M8_AUDIT = '+json.dumps(payload,ensure_ascii=False,allow_nan=False)+';\n'
    temporary=root/'data.js.tmp';temporary.write_text(output,encoding='utf-8');os.replace(temporary,root/'data.js')
    return {'nights':len({n['date'] for n in ns}),'revisions':len(ns)}

def merge(previous,incoming):
    result=copy.deepcopy(previous); result['summary']=incoming.get('summary',previous.get('summary',''))
    for f in incoming['fights']:
        old=next((p for p in result['fights'] if key(p)==key(f)),None)
        if old is None:result['fights'].append(copy.deepcopy(f));continue
        reviews={r['id']:copy.deepcopy(r) for r in old['reviews']}
        for r in f.get('reviews',[]):
            reviews.setdefault(r['id'],{}).update(copy.deepcopy(r))
        old.update(copy.deepcopy(f));old['reviews']=list(reviews.values())
    return result

def add(root,source):
    c=config(root);incoming=validate(read(source),c['phases'],partial=True);date=incoming['date']
    versions=sorted([n for n in archives(root) if n['date']==date],key=lambda n:n['revision'])
    result=merge(versions[-1],incoming) if versions else incoming
    result=validate(normalize(result),c['phases'])
    for field in ['revision','savedAt']:result.pop(field,None)
    if versions:
        prev={k:v for k,v in versions[-1].items() if k not in ['revision','savedAt']}
        if result==prev:return {'status':'unchanged',**build(root)}
    result['revision']=(versions[-1]['revision']+1) if versions else 1
    result['savedAt']=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).isoformat(timespec='seconds')
    target=root/'archive'/date;target.mkdir(parents=True,exist_ok=True)
    path=target/f"r{result['revision']:04d}.json"
    with path.open('x',encoding='utf-8') as stream:json.dump(result,stream,ensure_ascii=False,indent=2,allow_nan=False)
    return {'status':'saved','archive':str(path),**build(root)}

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--root',type=Path,default=ROOT)
    sub=parser.add_subparsers(dest='command',required=True)
    sub.add_parser('build');p=sub.add_parser('add');p.add_argument('json_file',type=Path)
    args=parser.parse_args()
    try:result=build(args.root) if args.command=='build' else add(args.root,args.json_file)
    except (ValueError,OSError,KeyError,TypeError) as error:parser.exit(1,f'ERROR: {error}\n')
    print(json.dumps(result,ensure_ascii=False))
if __name__=='__main__': main()
