import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useSiteData} from '../data/DataContext'
import {imageUrl} from '../data/sanity'
import {useLocale} from '../i18n'

export default function Layout({children,data:localizedData}) {
  const [open,setOpen]=useState(false);const {data,isDemo}=useSiteData();const {lang,t,path,alternate}=useLocale();const settings=localizedData?.settings||data?.settings||{};const name=settings.name||(lang==='en'?'Theatre':'Θέατρο');const logo=imageUrl(settings.logo,160)
  const links=[['home',t.home],['productions',t.productions],['schedule',t.schedule],['archive',t.archive],['news',t.news],['theatre',t.theatre],['contact',t.contact]]
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    {isDemo&&<div className="demo-banner" role="status">{t.demo}</div>}
    <header className="site-header">
      <div className="header-inner">
        <NavLink to={path('home')} className="brand" onClick={()=>setOpen(false)}>{logo&&<img className="brand-logo" src={logo} alt={settings.logo?.alt||''} width="56" height="56"/>}<span>{name}</span></NavLink>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{t.menu}</button>
        <nav id="main-nav" className={open?'nav open':'nav'} aria-label={t.nav}>{links.map(([key,label])=><NavLink key={key} to={path(key)} end={key==='home'} onClick={()=>setOpen(false)}>{label}</NavLink>)}<span className="language-switch" aria-label={t.language}><NavLink to={alternate('el')} lang="el" aria-label="Ελληνικά" className={lang==='el'?'active-language':''}>EL</NavLink><span>/</span><NavLink to={alternate('en')} lang="en" aria-label="English" className={lang==='en'?'active-language':''}>EN</NavLink></span></nav>
      </div>
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer"><div className="footer-brand">{logo&&<img className="footer-logo" src={logo} alt="" width="48" height="48"/>}<div><strong>{name}</strong><p>{settings.address}</p></div></div><div className="footer-contact"><a href={`mailto:${settings.email}`}>{settings.email}</a><br/><a href={`tel:${settings.phone}`}>{settings.phone}</a><p><a href="https://toofareast.com/" target="_blank" rel="noreferrer">{t.byTfe}</a></p></div></footer>
  </>
}
