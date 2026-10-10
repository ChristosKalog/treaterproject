import {Navigate,Route,Routes,useLocation} from 'react-router-dom'
import Layout from './components/Layout'
import {Loading,ErrorState} from './components/Common'
import {useSiteData} from './data/DataContext'
import {enrich} from './lib/content'
import {languageFromPath} from './i18n'
import Home from './pages/Home'
import Productions from './pages/Productions'
import ProductionDetail from './pages/ProductionDetail'
import Schedule from './pages/Schedule'
import Archive from './pages/Archive'
import News from './pages/News'
import ArticleDetail from './pages/ArticleDetail'
import Theatre from './pages/Theatre'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function LegacyRedirect(){const {pathname,search,hash}=useLocation();return <Navigate replace to={`/el${pathname==='/'?'':pathname}${search}${hash}`}/>}

function LocalizedRoutes({data}) {
  const set=(lang)=>{const prefix=lang==='el'?'/el':'/en';const n=lang==='el'?{productions:'parastaseis',schedule:'programma',archive:'arxeio',news:'nea',theatre:'theatro',contact:'epikoinonia'}:{productions:'productions',schedule:'programme',archive:'archive',news:'news',theatre:'theatre',contact:'contact'};return <Route key={lang} path={prefix}><Route index element={<Home data={data}/>}/><Route path={n.productions} element={<Productions data={data}/>}/><Route path={`${n.productions}/:slug`} element={<ProductionDetail data={data}/>}/><Route path={n.schedule} element={<Schedule data={data}/>}/><Route path={n.archive} element={<Archive data={data}/>}/><Route path={n.news} element={<News data={data}/>}/><Route path={`${n.news}/:slug`} element={<ArticleDetail data={data}/>}/><Route path={n.theatre} element={<Theatre data={data}/>}/><Route path={n.contact} element={<Contact data={data}/>}/><Route path="*" element={<NotFound/>}/></Route>}
  return <Routes><Route path="/" element={<Navigate replace to="/el"/>}/>{set('el')}{set('en')}{['parastaseis','programma','arxeio','nea','theatro','epikoinonia'].map(segment=><Route key={segment} path={`/${segment}/*`} element={<LegacyRedirect/>}/>) }<Route path="*" element={<Navigate replace to="/el"/>}/></Routes>
}

export default function App(){const {pathname}=useLocation();const lang=languageFromPath(pathname);const {data,loading,error,refresh}=useSiteData();if(loading)return <Loading/>;if(error)return <ErrorState message={error} retry={refresh}/>;if(!data)return <ErrorState retry={refresh}/>;const content=enrich(data,lang);return <Layout data={content}><LocalizedRoutes data={content}/></Layout>}
