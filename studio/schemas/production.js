import {defineField, defineType} from 'sanity'
import {httpUrl, imageWithAlt, portableText, required} from './helpers'
export default defineType({name:'production',title:'Παράσταση',type:'document',fields:[
  defineField({name:'title',title:'Τίτλος',type:'string',validation:required}),
  defineField({name:'slug',title:'Σταθερό URL (slug)',type:'slug',description:'Πατήστε «Δημιουργία» από τον τίτλο. Το URL παραμένει ίδιο ακόμη και όταν η παράσταση περάσει στο αρχείο.',options:{source:'title',maxLength:96},validation:required}),
  defineField({name:'summary',title:'Σύντομη περίληψη',type:'text',rows:3,description:'Εμφανίζεται στις λίστες και στις μηχανές αναζήτησης.',validation:(Rule)=>Rule.required().max(220)}),
  defineField({name:'description',title:'Περιγραφή',type:'array',of:portableText,validation:required}),
  defineField({name:'poster',title:'Αφίσα',...imageWithAlt,validation:required}),
  defineField({name:'gallery',title:'Φωτογραφίες',type:'array',description:'Κάθε φωτογραφία χρειάζεται εναλλακτικό κείμενο.',of:[{...imageWithAlt}]}),
  defineField({name:'credits',title:'Συντελεστές',type:'array',of:[{type:'object',title:'Συντελεστής / ομάδα',fields:[{name:'role',title:'Ρόλος',type:'string',validation:required},{name:'names',title:'Ονόματα',type:'string',validation:required}],preview:{select:{title:'role',subtitle:'names'}}}]}),
  defineField({name:'duration',title:'Διάρκεια σε λεπτά',type:'number',validation:(Rule)=>Rule.required().integer().positive()}),
  defineField({name:'category',title:'Κατηγορία',type:'string',description:'Π.χ. Δράμα, Κωμωδία, Παιδικό.',validation:required}),
  defineField({name:'ageRating',title:'Ηλικιακή καταλληλότητα',type:'string',description:'Π.χ. 12+ ή Κατάλληλο για όλους.',validation:required}),
  defineField({name:'priceInfo',title:'Πληροφορίες τιμών',type:'text',rows:2,description:'Αναφέρετε κανονικό, μειωμένο και τυχόν ειδικά εισιτήρια.',validation:required}),
  defineField({name:'trailerUrl',title:'Trailer',type:'url',description:'Προαιρετικό URL μόνο από YouTube ή Vimeo.',validation:(Rule)=>httpUrl(Rule).custom((value)=>!value||/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(value)||'Επιτρέπονται μόνο σύνδεσμοι YouTube ή Vimeo.')})
],preview:{select:{title:'title',subtitle:'category',media:'poster'}}})
