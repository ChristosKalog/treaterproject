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
