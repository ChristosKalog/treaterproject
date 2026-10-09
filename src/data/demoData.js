const block = (text) => [{_type: 'block', _key: text.slice(0, 8), style: 'normal', markDefs: [], children: [{_type: 'span', _key: 's', text, marks: []}]}]

const day = 24 * 60 * 60 * 1000
const isoAt = (offset, hour = 20, minute = 30) => {
  const date = new Date(Date.now() + offset * day)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const demoData = {
  settings: {
    name: 'Θέατρο Άλφα',
    shortDescription: 'Σύγχρονο θέατρο στην καρδιά της πόλης, με παραστάσεις για όλες τις ηλικίες.',
    heroMessage: 'Ζωντανές ιστορίες, νέες φωνές και παραστάσεις που μας φέρνουν πιο κοντά.',
    about: block('Το Θέατρο Άλφα φιλοξενεί νέες παραγωγές, επαναλήψεις και δράσεις για το κοινό. Η παρούσα σελίδα λειτουργεί με δοκιμαστικά δεδομένα.'),
    phone: '+30 210 000 0000', email: 'info@example.gr', address: 'Οδός Θεάτρου 1, Θεσσαλονίκη',
    access: block('Πρόσβαση με μετρό και λεωφορείο. Προτείνεται άφιξη 30 λεπτά πριν από την έναρξη.'),
    accessibility: block('Ο χώρος διαθέτει πρόσβαση χωρίς σκαλοπάτια και θέσεις για αμαξίδια. Επικοινωνήστε πριν από την επίσκεψη για υποστήριξη.'),
    mapUrl: 'https://maps.google.com/', socials: [{label: 'Instagram', url: 'https://instagram.com/'}],
    seoTitle: 'Θέατρο Άλφα', seoDescription: 'Παραστάσεις, πρόγραμμα και νέα του Θεάτρου Άλφα.'
  },
  seasons: [
    {_id: 'season-current', title: '2026–2027', startDate: '2026-09-01', endDate: '2027-08-31', isActive: true},
    {_id: 'season-old', title: '2025–2026', startDate: '2025-09-01', endDate: '2026-08-31', isActive: false},
  ],
  stages: [{_id: 'main', name: 'Κεντρική Σκηνή'}, {_id: 'small', name: 'Μικρή Σκηνή'}],
  productions: [
    {_id: 'p1', title: 'Η τελευταία πρόβα', slug: 'i-teleftaia-prova', summary: 'Μια ομάδα ηθοποιών συναντιέται για την πρόβα που θα αλλάξει τα πάντα.', description: block('Μια σύγχρονη παράσταση για τη μνήμη, τη συνεργασία και όσα μένουν ανείπωτα.'), category: 'Δράμα', duration: 95, ageRating: '12+', priceInfo: 'Κανονικό 18€, μειωμένο 14€', credits: [{role: 'Σκηνοθεσία', names: 'Μαρία Νικολάου'}, {role: 'Ερμηνεία', names: 'Άννα Πέτρου, Γιάννης Δήμου'}], gallery: []},
    {_id: 'p2', title: 'Το νησί των ιστοριών', slug: 'to-nisi-ton-istorion', summary: 'Μια μουσική περιπέτεια για μικρούς και μεγάλους.', description: block('Δύο φίλοι ταξιδεύουν σε ένα νησί όπου κάθε κάτοικος φυλά μια διαφορετική ιστορία.'), category: 'Παιδικό', duration: 70, ageRating: '5+', priceInfo: 'Γενική είσοδος 12€', credits: [{role: 'Κείμενο', names: 'Ελένη Κωνσταντίνου'}], gallery: []},
    {_id: 'p3', title: 'Μικρές σιωπές', slug: 'mikres-siopes', summary: 'Ένα έργο δωματίου για δύο πρόσωπα.', description: block('Μια παλαιότερη παραγωγή του θεάτρου που παραμένει διαθέσιμη στο αρχείο.'), category: 'Δράμα', duration: 80, ageRating: '15+', priceInfo: 'Η παράσταση ολοκληρώθηκε.', credits: [{role: 'Σκηνοθεσία', names: 'Νίκος Αλεξίου'}], gallery: []},
  ],
  engagements: [
    {_id: 'e1', productionId: 'p1', seasonId: 'season-current', ticketUrl: 'https://example.com/tickets/prova'},
    {_id: 'e2', productionId: 'p2', seasonId: 'season-current', ticketUrl: ''},
    {_id: 'e3', productionId: 'p3', seasonId: 'season-old', ticketUrl: ''},
  ],
  events: [
    {_id: 'ev1', engagementId: 'e1', startsAt: isoAt(2), stageId: 'main', status: 'available'},
    {_id: 'ev2', engagementId: 'e1', startsAt: isoAt(5), stageId: 'main', status: 'soldOut'},
    {_id: 'ev3', engagementId: 'e1', startsAt: isoAt(8), stageId: 'main', status: 'cancelled'},
    {_id: 'ev4', engagementId: 'e2', startsAt: isoAt(3, 12), stageId: 'small', status: 'available'},
    {_id: 'ev5', engagementId: 'e2', startsAt: isoAt(10, 12), stageId: 'small', status: 'available'},
    {_id: 'ev-old', engagementId: 'e3', startsAt: isoAt(-100), stageId: 'small', status: 'available'},
  ],
  articles: [
    {_id: 'a1', title: 'Ανοιχτή συζήτηση μετά την παράσταση', slug: 'anoixti-syzitisi', summary: 'Συνάντηση με τους συντελεστές μετά την παράσταση.', publishedAt: isoAt(-2, 10), body: block('Το κοινό θα έχει την ευκαιρία να συζητήσει με τους συντελεστές για τη δημιουργική διαδικασία.')},
    {_id: 'a2', title: 'Το νέο πρόγραμμα ανακοινώθηκε', slug: 'neo-programma', summary: 'Δείτε τις παραγωγές της νέας σεζόν.', publishedAt: isoAt(-8, 10), body: block('Το πρόγραμμα της νέας σεζόν περιλαμβάνει σύγχρονο θέατρο και παραστάσεις για παιδιά.')},
  ],
}
