import {Link} from 'react-router-dom'
import {ProductionCard, Empty, ImageHero} from '../components/Common'
import Seo from '../components/Seo'
import {formatDate, isPast, isThisWeek} from '../lib/date'
import {useLocale} from '../i18n'
import {imageUrl} from '../data/sanity'

export default function Home({data}) {
  const {t,path,locale,lang}=useLocale()
  const future = data.events.filter(e => !isPast(e.startsAt) && e.status !== 'cancelled')
  const productions = [...new Map(future.map(e => [e.production._id, {production: e.production, event: e}])).values()].slice(0, 3)
  const week = data.events.filter(e => !isPast(e.startsAt) && isThisWeek(e.startsAt))
  const settings = data.settings || {}
  return <>
    <Seo title={settings.seoTitle||settings.name} description={settings.seoDescription||settings.shortDescription} image={imageUrl(settings.heroImage,1200,630)} jsonLd={{'@context':'https://schema.org','@type':'PerformingArtsTheater',name:settings.name,description:settings.shortDescription,address:settings.address,telephone:settings.phone,email:settings.email,inLanguage:lang}}/>
    <ImageHero image={settings.heroImage} className="home-hero"><p className="eyebrow">{t.theatreProgramme}</p><h1>{settings.name}</h1><p className="lead">{settings.heroMessage||settings.shortDescription}</p><div className="actions"><Link className="button" to={path('schedule')}>{t.seeSchedule}</Link><Link className="text-link" to={path('contact')}>{t.contact}</Link></div></ImageHero>
    <section className="page-shell section"><div className="section-heading"><h2>{t.upcoming}</h2><Link to={path('productions')}>{t.allProductions}</Link></div>{productions.length?<div className="card-grid">{productions.map(({production,event})=><ProductionCard key={production._id} production={production} nextEvent={event}/>)}</div>:<Empty/>}</section>
    <section className="contrast-section"><div className="page-shell"><div className="section-heading"><h2>{t.thisWeek}</h2><Link to={path('schedule')}>{t.fullSchedule}</Link></div>{week.length?<div className="week-list">{week.map(e=><Link key={e._id} to={path('productions',e.production.slug)}><time>{formatDate(e.startsAt,{weekday:'short',hour:'2-digit',minute:'2-digit'},locale)}</time><strong>{e.production.title}</strong><span>{e.stage?.name}</span></Link>)}</div>:<Empty>{t.noWeek}</Empty>}</div></section>
    <section className="page-shell section"><div className="section-heading"><h2>{t.recentNews}</h2><Link to={path('news')}>{t.allNews}</Link></div>{data.articles.length?<div className="news-grid">{data.articles.slice(0,3).map(a=><article key={a._id}><p className="eyebrow">{formatDate(a.publishedAt,{},locale)}</p><h3><Link to={path('news',a.slug)}>{a.title}</Link></h3><p>{a.summary}</p></article>)}</div>:<Empty/>}</section>
  </>
}
