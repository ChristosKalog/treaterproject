import {useMemo, useState} from 'react'
import {Link} from 'react-router-dom'
import Seo from '../components/Seo'
import {EventRow, Empty} from '../components/Common'
import {downloadIcs, localDayKey, monthKey, monthLabel} from '../lib/date'
import {unique} from '../lib/content'
import {useLocale} from '../i18n'

export default function Schedule({data}) {
  const {t,path,locale,lang}=useLocale()
  const first = data.events.find(e=>new Date(e.startsAt)>=new Date())?.startsAt || new Date().toISOString()
  const [cursor,setCursor]=useState(()=>{const d=new Date(first); return new Date(d.getFullYear(),d.getMonth(),1)}), [view,setView]=useState('calendar'), [category,setCategory]=useState(''), [stage,setStage]=useState('')
  const key=monthKey(cursor.toISOString())
  const events=useMemo(()=>data.events.filter(e=>monthKey(e.startsAt)===key&&(!category||e.production.category===category)&&(!stage||e.stage?._id===stage)),[data,key,category,stage])
  const days=useMemo(()=>{const count=new Date(cursor.getFullYear(),cursor.getMonth()+1,0).getDate(); return Array.from({length:count},(_,i)=>new Date(cursor.getFullYear(),cursor.getMonth(),i+1))},[cursor])
  const move=n=>setCursor(new Date(cursor.getFullYear(),cursor.getMonth()+n,1))
  return <div className="page-shell page"><Seo title={`${t.schedule} · ${data.settings?.name}`} description={lang==='en'?'Monthly performance programme.':'Μηνιαίο πρόγραμμα παραστάσεων.'}/><header className="page-header schedule-head"><div><p className="eyebrow">{t.calendar}</p><h1>{t.schedule}</h1></div><div className="view-switch" aria-label={t.calendar}><button className={view==='calendar'?'active':''} onClick={()=>setView('calendar')}>{t.month}</button><button className={view==='list'?'active':''} onClick={()=>setView('list')}>{t.list}</button></div></header>
  <div className="filters compact-filters"><label>{t.category}<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">{t.all}</option>{unique(data.productions.map(p=>p.category),lang).map(x=><option key={x}>{x}</option>)}</select></label><label>{t.stage}<select value={stage} onChange={e=>setStage(e.target.value)}><option value="">{t.all}</option>{data.stages.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select></label></div>
  <div className="month-nav"><button className="text-button" onClick={()=>move(-1)}>{t.previousMonth}</button><h2>{monthLabel(cursor,locale)}</h2><button className="text-button" onClick={()=>move(1)}>{t.nextMonth}</button></div>
  {view==='calendar'?<><div className="calendar"><div className="weekdays">{t.weekdays.map(x=><span key={x}>{x}</span>)}</div><div className="calendar-grid" style={{'--offset':(new Date(cursor.getFullYear(),cursor.getMonth(),1).getDay()+6)%7}}>{days.map((day,i)=>{const dayKey=localDayKey(day.toISOString());const items=events.filter(e=>localDayKey(e.startsAt)===dayKey);return <div className="calendar-day" key={dayKey} style={i===0?{gridColumnStart:`calc(var(--offset) + 1)`}:undefined}><span>{day.getDate()}</span>{items.map(e=><Link key={e._id} to={path('productions',e.production.slug)} className={e.status}><strong>{new Intl.DateTimeFormat(locale,{timeZone:'Europe/Athens',hour:'2-digit',minute:'2-digit'}).format(new Date(e.startsAt))}</strong> {e.production.title}{e.status==='cancelled'&&` — ${t.cancelled}`}{e.status==='soldOut'&&` — ${t.soldOut}`}</Link>)}</div>})}</div></div><div className="mobile-schedule-list">{events.length?events.map(e=><EventRow key={e._id} event={e} onIcs={event=>downloadIcs(event,event.production,event.stage)}/>):<Empty>{t.noMonth}</Empty>}</div></>:<div>{events.length?events.map(e=><EventRow key={e._id} event={e} onIcs={event=>downloadIcs(event,event.production,event.stage)}/>):<Empty>{t.noMonth}</Empty>}</div>}
  </div>
}
