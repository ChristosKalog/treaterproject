import Seo from '../components/Seo'
import {ProductionCard, Empty} from '../components/Common'
import {useLocale} from '../i18n'

export default function Archive({data}){const {t}=useLocale();return <div className="page-shell page"><Seo title={`${t.archive} · ${data.settings?.name}`} description={t.archiveDescription}/><header className="page-header"><p className="eyebrow">{t.olderProductions}</p><h1>{t.archive}</h1></header>{data.seasons.map(season=>{const ids=new Set(data.engagements.filter(e=>e.seasonId===season._id).map(e=>e.productionId));const items=data.productions.filter(p=>ids.has(p._id));return <section className="archive-season section" key={season._id}><h2>{season.title}{season.isActive&&<span className="active-season">{t.activeSeason}</span>}</h2>{items.length?<div className="card-grid compact">{items.map(p=><ProductionCard key={p._id} production={p}/>)}</div>:<Empty>{t.noSeasonProductions}</Empty>}</section>})}</div>}
