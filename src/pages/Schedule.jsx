import {useMemo, useState} from 'react'
import {Link} from 'react-router-dom'
import Seo from '../components/Seo'
import {EventRow, Empty} from '../components/Common'
import {downloadIcs, localDayKey, monthKey, monthLabel} from '../lib/date'
import {unique} from '../lib/content'

export default function Schedule({data}) {
  const first = data.events.find(e=>new Date(e.startsAt)>=new Date())?.startsAt || new Date().toISOString()
  const [cursor,setCursor]=useState(()=>{const d=new Date(first); return new Date(d.getFullYear(),d.getMonth(),1)}), [view,setView]=useState('calendar'), [category,setCategory]=useState(''), [stage,setStage]=useState('')
  const key=monthKey(cursor.toISOString())
  const events=useMemo(()=>data.events.filter(e=>monthKey(e.startsAt)===key&&(!category||e.production.category===category)&&(!stage||e.stage?._id===stage)),[data,key,category,stage])
  const days=useMemo(()=>{const count=new Date(cursor.getFullYear(),cursor.getMonth()+1,0).getDate(); return Array.from({length:count},(_,i)=>new Date(cursor.getFullYear(),cursor.getMonth(),i+1))},[cursor])
  const move=n=>setCursor(new Date(cursor.getFullYear(),cursor.getMonth()+n,1))
  return <div className="page-shell page"><Seo title="Πρόγραμμα" description="Μηνιαίο πρόγραμμα παραστάσεων."/><header className="page-header schedule-head"><div><p className="eyebrow">Ημερολόγιο</p><h1>Πρόγραμμα</h1></div><div className="view-switch" aria-label="Τρόπος προβολής"><button className={view==='calendar'?'active':''} onClick={()=>setView('calendar')}>Μήνας</button><button className={view==='list'?'active':''} onClick={()=>setView('list')}>Λίστα</button></div></header>
  <div className="filters compact-filters"><label>Κατηγορία<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">Όλες</option>{unique(data.productions.map(p=>p.category)).map(x=><option key={x}>{x}</option>)}</select></label><label>Σκηνή<select value={stage} onChange={e=>setStage(e.target.value)}><option value="">Όλες</option>{data.stages.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select></label></div>
  <div className="month-nav"><button className="text-button" onClick={()=>move(-1)}>Προηγούμενος μήνας</button><h2>{monthLabel(cursor)}</h2><button className="text-button" onClick={()=>move(1)}>Επόμενος μήνας</button></div>
  {view==='calendar'?<><div className="calendar"><div className="weekdays">{['Δευ','Τρι','Τετ','Πεμ','Παρ','Σαβ','Κυρ'].map(x=><span key={x}>{x}</span>)}</div><div className="calendar-grid" style={{'--offset':(new Date(cursor.getFullYear(),cursor.getMonth(),1).getDay()+6)%7}}>{days.map((day,i)=>{const dayKey=localDayKey(day.toISOString()); const items=events.filter(e=>localDayKey(e.startsAt)===dayKey);return <div className="calendar-day" key={dayKey} style={i===0?{gridColumnStart:`calc(var(--offset) + 1)`}:undefined}><span>{day.getDate()}</span>{items.map(e=><Link key={e._id} to={`/parastaseis/${e.production.slug}`} className={e.status}><strong>{new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Athens',hour:'2-digit',minute:'2-digit'}).format(new Date(e.startsAt))}</strong> {e.production.title}{e.status==='cancelled'&&' — Ακυρώθηκε'}{e.status==='soldOut'&&' — Sold out'}</Link>)}</div>})}</div></div><div className="mobile-schedule-list">{events.length?events.map(e=><EventRow key={e._id} event={e} onIcs={event=>downloadIcs(event,event.production,event.stage)}/>):<Empty>Δεν υπάρχουν παραστάσεις αυτόν τον μήνα.</Empty>}</div></>:<div>{events.length?events.map(e=><EventRow key={e._id} event={e} onIcs={event=>downloadIcs(event,event.production,event.stage)}/>):<Empty>Δεν υπάρχουν παραστάσεις αυτόν τον μήνα.</Empty>}</div>}
  </div>
}
