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
    nameEn: 'Alpha Theatre',
    shortDescription: 'Σύγχρονο θέατρο στην καρδιά της πόλης, με παραστάσεις για όλες τις ηλικίες.',
    shortDescriptionEn: 'A contemporary theatre in the heart of the city, with performances for audiences of all ages.',
    heroMessage: 'Ζωντανές ιστορίες, νέες φωνές και παραστάσεις που μας φέρνουν πιο κοντά.',
    heroMessageEn: 'Living stories, new voices and performances that bring us closer together.',
    about: block('Το Θέατρο Άλφα φιλοξενεί νέες παραγωγές, επαναλήψεις και δράσεις για το κοινό. Η παρούσα σελίδα λειτουργεί με δοκιμαστικά δεδομένα.'),
    aboutEn: block('Alpha Theatre presents new productions, returning shows and activities for the public. This page uses sample content.'),
    phone: '+30 210 000 0000', email: 'info@example.gr', address: 'Οδός Θεάτρου 1, Θεσσαλονίκη',
    addressEn: '1 Theatrou Street, Thessaloniki',
    access: block('Πρόσβαση με μετρό και λεωφορείο. Προτείνεται άφιξη 30 λεπτά πριν από την έναρξη.'),
    accessEn: block('Accessible by metro and bus. We recommend arriving 30 minutes before the performance.'),
    accessibility: block('Ο χώρος διαθέτει πρόσβαση χωρίς σκαλοπάτια και θέσεις για αμαξίδια. Επικοινωνήστε πριν από την επίσκεψη για υποστήριξη.'),
    accessibilityEn: block('The venue offers step-free access and wheelchair spaces. Please contact us before your visit if you need assistance.'),
    mapUrl: 'https://maps.google.com/', socials: [{label: 'Instagram', url: 'https://instagram.com/'}],
    seoTitle: 'Θέατρο Άλφα', seoDescription: 'Παραστάσεις, πρόγραμμα και νέα του Θεάτρου Άλφα.'
    ,seoTitleEn: 'Alpha Theatre', seoDescriptionEn: 'Productions, programme and news from Alpha Theatre.'
  },
  seasons: [
    {_id: 'season-current', title: '2026–2027', startDate: '2026-09-01', endDate: '2027-08-31', isActive: true},
    {_id: 'season-old', title: '2025–2026', startDate: '2025-09-01', endDate: '2026-08-31', isActive: false},
  ],
  stages: [{_id:'main',name:'Κεντρική Σκηνή',nameEn:'Main Stage'},{_id:'small',name:'Μικρή Σκηνή',nameEn:'Studio Stage'}],
  productions: [
    {_id:'p1',title:'Η τελευταία πρόβα',titleEn:'The Final Rehearsal',englishReady:true,slug:'i-teleftaia-prova',summary:'Μια ομάδα ηθοποιών συναντιέται για την πρόβα που θα αλλάξει τα πάντα.',summaryEn:'A company of actors gathers for the rehearsal that will change everything.',description:block('Μια σύγχρονη παράσταση για τη μνήμη, τη συνεργασία και όσα μένουν ανείπωτα.'),descriptionEn:block('A contemporary performance about memory, collaboration and everything left unsaid.'),category:'Δράμα',categoryEn:'Drama',duration:95,ageRating:'12+',ageRatingEn:'Ages 12+',priceInfo:'Κανονικό 18€, μειωμένο 14€',priceInfoEn:'Standard €18, reduced €14',credits:[{role:'Σκηνοθεσία',names:'Μαρία Νικολάου'},{role:'Ερμηνεία',names:'Άννα Πέτρου, Γιάννης Δήμου'}],creditsEn:[{role:'Direction',names:'Maria Nikolaou'},{role:'Cast',names:'Anna Petrou, Yannis Dimou'}],gallery:[]},
    {_id:'p2',title:'Το νησί των ιστοριών',titleEn:'The Island of Stories',englishReady:true,slug:'to-nisi-ton-istorion',summary:'Μια μουσική περιπέτεια για μικρούς και μεγάλους.',summaryEn:'A musical adventure for audiences of all ages.',description:block('Δύο φίλοι ταξιδεύουν σε ένα νησί όπου κάθε κάτοικος φυλά μια διαφορετική ιστορία.'),descriptionEn:block('Two friends travel to an island where every resident keeps a different story.'),category:'Παιδικό',categoryEn:'Family',duration:70,ageRating:'5+',ageRatingEn:'Ages 5+',priceInfo:'Γενική είσοδος 12€',priceInfoEn:'General admission €12',credits:[{role:'Κείμενο',names:'Ελένη Κωνσταντίνου'}],creditsEn:[{role:'Written by',names:'Eleni Konstantinou'}],gallery:[]},
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
    {_id:'a1',title:'Ανοιχτή συζήτηση μετά την παράσταση',titleEn:'Post-show conversation',englishReady:true,slug:'anoixti-syzitisi',summary:'Συνάντηση με τους συντελεστές μετά την παράσταση.',summaryEn:'Meet the creative team after the performance.',publishedAt:isoAt(-2,10),body:block('Το κοινό θα έχει την ευκαιρία να συζητήσει με τους συντελεστές για τη δημιουργική διαδικασία.'),bodyEn:block('The audience will have the opportunity to discuss the creative process with the team.')},
    {_id: 'a2', title: 'Το νέο πρόγραμμα ανακοινώθηκε', slug: 'neo-programma', summary: 'Δείτε τις παραγωγές της νέας σεζόν.', publishedAt: isoAt(-8, 10), body: block('Το πρόγραμμα της νέας σεζόν περιλαμβάνει σύγχρονο θέατρο και παραστάσεις για παιδιά.')},
  ],
}
