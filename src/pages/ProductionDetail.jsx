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
  const image=imageUrl(production.coverImage||production.poster,1200,630);const jsonLd={'@context':'https://schema.org','@type':'TheaterEvent',name:production.title,description:production.summary,image:image?[image]:undefined,eventSchedule:events.map(e=>({'@type':'Schedule',startDate:e.startsAt,eventStatus:e.status==='cancelled'?'https://schema.org/EventCancelled':'https://schema.org/EventScheduled'})),inLanguage:lang}
  return <div className="page-shell page"><Seo title={`${production.title} · ${data.settings?.name}`} description={production.summary} image={image} jsonLd={jsonLd}/><div className="detail-hero"><CoverImage production={production}/><div><p className="eyebrow">{production.category}</p><h1>{production.title}</h1><p className="lead small">{production.summary}</p><dl className="facts"><div><dt>{t.duration}</dt><dd>{production.duration} {t.minutes}</dd></div><div><dt>{t.suitability}</dt><dd>{production.ageRating}</dd></div><div><dt>{t.prices}</dt><dd>{production.priceInfo}</dd></div></dl></div></div>
  <section className="content-grid section"><div><h2>{t.productionAbout}</h2><RichText value={production.description}/></div><aside><h2>{t.credits}</h2><dl className="credits">{(production.credits||[]).map(c=><div key={`${c.role}-${c.names}`}><dt>{c.role}</dt><dd>{c.names}</dd></div>)}</dl></aside></section>
  <section className="section"><h2>{t.datesTimes}</h2>{events.length?events.map(e=><EventRow key={e._id} event={e} onIcs={event=>downloadIcs(event,production,event.stage)}/>):<Empty>{t.noDates}</Empty>}</section>
  {(production.gallery?.length>0)&&<section className="section"><h2>{t.photos}</h2><div className="gallery">{production.gallery.map((img,i)=><img key={img._key||i} src={imageUrl(img,1000)} srcSet={[600,1000,1400].map(w=>`${imageUrl(img,w)} ${w}w`).join(', ')} sizes="(max-width: 800px) 100vw, 50vw" alt={img.alt||''} loading="lazy" decoding="async"/>)}</div></section>}
  {trailer&&<section className="section"><h2>{t.trailer}</h2><div className="video"><iframe src={trailer} title={`${t.trailer}: ${production.title}`} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy"/></div></section>}
  </div>
}
