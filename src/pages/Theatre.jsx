import Seo from '../components/Seo'
import {ImageHero, RichText} from '../components/Common'
import {useLocale} from '../i18n'
export default function Theatre({data}){const {t}=useLocale();const s=data.settings||{};return <><Seo title={`${t.theatre} · ${s.name}`} description={s.shortDescription}/><ImageHero image={s.heroImage} className="page-visual-hero"><p className="eyebrow">{t.aboutUs}</p><h1>{t.theatre}</h1><p className="lead">{s.shortDescription}</p></ImageHero><div className="page-shell page narrow theatre-content"><RichText value={s.about}/><section className="section"><h2>{t.access}</h2><RichText value={s.access}/></section><section className="section"><h2>{t.accessibility}</h2><RichText value={s.accessibility}/></section></div></>}
