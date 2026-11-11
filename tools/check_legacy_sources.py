"""Read-only drift check. Does not download, merge, overwrite, or publish content."""
import json, urllib.request
from pathlib import Path
manifest=json.loads((Path(__file__).resolve().parents[1]/'migration-manifest.json').read_text(encoding='utf-8'))
for source in manifest['sources']:
    req=urllib.request.Request('https://api.github.com/repos/'+source['repository']+'/git/trees/main?recursive=1',headers={'User-Agent':'raid-audit-readonly-check'})
    with urllib.request.urlopen(req,timeout=30) as response: tree=json.load(response)
    if tree.get('truncated'): raise RuntimeError('Tree truncated; cannot safely compare')
    prefix=source['prefix']; current={f['path']:f['sha'] for f in tree['tree'] if f['type']=='blob' and f['path'].startswith(prefix)}
    baseline={f['source_path']:f['source_git_blob'] for f in manifest['files'] if f['path'].startswith(source['boss']+'/')}
    changed=sorted(p for p in set(current)|set(baseline) if current.get(p)!=baseline.get(p))
    print(source['boss'].upper()+': '+('no source drift' if not changed else 'legacy source changed; review manually, do not overwrite new site'))
    for path in changed: print('  '+path)
