import {Link} from 'react-router-dom'
import Seo from '../components/Seo'
export default function NotFound(){return <div className="state page"><Seo title="Η σελίδα δεν βρέθηκε" description="Η σελίδα που ζητήσατε δεν υπάρχει."/><p className="eyebrow">404</p><h1>Η σελίδα δεν βρέθηκε</h1><p>Ο σύνδεσμος μπορεί να έχει αλλάξει ή η σελίδα να μην υπάρχει.</p><Link className="button" to="/">Επιστροφή στην αρχική</Link></div>}
