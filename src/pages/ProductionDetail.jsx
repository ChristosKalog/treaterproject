import {useParams} from 'react-router-dom'
import Seo from '../components/Seo'
import {EventRow, Poster, RichText, Empty} from '../components/Common'
import {downloadIcs} from '../lib/date'
import {imageUrl} from '../data/sanity'
import {trailerEmbedUrl} from '../lib/content'
import NotFound from './NotFound'

export default function ProductionDetail({data}) {
  const {slug}=useParams(); const production=data.productions.find(p=>p.slug===slug); if(!production) return <NotFound/>
  const events=data.events.filter(e=>e.production._id===production._id); const trailer=trailerEmbedUrl(production.trailerUrl)
  return <div className="page-shell page"><Seo title={`${production.title} · ${data.settings?.name}`} description={production.summary}/><div className="detail-hero"><Poster production={production}/><div><p className="eyebrow">{production.category}</p><h1>{production.title}</h1><p className="lead small">{production.summary}</p><dl className="facts"><div><dt>Διάρκεια</dt><dd>{production.duration} λεπτά</dd></div><div><dt>Καταλληλότητα</dt><dd>{production.ageRating}</dd></div><div><dt>Τιμές</dt><dd>{production.priceInfo}</dd></div></dl></div></div>
  <section className="content-grid section"><div><h2>Η παράσταση</h2><RichText value={production.description}/></div><aside><h2>Συντελεστές</h2><dl className="credits">{(production.credits||[]).map(c=><div key={`${c.role}-${c.names}`}><dt>{c.role}</dt><dd>{c.names}</dd></div>)}</dl></aside></section>
  <section className="section"><h2>Ημερομηνίες και ώρες</h2>{events.length?events.map(e=><EventRow key={e._id} event={e} onIcs={event=>downloadIcs(event,production,event.stage)}/>):<Empty>Δεν υπάρχουν καταχωρισμένες ημερομηνίες.</Empty>}</section>
  {(production.gallery?.length>0)&&<section className="section"><h2>Φωτογραφίες</h2><div className="gallery">{production.gallery.map((img,i)=><img key={img._key||i} src={imageUrl(img,1000)} alt={img.alt||''} loading="lazy"/>)}</div></section>}
  {trailer&&<section className="section"><h2>Trailer</h2><div className="video"><iframe src={trailer} title={`Trailer: ${production.title}`} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy"/></div></section>}
  </div>
}
