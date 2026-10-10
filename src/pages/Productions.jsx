import {useMemo, useState} from 'react'
import {ProductionCard, Empty} from '../components/Common'
import Seo from '../components/Seo'
import {isPast} from '../lib/date'
import {unique} from '../lib/content'
import {useLocale} from '../i18n'

export default function Productions({data}) {
  const {t,lang}=useLocale()
  const [search,setSearch]=useState(''), [category,setCategory]=useState(''), [season,setSeason]=useState(''), [stage,setStage]=useState('')
  const rows = useMemo(() => data.productions.map(production => {
    const events = data.events.filter(e => e.production._id === production._id)
    return {production, events, next: events.find(e => !isPast(e.startsAt) && e.status !== 'cancelled'), seasonIds: events.map(e=>e.season?._id), stageIds: events.map(e=>e.stage?._id)}
  }).filter(row=>row.production.title.toLocaleLowerCase(lang).includes(search.toLocaleLowerCase(lang))&&(!category||row.production.category===category)&&(!season||row.seasonIds.includes(season))&&(!stage||row.stageIds.includes(stage))),[data,search,category,season,stage,lang])
  const current = rows.filter(r=>r.next), past = rows.filter(r=>!r.next)
  return <div className="page-shell page"><Seo title={t.productions} description={t.productionsDescription}/><header className="page-header"><p className="eyebrow">{t.repertoire}</p><h1>{t.productions}</h1></header>
    <form className="filters" onSubmit={e=>e.preventDefault()}><label>{t.searchTitle}<input value={search} onChange={e=>setSearch(e.target.value)} type="search"/></label><label>{t.season}<select value={season} onChange={e=>setSeason(e.target.value)}><option value="">{t.all}</option>{data.seasons.map(s=><option key={s._id} value={s._id}>{s.title}</option>)}</select></label><label>{t.category}<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">{t.all}</option>{unique(data.productions.map(p=>p.category),lang).map(x=><option key={x}>{x}</option>)}</select></label><label>{t.stage}<select value={stage} onChange={e=>setStage(e.target.value)}><option value="">{t.all}</option>{data.stages.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select></label></form>
    <section className="section"><h2>{t.currentUpcoming}</h2>{current.length?<div className="card-grid">{current.map(r=><ProductionCard key={r.production._id} production={r.production} nextEvent={r.next}/>)}</div>:<Empty>{t.noUpcomingFilters}</Empty>}</section>
    <section className="section"><h2>{t.older}</h2>{past.length?<div className="card-grid compact">{past.map(r=><ProductionCard key={r.production._id} production={r.production}/>)}</div>:<Empty>{t.noOlder}</Empty>}</section>
  </div>
}
