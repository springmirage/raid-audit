import copy, json, tempfile, unittest
from pathlib import Path
import archive
ROOT=Path(__file__).resolve().parents[1]
def sample(date='2026-11-08',phase='P1',report='TEST-ONLY',fight=1):
    return {'date':date,'summary':'','fights':[{'reportCode':report,'fightId':fight,'durationSeconds':185.9,'reachedPhase':phase,'reviews':[{'id':'r1','phase':phase,'title':'测试记录 <script>window.injected=true</script>','players':['测试玩家'],'conclusion':'仅用于自动测试','process':'测试经过','nextAction':'测试调整','rule':'测试口径','evidence':[{'seconds':65.9,'actor':'测试玩家','event':'测试事件','note':'这是测试证据，不是真实日志','url':'javascript:alert(1)'}]}]}]}
class ArchiveTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory(prefix='m8-audit-test-');self.root=Path(self.tmp.name);(self.root/'archive').mkdir();(self.root/'config.json').write_bytes((ROOT/'config.json').read_bytes());self.file=self.root/'input.json'
    def tearDown(self):self.tmp.cleanup()
    def add(self,n):self.file.write_text(json.dumps(n,ensure_ascii=False),encoding='utf-8');return archive.add(self.root,self.file)
    def test_empty_build(self):
        self.assertEqual(archive.build(self.root),{'nights':0,'revisions':0})
    def test_duplicate_does_not_create_version(self):
        self.add(sample());self.assertEqual(self.add(sample())['status'],'unchanged');self.assertEqual(len(archive.archives(self.root)),1)
    def test_update_preserves_old_revision(self):
        self.add(sample());old=(self.root/'archive/2026-11-08/r0001.json').read_bytes();n=sample();n['fights'][0]['reviews'][0]['conclusion']='修正';self.add(n);self.assertEqual((self.root/'archive/2026-11-08/r0001.json').read_bytes(),old);self.assertEqual(len(archive.archives(self.root)),2)
    def test_new_phase_retains_old_review_and_fights(self):
        self.add(sample());n=sample(phase='P3');n['fights'][0]['reviews'][0]['id']='r3';self.add(n);self.add(sample(fight=2));last=archive.archives(self.root)[-1];self.assertEqual(len(last['fights']),2);self.assertEqual(len(last['fights'][0]['reviews']),2)
    def test_multiple_nights_and_reports_do_not_collide(self):
        self.add(sample());self.add(sample(report='OTHER'));self.add(sample(date='2026-11-09'));ns=archive.archives(self.root);self.assertEqual(len(ns[-2]['fights']),2);self.assertEqual(archive.build(self.root)['nights'],2)
    def test_rebuild_preserves_bytes(self):
        self.add(sample());before=(self.root/'data.js').read_bytes();archive.build(self.root);self.assertEqual(before,(self.root/'data.js').read_bytes())
    def test_invalid_inputs_no_archive(self):
        for field,val in [('date','2026-02-30'),('date','../outside'),('fights',None)]:
            n=sample();n[field]=val
            with self.assertRaises((ValueError,TypeError)):self.add(n)
        self.assertEqual(archive.archives(self.root),[])
    def test_bad_phase_and_duplicate_fight_rejected(self):
        n=sample(phase='UNKNOWN')
        with self.assertRaises(ValueError):self.add(n)
        n=sample();n['fights']*=2
        with self.assertRaises(ValueError):self.add(n)
    def test_phase_progression_does_not_change_archive(self):
        self.add(sample());before=(self.root/'archive/2026-11-08/r0001.json').read_bytes();c=archive.config(self.root);c['currentPhase']='P3';(self.root/'config.json').write_text(json.dumps(c),encoding='utf-8');archive.build(self.root);self.assertEqual(before,(self.root/'archive/2026-11-08/r0001.json').read_bytes())
    def test_partial_append_preserves_metadata(self):
        n=sample();n['summary']='night note';f=n['fights'][0];f.update(label='label',sourceUrl='https://example.com/log',reachedPhase='P1',durationSeconds=120)
        self.add(n);old=(self.root/'archive/2026-11-08/r0001.json').read_bytes()
        self.add({'date':n['date'],'fights':[{'reportCode':f['reportCode'],'fightId':f['fightId'],'reviews':[{'id':'new','phase':'P3','title':'new review'}]}]})
        last=archive.archives(self.root)[-1];self.assertEqual(last['summary'],'night note')
        for field in ['label','sourceUrl','reachedPhase','durationSeconds']:self.assertEqual(last['fights'][0][field],f[field])
        self.assertEqual(len(last['fights'][0]['reviews']),2);self.assertEqual((self.root/'archive/2026-11-08/r0001.json').read_bytes(),old)
    def test_partial_review_preserves_omitted_fields(self):
        n=sample();self.add(n);before=archive.archives(self.root)[-1]['fights'][0]['reviews'][0]
        self.add({'date':n['date'],'fights':[{'reportCode':'TEST-ONLY','fightId':1,'reviews':[{'id':'r1','conclusion':'corrected'}]}]})
        after=archive.archives(self.root)[-1]['fights'][0]['reviews'][0]
        self.assertEqual(after,{**before,'conclusion':'corrected'})
    def test_explicit_clears_and_metadata_only_patch(self):
        n=sample();n['summary']='note';self.add(n)
        self.add({'date':n['date'],'summary':'','fights':[{'reportCode':'TEST-ONLY','fightId':1,'durationSeconds':None,'reachedPhase':''}]})
        last=archive.archives(self.root)[-1];self.assertEqual(last['summary'],'');self.assertIsNone(last['fights'][0]['durationSeconds']);self.assertEqual(last['fights'][0]['reachedPhase'],'');self.assertEqual(len(last['fights'][0]['reviews']),1)
        self.add({'date':n['date'],'fights':[{'reportCode':'TEST-ONLY','fightId':1,'reviews':[{'id':'r1','players':[],'evidence':[],'process':''}]}]})
        review=archive.archives(self.root)[-1]['fights'][0]['reviews'][0];self.assertEqual(review['players'],[]);self.assertEqual(review['evidence'],[]);self.assertEqual(review['process'],'');self.assertEqual(review['title'],n['fights'][0]['reviews'][0]['title'])
    def test_incomplete_new_review_rejected_before_write(self):
        self.add(sample());before=len(archive.archives(self.root))
        with self.assertRaises(ValueError):self.add({'date':'2026-11-08','fights':[{'reportCode':'TEST-ONLY','fightId':1,'reviews':[{'id':'new','conclusion':'missing phase and title'}]}]})
        self.assertEqual(len(archive.archives(self.root)),before)
if __name__=='__main__':unittest.main(verbosity=2)
