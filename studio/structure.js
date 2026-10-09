export const structure = (S) => S.list().title('Διαχείριση περιεχομένου').items([
  S.documentTypeListItem('production').title('Παραστάσεις'),
  S.documentTypeListItem('seasonEngagement').title('Παραστάσεις ανά σεζόν'),
  S.documentTypeListItem('performanceDate').title('Ημερομηνίες / Πρόγραμμα'),
  S.divider(),
  S.documentTypeListItem('season').title('Σεζόν'),
  S.documentTypeListItem('stage').title('Σκηνές'),
  S.documentTypeListItem('article').title('Νέα'),
  S.divider(),
  S.listItem().title('Στοιχεία θεάτρου').id('theatreSettings').child(S.document().schemaType('theatreSettings').documentId('theatreSettings')),
])
