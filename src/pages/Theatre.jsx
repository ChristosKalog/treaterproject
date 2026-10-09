import Seo from '../components/Seo'
import {RichText} from '../components/Common'
export default function Theatre({data}) { const s=data.settings||{}; return <div className="page-shell page narrow"><Seo title={`Το θέατρο · ${s.name}`} description={s.shortDescription}/><header className="page-header"><p className="eyebrow">Σχετικά με εμάς</p><h1>Το θέατρο</h1></header><RichText value={s.about}/><section className="section"><h2>Πρόσβαση</h2><RichText value={s.access}/></section><section className="section"><h2>Προσβασιμότητα</h2><RichText value={s.accessibility}/></section></div> }
