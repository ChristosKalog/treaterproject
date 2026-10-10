import {useParams} from 'react-router-dom'
import Seo from '../components/Seo'
import {RichText} from '../components/Common'
import {formatDate} from '../lib/date'
import {imageUrl} from '../data/sanity'
import NotFound from './NotFound'
import {useLocale} from '../i18n'
export default function ArticleDetail({data}){const {slug}=useParams();const {locale,lang}=useLocale();const article=data.articles.find(a=>a.slug===slug);if(!article)return <NotFound/>;const image=imageUrl(article.image,1200,630);return <article className="page-shell article page"><Seo title={`${article.title} · ${data.settings?.name}`} description={article.summary} image={image} jsonLd={{'@context':'https://schema.org','@type':'NewsArticle',headline:article.title,description:article.summary,datePublished:article.publishedAt,image:image?[image]:undefined,inLanguage:lang}}/><p className="eyebrow">{formatDate(article.publishedAt,{},locale)}</p><h1>{article.title}</h1><p className="lead small">{article.summary}</p>{article.image&&<img className="article-image" src={imageUrl(article.image,1600,900)} srcSet={[800,1200,1600].map(w=>`${imageUrl(article.image,w,Math.round(w*9/16))} ${w}w`).join(', ')} sizes="(max-width: 800px) 100vw, 760px" alt={article.image.alt||''} width="1600" height="900"/>}<RichText value={article.body}/></article>}
