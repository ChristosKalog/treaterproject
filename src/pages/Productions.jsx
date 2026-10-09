import {useMemo, useState} from 'react'
import {ProductionCard, Empty} from '../components/Common'
import Seo from '../components/Seo'
import {isPast} from '../lib/date'
import {unique} from '../lib/content'

export default function Productions({data}) {
  const [search,setSearch]=useState(''), [category,setCategory]=useState(''), [season,setSeason]=useState(''), [stage,setStage]=useState('')
  const rows = useMemo(() => data.productions.map(production => {
    const events = data.events.filter(e => e.production._id === production._id)
    return {production, events, next: events.find(e => !isPast(e.startsAt) && e.status !== 'cancelled'), seasonIds: events.map(e=>e.season?._id), stageIds: events.map(e=>e.stage?._id)}
  }).filter(row => row.production.title.toLocaleLowerCase('el').includes(search.toLocaleLowerCase('el')) && (!category || row.production.category===category) && (!season || row.seasonIds.includes(season)) && (!stage || row.stageIds.includes(stage))), [data,search,category,season,stage])
  const current = rows.filter(r=>r.next), past = rows.filter(r=>!r.next)
  return <div className="page-shell page"><Seo title="Παραστάσεις" description="Τρέχουσες, προσεχείς και παλαιότερες παραστάσεις."/><header className="page-header"><p className="eyebrow">Ρεπερτόριο</p><h1>Παραστάσεις</h1></header>
    <form className="filters" onSubmit={e=>e.preventDefault()}><label>Αναζήτηση τίτλου<input value={search} onChange={e=>setSearch(e.target.value)} type="search"/></label><label>Σεζόν<select value={season} onChange={e=>setSeason(e.target.value)}><option value="">Όλες</option>{data.seasons.map(s=><option key={s._id} value={s._id}>{s.title}</option>)}</select></label><label>Κατηγορία<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">Όλες</option>{unique(data.productions.map(p=>p.category)).map(x=><option key={x}>{x}</option>)}</select></label><label>Σκηνή<select value={stage} onChange={e=>setStage(e.target.value)}><option value="">Όλες</option>{data.stages.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select></label></form>
    <section className="section"><h2>Τρέχουσες και προσεχείς</h2>{current.length ? <div className="card-grid">{current.map(r=><ProductionCard key={r.production._id} production={r.production} nextEvent={r.next}/>)}</div>:<Empty>Δεν βρέθηκαν προσεχείς παραστάσεις με αυτά τα φίλτρα.</Empty>}</section>
    <section className="section"><h2>Παλαιότερες</h2>{past.length ? <div className="card-grid compact">{past.map(r=><ProductionCard key={r.production._id} production={r.production}/>)}</div>:<Empty>Δεν βρέθηκαν παλαιότερες παραστάσεις.</Empty>}</section>
  </div>
}
