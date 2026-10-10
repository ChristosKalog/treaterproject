import {useLocation} from 'react-router-dom'

export const routes = {
  home: {el: '/el', en: '/en'}, productions: {el: '/el/parastaseis', en: '/en/productions'},
  schedule: {el: '/el/programma', en: '/en/programme'}, archive: {el: '/el/arxeio', en: '/en/archive'},
  news: {el: '/el/nea', en: '/en/news'}, theatre: {el: '/el/theatro', en: '/en/theatre'},
  contact: {el: '/el/epikoinonia', en: '/en/contact'},
}

const copy = {
  el: {
    skip:'Μετάβαση στο κύριο περιεχόμενο',menu:'Μενού',nav:'Κύρια πλοήγηση',home:'Αρχική',productions:'Παραστάσεις',schedule:'Πρόγραμμα',archive:'Αρχείο',news:'Νέα',theatre:'Το θέατρο',contact:'Επικοινωνία',
    demo:'Προβολή demo — εμφανίζονται δοκιμαστικά δεδομένα, όχι περιεχόμενο από Sanity.',loading:'Φόρτωση περιεχομένου…',errorTitle:'Κάτι πήγε στραβά',retry:'Νέα προσπάθεια',noContent:'Δεν βρέθηκε περιεχόμενο.',loadError:'Δεν ήταν δυνατή η φόρτωση του περιεχομένου. Δοκιμάστε ξανά.',
    theatreProgramme:'Πρόγραμμα θεάτρου',seeSchedule:'Δείτε το πρόγραμμα',upcoming:'Προσεχείς παραστάσεις',allProductions:'Όλες οι παραστάσεις',thisWeek:'Αυτή την εβδομάδα',fullSchedule:'Πλήρες πρόγραμμα',noWeek:'Δεν υπάρχουν άλλες παραστάσεις αυτή την εβδομάδα.',recentNews:'Πρόσφατα νέα',allNews:'Όλα τα νέα',
    repertoire:'Ρεπερτόριο',productionsDescription:'Τρέχουσες, προσεχείς και παλαιότερες παραστάσεις.',searchTitle:'Αναζήτηση τίτλου',season:'Σεζόν',category:'Κατηγορία',stage:'Σκηνή',all:'Όλες',currentUpcoming:'Τρέχουσες και προσεχείς',older:'Παλαιότερες',noUpcomingFilters:'Δεν βρέθηκαν προσεχείς παραστάσεις με αυτά τα φίλτρα.',noOlder:'Δεν βρέθηκαν παλαιότερες παραστάσεις.',
    duration:'Διάρκεια',minutes:'λεπτά',suitability:'Καταλληλότητα',prices:'Τιμές',productionAbout:'Η παράσταση',credits:'Συντελεστές',moreCredits:'Περισσότεροι συντελεστές',fewerCredits:'Λιγότεροι συντελεστές',datesTimes:'Πότε:',noDates:'Δεν υπάρχουν καταχωρισμένες ημερομηνίες.',photos:'Φωτογραφίες',trailer:'Trailer',
    calendar:'Ημερολόγιο',month:'Μήνας',list:'Λίστα',previousMonth:'Προηγούμενος μήνας',nextMonth:'Επόμενος μήνας',noMonth:'Δεν υπάρχουν παραστάσεις αυτόν τον μήνα.',weekdays:['Δευ','Τρι','Τετ','Πεμ','Παρ','Σαβ','Κυρ'],
    olderProductions:'Παλαιότερες παραγωγές',activeSeason:'Ενεργή σεζόν',noSeasonProductions:'Δεν υπάρχουν παραστάσεις σε αυτή τη σεζόν.',archiveDescription:'Παραστάσεις οργανωμένες ανά θεατρική σεζόν.',announcements:'Ανακοινώσεις',newsDescription:'Τα νέα και οι ανακοινώσεις του θεάτρου.',
    findUs:'Βρείτε μας',address:'Διεύθυνση',phone:'Τηλέφωνο',map:'Προβολή στον χάρτη',social:'Κοινωνικά δίκτυα',aboutUs:'Σχετικά με εμάς',access:'Πρόσβαση',accessibility:'Προσβασιμότητα',
    next:'Επόμενη',completed:'Ολοκληρώθηκε',soldOut:'Sold out',cancelled:'Ακυρώθηκε',available:'Διαθέσιμη',addCalendar:'Προσθήκη στο ημερολόγιο',buyTickets:'Αγορά εισιτηρίων',ticketInfo:'Πληροφορίες εισιτηρίων',
    notFoundTitle:'Η σελίδα δεν βρέθηκε',notFoundText:'Ο σύνδεσμος μπορεί να έχει αλλάξει ή η σελίδα να μην υπάρχει.',backHome:'Επιστροφή στην αρχική',imageMissing:'Δεν υπάρχει εικόνα για:',coverMissing:'Δεν υπάρχει κεντρική εικόνα για:',imageLabel:'Εικόνα:',coverLabel:'Κεντρική εικόνα:',language:'Γλώσσα',byTfe:'Ένα project της Too Far East',
  },
  en: {
    skip:'Skip to main content',menu:'Menu',nav:'Main navigation',home:'Home',productions:'Productions',schedule:'Programme',archive:'Archive',news:'News',theatre:'The theatre',contact:'Contact',
    demo:'Demo view — sample data is shown, not content from Sanity.',loading:'Loading content…',errorTitle:'Something went wrong',retry:'Try again',noContent:'No content was found.',loadError:'The content could not be loaded. Please try again.',
    theatreProgramme:'Theatre programme',seeSchedule:'View the programme',upcoming:'Upcoming productions',allProductions:'All productions',thisWeek:'This week',fullSchedule:'Full programme',noWeek:'There are no more performances this week.',recentNews:'Latest news',allNews:'All news',
    repertoire:'Repertoire',productionsDescription:'Current, upcoming and past productions.',searchTitle:'Search by title',season:'Season',category:'Category',stage:'Stage',all:'All',currentUpcoming:'Current and upcoming',older:'Past productions',noUpcomingFilters:'No upcoming productions match these filters.',noOlder:'No past productions were found.',
    duration:'Duration',minutes:'minutes',suitability:'Age guidance',prices:'Prices',productionAbout:'About the production',credits:'Creative team',moreCredits:'More credits',fewerCredits:'Fewer credits',datesTimes:'When:',noDates:'No performance dates have been added.',photos:'Photos',trailer:'Trailer',
    calendar:'Calendar',month:'Month',list:'List',previousMonth:'Previous month',nextMonth:'Next month',noMonth:'There are no performances this month.',weekdays:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    olderProductions:'Past productions',activeSeason:'Active season',noSeasonProductions:'There are no productions in this season.',archiveDescription:'Productions organised by theatre season.',announcements:'Announcements',newsDescription:'News and announcements from the theatre.',
    findUs:'Find us',address:'Address',phone:'Phone',map:'View on map',social:'Social media',aboutUs:'About us',access:'Getting here',accessibility:'Accessibility',
    next:'Next',completed:'Completed',soldOut:'Sold out',cancelled:'Cancelled',available:'Available',addCalendar:'Add to calendar',buyTickets:'Buy tickets',ticketInfo:'Ticket information',
    notFoundTitle:'Page not found',notFoundText:'The link may have changed or the page may no longer exist.',backHome:'Back to home',imageMissing:'No image is available for:',coverMissing:'No cover image is available for:',imageLabel:'Image:',coverLabel:'Cover image:',language:'Language',byTfe:'A Too Far East project',
  },
}

export const languageFromPath = (pathname='') => pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'el'
export const routeFor = (lang,key,slug) => `${routes[key]?.[lang] || routes.home[lang]}${slug ? `/${slug}` : ''}`
export function alternatePath(pathname,targetLanguage){const sourceLanguage=languageFromPath(pathname);for(const [key,values] of Object.entries(routes)){const source=values[sourceLanguage];if(pathname===source)return values[targetLanguage];if((key==='productions'||key==='news')&&pathname.startsWith(`${source}/`))return `${values[targetLanguage]}/${pathname.slice(source.length+1)}`}return routes.home[targetLanguage]}
export function useLocale(){const {pathname}=useLocation();const lang=languageFromPath(pathname);return {lang,locale:lang==='en'?'en-GB':'el-GR',t:copy[lang],path:(key,slug)=>routeFor(lang,key,slug),alternate:(target)=>alternatePath(pathname,target)}}
