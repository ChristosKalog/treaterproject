export const required = (Rule) => Rule.required().error('Το πεδίο είναι υποχρεωτικό.')
export const httpUrl = (Rule) => Rule.uri({scheme: ['http', 'https']}).error('Χρησιμοποιήστε πλήρες URL που αρχίζει με https:// ή http://.')
export const portableText = [{type: 'block', marks: {annotations: [{name: 'link', type: 'object', title: 'Σύνδεσμος', fields: [{name: 'href', type: 'url', title: 'URL', validation: httpUrl}]}]}}]
export const imageWithAlt = {type: 'image', options: {hotspot: true}, fields: [{name: 'alt', type: 'string', title: 'Εναλλακτικό κείμενο', description: 'Σύντομη περιγραφή για επισκέπτες που δεν βλέπουν την εικόνα.', validation: required}]}
