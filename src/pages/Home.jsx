import {Link} from 'react-router-dom'
import {ProductionCard, Empty} from '../components/Common'
import Seo from '../components/Seo'
import {formatDate, isPast, isThisWeek} from '../lib/date'

export default function Home({data}) {
  const future = data.events.filter(e => !isPast(e.startsAt) && e.status !== 'cancelled')
  const productions = [...new Map(future.map(e => [e.production._id, {production: e.production, event: e}])).values()].slice(0, 3)
  const week = data.events.filter(e => !isPast(e.startsAt) && isThisWeek(e.startsAt))
  const settings = data.settings || {}
  return <>
    <Seo title={settings.seoTitle || settings.name} description={settings.seoDescription || settings.shortDescription}/>
    <section className="hero page-shell"><p className="eyebrow">Πρόγραμμα θεάτρου</p><h1>{settings.name}</h1><p className="lead">{settings.shortDescription}</p><div className="actions"><Link className="button" to="/programma">Δείτε το πρόγραμμα</Link><Link className="text-link" to="/epikoinonia">Επικοινωνία</Link></div></section>
    <section className="page-shell section"><div className="section-heading"><h2>Προσεχείς παραστάσεις</h2><Link to="/parastaseis">Όλες οι παραστάσεις</Link></div>{productions.length ? <div className="card-grid">{productions.map(({production,event}) => <ProductionCard key={production._id} production={production} nextEvent={event}/>)}</div> : <Empty/>}</section>
    <section className="contrast-section"><div className="page-shell"><div className="section-heading"><h2>Αυτή την εβδομάδα</h2><Link to="/programma">Πλήρες πρόγραμμα</Link></div>{week.length ? <div className="week-list">{week.map(e => <Link key={e._id} to={`/parastaseis/${e.production.slug}`}><time>{formatDate(e.startsAt, {weekday:'short', hour:'2-digit', minute:'2-digit'})}</time><strong>{e.production.title}</strong><span>{e.stage?.name}</span></Link>)}</div> : <Empty>Δεν υπάρχουν άλλες παραστάσεις αυτή την εβδομάδα.</Empty>}</div></section>
    <section className="page-shell section"><div className="section-heading"><h2>Πρόσφατα νέα</h2><Link to="/nea">Όλα τα νέα</Link></div><div className="news-grid">{data.articles.slice(0,3).map(a => <article key={a._id}><p className="eyebrow">{formatDate(a.publishedAt)}</p><h3><Link to={`/nea/${a.slug}`}>{a.title}</Link></h3><p>{a.summary}</p></article>)}</div></section>
  </>
}
