import Seo from '../components/Seo'
import {ImageHero, RichText} from '../components/Common'
import {useLocale} from '../i18n'
import {imageUrl} from '../data/sanity'

const fallbackCards = {
  el: [
    {title:'Με μετρό',description:'Μόλις 5 λεπτά (350 μέτρα) με τα πόδια από τον σταθμό του μετρό Ευκλείδης.',iconUrl:'/images/access/metro.png',alt:'Γραμμική εικονογράφηση συρμού μετρό'},
    {title:'Με λεωφορείο',description:'Μόλις 2 λεπτά (160 μέτρα) με τα πόδια από την στάση Φάληρο',iconUrl:'/images/access/bus.png',alt:'Γραμμική εικονογράφηση αστικού λεωφορείου'},
    {title:'Προσβασιμότητα',description:'Πρόσβαση χωρίς σκαλοπάτια και προβλεπόμενες θέσεις για αμαξίδια.',iconUrl:'/images/access/accessibility.png',alt:'Γραμμική εικονογράφηση προσβάσιμης εισόδου'},
  ],
  en: [
    {title:'By metro',description:'Just a 5-minute walk (350 meters)from the  metro station EYKLIDIS.',iconUrl:'/images/access/metro.png',alt:'Line illustration of a metro train'},
    {title:'By bus',description:'Just a 2-minute walk (160 meters)from the  bus stop  Faliro.',iconUrl:'/images/access/bus.png',alt:'Line illustration of a city bus'},
    {title:'Accessibility',description:'The venue offers step-free access and dedicated wheelchair spaces.',iconUrl:'/images/access/accessibility.png',alt:'Line illustration of an accessible entrance'},
  ],
}

export default function Theatre({data}){
  const {t,lang}=useLocale()
  const s=data.settings||{}
  const cards=s.accessCards?.length?s.accessCards:fallbackCards[lang]
  return <><Seo title={`${t.theatre} · ${s.name}`} description={s.shortDescription}/><ImageHero image={s.heroImage} className="page-visual-hero"><p className="eyebrow">{t.aboutUs}</p><h1>{t.theatre}</h1><p className="lead">{s.shortDescription}</p></ImageHero><div className="page-shell page theatre-content"><div className="theatre-about"><RichText value={s.about}/></div><section className="access-cards-section"><div className="section-heading"><h2>{t.access}</h2></div><div className="access-cards">{cards.map((card,index)=>{const src=card.iconUrl||imageUrl(card.icon,600,600);return <article className="access-card" key={card._key||`${card.title}-${index}`}>{src&&<img src={src} alt={card.icon?.alt||card.alt||''} width="600" height="600" loading="lazy" decoding="async"/>}<h3>{card.title}</h3><p>{card.description}</p></article>})}</div></section></div></>
}
