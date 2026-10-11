export const required = (Rule) => Rule.required().error('Το πεδίο είναι υποχρεωτικό.')
export const httpUrl = (Rule) => Rule.uri({scheme: ['http', 'https']}).error('Χρησιμοποιήστε πλήρες URL που αρχίζει με https:// ή http://.')
export const portableText = [{type: 'block', marks: {annotations: [{name: 'link', type: 'object', title: 'Σύνδεσμος', fields: [{name: 'href', type: 'url', title: 'URL', validation: httpUrl}]}]}}]
export const imageWithAlt = {type: 'image', options: {hotspot: true}, fields: [
  {name: 'alt', type: 'string', title: 'Εναλλακτικό κείμενο', description: 'Σύντομη περιγραφή για επισκέπτες που δεν βλέπουν την εικόνα.', validation: required},
  {name: 'altEn', type: 'string', title: 'Alternative text (English)', description: 'Απαιτείται όταν το έγγραφο δημοσιεύεται και στα αγγλικά.', validation: (Rule) => Rule.custom((value, context) => !context.document?.englishReady || Boolean(value) || 'Συμπληρώστε το αγγλικό εναλλακτικό κείμενο.')},
]}
