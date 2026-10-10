import {Link} from 'react-router-dom'
import Seo from '../components/Seo'
import {Empty} from '../components/Common'
import {formatDate} from '../lib/date'
import {imageUrl} from '../data/sanity'
import {useLocale} from '../i18n'
export default function News({data}){const {t,path,locale}=useLocale();return <div className="page-shell page"><Seo title={`${t.news} · ${data.settings?.name}`} description={t.newsDescription}/><header className="page-header"><p className="eyebrow">{t.announcements}</p><h1>{t.news}</h1></header>{data.articles.length?<div className="news-list">{data.articles.map(a=><article key={a._id}>{a.image&&<img src={imageUrl(a.image,800,450)} srcSet={[480,800,1200].map(w=>`${imageUrl(a.image,w,Math.round(w*9/16))} ${w}w`).join(', ')} sizes="(max-width: 560px) 100vw, 35vw" alt={a.image.alt||''} loading="lazy" decoding="async" width="800" height="450"/>}<div><p className="eyebrow">{formatDate(a.publishedAt,{},locale)}</p><h2><Link to={path('news',a.slug)}>{a.title}</Link></h2><p>{a.summary}</p></div></article>)}</div>:<Empty/>}</div>}
