import test from 'node:test'
import assert from 'node:assert/strict'
import {enrich, normalizeSlug} from '../src/lib/content.js'

test('αφαιρεί κάθετους από την αρχή και το τέλος ενός slug', () => {
  assert.equal(normalizeSlug('/newsezon20262027/'), 'newsezon20262027')
})

test('κανονικοποιεί τα slugs άρθρων πριν δημιουργηθούν οι δημόσιοι σύνδεσμοι', () => {
  const data = enrich({productions: [], seasons: [], stages: [], engagements: [], events: [], articles: [{_id: 'a1', slug: '/nea-dokimi'}]})
  assert.equal(data.articles[0].slug, 'nea-dokimi')
})

test('η αγγλική έκδοση εμφανίζει μόνο μεταφρασμένο και εγκεκριμένο περιεχόμενο',()=>{
  const data=enrich({settings:{name:'Θέατρο',nameEn:'Amalia Theatre'},productions:[{_id:'p1',slug:'one',title:'Ένα',titleEn:'One',englishReady:true},{_id:'p2',slug:'two',title:'Δύο',titleEn:'Two',englishReady:false}],seasons:[],stages:[],engagements:[],events:[],articles:[]},'en')
  assert.equal(data.settings.name,'Amalia Theatre')
  assert.deepEqual(data.productions.map(p=>p.title),['One'])
})
