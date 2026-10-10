import {useParams} from 'react-router-dom'
import Seo from '../components/Seo'
import {CoverImage, EventRow, RichText, Empty} from '../components/Common'
import {downloadIcs} from '../lib/date'
import {imageUrl} from '../data/sanity'
import {trailerEmbedUrl} from '../lib/content'
import NotFound from './NotFound'
import {useLocale} from '../i18n'

export default function ProductionDetail({data}) {
  const {slug}=useParams();const {t,lang}=useLocale();const production=data.productions.find(p=>p.slug===slug);if(!production)return <NotFound/>
  const events=data.events.filter(e=>e.production._id===production._id); const trailer=trailerEmbedUrl(production.trailerUrl)
  const credits=production.credits||[];const initialCredits=credits.slice(0,3);const remainingCredits=credits.slice(3)
  const image=imageUrl(production.desktopCoverImage||production.coverImage||production.poster,1200,630);const jsonLd={'@context':'https://schema.org','@type':'TheaterEvent',name:production.title,description:production.summary,image:image?[image]:undefined,eventSchedule:events.map(e=>({'@type':'Schedule',startDate:e.startsAt,eventStatus:e.status==='cancelled'?'https://schema.org/EventCancelled':'https://schema.org/EventScheduled'})),inLanguage:lang}
  const creditList=items=><dl className="credits credits-grid">{items.map(c=><div key={`${c.role}-${c.names}`}><dt>{c.role}</dt><dd>{c.names}</dd></div>)}</dl>
  return <div className="page-shell page production-detail-page"><Seo title={`${production.title} · ${data.settings?.name}`} description={production.summary} image={image} jsonLd={jsonLd}/><header className="production-hero"><CoverImage production={production}/><div className="production-title-block"><p className="eyebrow">{production.category}</p><h1>{production.title}</h1><p className="lead small">{production.summary}</p></div></header>
  <dl className="facts production-facts"><div><dt>{t.duration}</dt><dd>{production.duration} {t.minutes}</dd></div><div><dt>{t.suitability}</dt><dd>{production.ageRating}</dd></div><div><dt>{t.prices}</dt><dd>{production.priceInfo}</dd></div></dl>
  <section className="section production-about"><h2>{t.productionAbout}</h2><RichText value={production.description}/></section>
  {credits.length>0&&<section className="credits-section"><h2>{t.credits}</h2>{creditList(initialCredits)}{remainingCredits.length>0&&<details className="credits-more"><summary><span className="when-closed">{t.moreCredits}</span><span className="when-open">{t.fewerCredits}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>{creditList(remainingCredits)}</details>}</section>}
  <section className="section"><h2>{t.datesTimes}</h2>{events.length?events.map(e=><EventRow key={e._id} event={e} compactDate hideStage onIcs={event=>downloadIcs(event,production,event.stage)}/>):<Empty>{t.noDates}</Empty>}</section>
  {(production.gallery?.length>0)&&<section className="section"><h2>{t.photos}</h2><div className="gallery">{production.gallery.map((img,i)=><img key={img._key||i} src={imageUrl(img,1000)} srcSet={[600,1000,1400].map(w=>`${imageUrl(img,w)} ${w}w`).join(', ')} sizes="(max-width: 800px) 100vw, 50vw" alt={img.alt||''} loading="lazy" decoding="async"/>)}</div></section>}
  {trailer&&<section className="section"><h2>{t.trailer}</h2><div className="video"><iframe src={trailer} title={`${t.trailer}: ${production.title}`} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy"/></div></section>}
  </div>
}
