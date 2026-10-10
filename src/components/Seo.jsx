import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {alternatePath,useLocale} from '../i18n'
export default function Seo({title,description,image,jsonLd}) {
  const {pathname}=useLocation();const {lang}=useLocale()
  useEffect(() => {
    document.title = title
    document.documentElement.lang=lang
    const set=(selector,attribute,value,key='name')=>{let node=document.head.querySelector(selector);if(!node){node=document.createElement('meta');node.setAttribute(key,attribute);document.head.appendChild(node)}node.content=value||''}
    set('meta[name="description"]','description',description)
    set('meta[property="og:title"]','og:title',title,'property');set('meta[property="og:description"]','og:description',description,'property');set('meta[property="og:type"]','og:type','website','property');set('meta[property="og:locale"]','og:locale',lang==='en'?'en_GB':'el_GR','property');set('meta[name="twitter:card"]','twitter:card',image?'summary_large_image':'summary')
    if(image)set('meta[property="og:image"]','og:image',image,'property')
    const origin=window.location.origin;const setLink=(rel,href,hreflang)=>{const selector=`link[rel="${rel}"]${hreflang?`[hreflang="${hreflang}"]`:''}`;let node=document.head.querySelector(selector);if(!node){node=document.createElement('link');node.rel=rel;if(hreflang)node.hreflang=hreflang;document.head.appendChild(node)}node.href=href}
    setLink('canonical',`${origin}${pathname}`);setLink('alternate',`${origin}${alternatePath(pathname,'el')}`,'el');setLink('alternate',`${origin}${alternatePath(pathname,'en')}`,'en');setLink('alternate',`${origin}${alternatePath(pathname,'el')}`,'x-default')
    let script=document.getElementById('page-jsonld');if(jsonLd){if(!script){script=document.createElement('script');script.id='page-jsonld';script.type='application/ld+json';document.head.appendChild(script)}script.textContent=JSON.stringify(jsonLd)}else script?.remove()
  },[title,description,image,jsonLd,lang,pathname])
  return null
}
