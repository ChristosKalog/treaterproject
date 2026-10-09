import {Link} from 'react-router-dom'
import Seo from '../components/Seo'
import {Empty} from '../components/Common'
import {formatDate} from '../lib/date'
import {imageUrl} from '../data/sanity'
export default function News({data}) { return <div className="page-shell page"><Seo title="Νέα" description="Τα νέα και οι ανακοινώσεις του θεάτρου."/><header className="page-header"><p className="eyebrow">Ανακοινώσεις</p><h1>Νέα</h1></header>{data.articles.length?<div className="news-list">{data.articles.map(a=><article key={a._id}>{a.image&&<img src={imageUrl(a.image,800,450)} alt={a.image.alt||''} loading="lazy" width="800" height="450"/>}<div><p className="eyebrow">{formatDate(a.publishedAt)}</p><h2><Link to={`/nea/${a.slug}`}>{a.title}</Link></h2><p>{a.summary}</p></div></article>)}</div>:<Empty/>}</div> }
