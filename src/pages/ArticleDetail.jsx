import {useParams} from 'react-router-dom'
import Seo from '../components/Seo'
import {RichText} from '../components/Common'
import {formatDate} from '../lib/date'
import {imageUrl} from '../data/sanity'
import NotFound from './NotFound'
export default function ArticleDetail({data}) { const {slug}=useParams(); const article=data.articles.find(a=>a.slug===slug); if(!article)return <NotFound/>; return <article className="page-shell article page"><Seo title={`${article.title} · ${data.settings?.name}`} description={article.summary}/><p className="eyebrow">{formatDate(article.publishedAt)}</p><h1>{article.title}</h1><p className="lead small">{article.summary}</p>{article.image&&<img className="article-image" src={imageUrl(article.image,1200)} alt={article.image.alt||''}/>}<RichText value={article.body}/></article> }
