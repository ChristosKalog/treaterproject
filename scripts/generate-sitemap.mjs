import {writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {createClient} from '@sanity/client'
import {loadEnv} from 'vite'

const env={...loadEnv(process.env.NODE_ENV||'production',process.cwd(),''),...process.env}
const projectId=env.VITE_SANITY_PROJECT_ID
const dataset=env.VITE_SANITY_DATASET||'production'
const siteUrl=(env.PUBLIC_SITE_URL||'https://amaliatheatre.netlify.app').replace(/\/$/,'')
const staticPaths=['/el','/el/parastaseis','/el/programma','/el/arxeio','/el/nea','/el/theatro','/el/epikoinonia','/en','/en/productions','/en/programme','/en/archive','/en/news','/en/theatre','/en/contact']
const escapeXml=(value)=>value.replace(/[<>&'\"]/g,(char)=>({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[char]))

let paths=[...staticPaths]
if(projectId){
  try{
    const client=createClient({projectId,dataset,apiVersion:env.VITE_SANITY_API_VERSION||'2026-10-09',useCdn:true,perspective:'published'})
    const {productions,articles}=await client.fetch('{"productions":*[_type=="production"]{"slug":slug.current,englishReady},"articles":*[_type=="article"]{"slug":slug.current,englishReady}}')
    for(const item of productions||[]){if(item.slug)paths.push(`/el/parastaseis/${item.slug}`);if(item.slug&&item.englishReady)paths.push(`/en/productions/${item.slug}`)}
    for(const item of articles||[]){if(item.slug)paths.push(`/el/nea/${item.slug}`);if(item.slug&&item.englishReady)paths.push(`/en/news/${item.slug}`)}
  }catch(error){console.warn(`Sitemap: χρησιμοποιείται μόνο η βασική λίστα διαδρομών (${error.message}).`)}
}
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(paths)].map(path=>`  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(resolve('public/sitemap.xml'),xml)
console.log(`Sitemap: ${new Set(paths).size} διαδρομές.`)
