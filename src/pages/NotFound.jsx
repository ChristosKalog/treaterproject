import {Link} from 'react-router-dom'
import Seo from '../components/Seo'
import {useLocale} from '../i18n'
export default function NotFound(){const {t,path}=useLocale();return <div className="state page"><Seo title={t.notFoundTitle} description={t.notFoundText}/><p className="eyebrow">404</p><h1>{t.notFoundTitle}</h1><p>{t.notFoundText}</p><Link className="button" to={path('home')}>{t.backHome}</Link></div>}
