import test from 'node:test'
import assert from 'node:assert/strict'
import {alternatePath,languageFromPath,routeFor} from '../src/i18n.js'

test('δημιουργεί σωστά ελληνικά και αγγλικά routes',()=>{
  assert.equal(routeFor('el','schedule'),'/el/programma')
  assert.equal(routeFor('en','productions','hamlet'),'/en/productions/hamlet')
})

test('ο διακόπτης γλώσσας διατηρεί το slug της τρέχουσας σελίδας',()=>{
  assert.equal(alternatePath('/el/nea/anakoinosi','en'),'/en/news/anakoinosi')
  assert.equal(alternatePath('/en/productions/hamlet','el'),'/el/parastaseis/hamlet')
  assert.equal(languageFromPath('/en/contact'),'en')
})
