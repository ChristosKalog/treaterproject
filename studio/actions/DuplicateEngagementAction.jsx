import {useEffect, useState} from 'react'
import {Box, Button, Card, Flex, Select, Spinner, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'

export function DuplicateEngagementAction(props) {
  const {draft, published, onComplete} = props
  const document = draft || published
  const client = useClient({apiVersion: '2026-10-09'})
  const [open, setOpen] = useState(false)
  const [seasons, setSeasons] = useState([])
  const [seasonId, setSeasonId] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!open) return
    client.fetch('*[_type=="season"]|order(startDate desc){_id,title}').then(setSeasons).catch(() => setMessage('Δεν ήταν δυνατή η φόρτωση των σεζόν.'))
  }, [open, client])
  const copy = async () => {
    if (!seasonId || !document?.production?._ref) return
    setBusy(true); setMessage('')
    try {
      const existing = await client.fetch('count(*[_type=="seasonEngagement" && production._ref==$production && season._ref==$season])', {production: document.production._ref, season: seasonId})
      if (existing) { setMessage('Η παράσταση υπάρχει ήδη σε αυτή τη σεζόν.'); return }
      await client.create({_type:'seasonEngagement',production:{_type:'reference',_ref:document.production._ref},season:{_type:'reference',_ref:seasonId},...(document.ticketUrl?{ticketUrl:document.ticketUrl}:{})})
      setMessage('Η νέα ένταξη δημιουργήθηκε χωρίς ημερομηνίες. Θα τη βρείτε στη λίστα «Παραστάσεις ανά σεζόν».')
    } catch { setMessage('Η αντιγραφή απέτυχε. Δοκιμάστε ξανά.') }
    finally { setBusy(false) }
  }
  return {
    label: 'Αντιγραφή σε νέα σεζόν',
    onHandle: () => setOpen(true),
    dialog: open ? {type:'dialog',header:'Αντιγραφή παράστασης σε σεζόν',onClose:()=>{setOpen(false);onComplete()},content:<Box padding={4}><Stack space={4}><Text>Επιλέξτε τη νέα σεζόν. Θα αντιγραφεί μόνο η σύνδεση με την παράσταση και το προεπιλεγμένο URL προπώλησης — όχι ημερομηνίες ή καταστάσεις sold out.</Text>{seasons.length?<Select value={seasonId} onChange={e=>setSeasonId(e.currentTarget.value)}><option value="">Επιλέξτε σεζόν</option>{seasons.map(s=><option key={s._id} value={s._id}>{s.title}</option>)}</Select>:<Flex align="center" gap={2}><Spinner/><Text>Φόρτωση σεζόν…</Text></Flex>}{message&&<Card padding={3} tone={message.startsWith('Η νέα')?'positive':'caution'}><Text>{message}</Text></Card>}<Button text={busy?'Δημιουργία…':'Δημιουργία νέας ένταξης'} tone="primary" disabled={busy||!seasonId} onClick={copy}/></Stack></Box>} : null,
  }
}
