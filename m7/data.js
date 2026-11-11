const AUDIT_DATES={'2026-11-10':{label:'11月10日 · P3',data:AUDIT_20261110,wipeCalledFightIds:[]},'2026-11-09':{label:'11月9日 · P3',data:AUDIT_20261109,wipeCalledFightIds:[]},'2026-11-05':{label:'11月5日',data:AUDIT_20261105,wipeCalledFightIds:[]},'2026-11-03':{label:'11月3日',data:AUDIT_20261103,wipeCalledFightIds:[]},'2026-11-02':{label:'11月2日',data:AUDIT_20261102,wipeCalledFightIds:[]},'2026-10-27':{label:'10月27日',data:AUDIT_20261027,wipeCalledFightIds:[14]},'2026-10-29':{label:'10月29日',data:AUDIT_20261029,wipeCalledFightIds:[]}};
const requestedDate=new URL(location.href).searchParams.get('date');
const AUDIT_DATE=Object.hasOwn(AUDIT_DATES,requestedDate)?requestedDate:'2026-11-10';
const DATA={...AUDIT_DATES[AUDIT_DATE].data,aliases:{},wipeCalledFightIds:AUDIT_DATES[AUDIT_DATE].wipeCalledFightIds};

