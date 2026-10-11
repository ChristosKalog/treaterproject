import test from 'node:test'
import assert from 'node:assert/strict'
import {formatCompactDateTime, formatDateTime, localDayKey, monthKey} from '../src/lib/date.js'

test('η ζώνη Europe/Athens αλλάζει σωστά την ημερομηνία γύρω από τα μεσάνυχτα', () => {
  assert.equal(localDayKey('2026-06-30T21:30:00.000Z'), '2026-07-01')
  assert.equal(monthKey('2026-06-30T21:30:00.000Z'), '2026-07')
})

test('η αλλαγή θερινής ώρας εμφανίζει το σωστό τοπικό άλμα', () => {
  const before = formatDateTime('2026-03-29T00:30:00.000Z')
  const after = formatDateTime('2026-03-29T01:30:00.000Z')
  assert.match(before, /02:30/)
  assert.match(after, /04:30/)
})

test('η σύντομη ημερομηνία χρησιμοποιεί 24ωρη ώρα Αθηνών', () => {
  assert.equal(formatCompactDateTime('2026-10-23T18:00:00.000Z'), 'ΠΑΡ 23/10 21:00')
})
