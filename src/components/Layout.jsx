import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useSiteData} from '../data/DataContext'
import {imageUrl} from '../data/sanity'

const links = [['/', 'Αρχική'], ['/parastaseis', 'Παραστάσεις'], ['/programma', 'Πρόγραμμα'], ['/arxeio', 'Αρχείο'], ['/nea', 'Νέα'], ['/theatro', 'Το θέατρο'], ['/epikoinonia', 'Επικοινωνία']]
export default function Layout({children}) {
  const [open, setOpen] = useState(false); const {data, isDemo} = useSiteData(); const settings=data?.settings||{}; const name = settings.name || 'Θέατρο'; const logo=imageUrl(settings.logo,160)
  return <>
    {isDemo && <div className="demo-banner" role="status">Προβολή demo — εμφανίζονται δοκιμαστικά δεδομένα, όχι περιεχόμενο από Sanity.</div>}
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>{logo&&<img className="brand-logo" src={logo} alt={settings.logo?.alt||''} width="56" height="56"/>}<span>{name}</span></NavLink>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>Μενού</button>
        <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Κύρια πλοήγηση">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
      </div>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="footer-brand">{logo&&<img className="footer-logo" src={logo} alt="" width="48" height="48"/>}<div><strong>{name}</strong><p>{settings.address}</p></div></div><div><a href={`mailto:${settings.email}`}>{settings.email}</a><br/><a href={`tel:${settings.phone}`}>{settings.phone}</a></div></footer>
  </>
}
