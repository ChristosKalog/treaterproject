import {useState} from 'react'
import {Box, Button, Card, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'

const SYSTEM_FIELDS = new Set(['_id', '_rev', '_createdAt', '_updatedAt', '_type'])

export function DuplicateProductionAction(props) {
  const {draft, published, onComplete} = props
  const document = draft || published
  const client = useClient({apiVersion: '2026-10-09'})
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const copy = async () => {
    if (!document?._id) return
    setBusy(true)
    setMessage('')
    try {
      const fields = Object.fromEntries(
        Object.entries(document).filter(([key]) => !SYSTEM_FIELDS.has(key) && key !== 'slug'),
      )
      const id = `drafts.${crypto.randomUUID()}`
      await client.create({
        ...fields,
        _id: id,
        _type: 'production',
        title: `${document.title || 'Παράσταση'} (αντίγραφο)`,
      })
      setMessage('Το αντίγραφο δημιουργήθηκε ως πρόχειρο. Ελέγξτε τα πεδία, δημιουργήστε νέο slug και δημοσιεύστε το όταν είναι έτοιμο.')
    } catch {
      setMessage('Η αντιγραφή απέτυχε. Δοκιμάστε ξανά.')
    } finally {
      setBusy(false)
    }
  }

  return {
    label: 'Αντιγραφή ως νέα παράσταση',
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: 'dialog',
          header: 'Αντιγραφή παράστασης',
          onClose: () => {
            setOpen(false)
            onComplete()
          },
          content: (
            <Box padding={4}>
              <Stack space={4}>
                <Text>
                  Θα αντιγραφούν η περιγραφή, η αφίσα, οι φωτογραφίες, οι συντελεστές και τα βασικά στοιχεία.
                  Δεν θα αντιγραφούν ο slug, η σεζόν ή οι ημερομηνίες.
                </Text>
                {message && (
                  <Card padding={3} tone={message.startsWith('Το αντίγραφο') ? 'positive' : 'caution'}>
                    <Text>{message}</Text>
                  </Card>
                )}
                <Button
                  text={busy ? 'Δημιουργία…' : 'Δημιουργία αντιγράφου'}
                  tone="primary"
                  disabled={busy || Boolean(message)}
                  onClick={copy}
                />
              </Stack>
            </Box>
          ),
        }
      : null,
  }
}
