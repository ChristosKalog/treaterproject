import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useSiteData} from '../data/DataContext'

const links = [['/', 'Αρχική'], ['/parastaseis', 'Παραστάσεις'], ['/programma', 'Πρόγραμμα'], ['/arxeio', 'Αρχείο'], ['/nea', 'Νέα'], ['/theatro', 'Το θέατρο'], ['/epikoinonia', 'Επικοινωνία']]
export default function Layout({children}) {
  const [open, setOpen] = useState(false); const {data, isDemo} = useSiteData(); const name = data?.settings?.name || 'Θέατρο'
  return <>
    {isDemo && <div className="demo-banner" role="status">Προβολή demo — εμφανίζονται δοκιμαστικά δεδομένα, όχι περιεχόμενο από Sanity.</div>}
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>{name}</NavLink>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>Μενού</button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Κύρια πλοήγηση">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
      </div>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div><strong>{name}</strong><p>{data?.settings?.address}</p></div><div><a href={`mailto:${data?.settings?.email}`}>{data?.settings?.email}</a><br/><a href={`tel:${data?.settings?.phone}`}>{data?.settings?.phone}</a></div></footer>
  </>
}
