import {defineField, defineType} from 'sanity'
import {httpUrl, required} from './helpers'
export default defineType({name:'seasonEngagement',title:'Παράσταση ανά σεζόν',type:'document',fields:[
  defineField({name:'production',title:'Παράσταση',type:'reference',to:[{type:'production'}],description:'Η βασική σελίδα της παράστασης.',validation:required}),
  defineField({name:'season',title:'Σεζόν',type:'reference',to:[{type:'season'}],description:'Η σεζόν στην οποία εντάσσεται.',validation:required}),
  defineField({name:'ticketUrl',title:'Προεπιλεγμένο URL προπώλησης',type:'url',description:'Χρησιμοποιείται σε όλες τις ημερομηνίες, εκτός αν δοθεί διαφορετικό URL σε συγκεκριμένη ημερομηνία.',validation:httpUrl})
],validation:(Rule)=>Rule.custom(async(doc,context)=>{if(!doc?.production?._ref||!doc?.season?._ref)return true;const id=(doc._id||'').replace(/^drafts\./,'');const client=context.getClient({apiVersion:'2026-10-09'});const count=await client.fetch('count(*[_type=="seasonEngagement" && production._ref==$p && season._ref==$s && !(_id in $ids)])',{p:doc.production._ref,s:doc.season._ref,ids:[id,`drafts.${id}`]});return count===0||'Η παράσταση έχει ήδη ενταχθεί σε αυτή τη σεζόν.'}),preview:{select:{title:'production.title',season:'season.title'},prepare:({title,season})=>({title:title||'Χωρίς παράσταση',subtitle:season||'Χωρίς σεζόν'})}})
