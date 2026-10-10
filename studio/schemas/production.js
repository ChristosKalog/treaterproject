import {defineField, defineType} from 'sanity'
import {httpUrl, imageWithAlt, portableText, required} from './helpers'

const exactImageSize = (width, height) => (Rule) =>
  Rule.required().custom((image) => {
    const dimensions = image?.asset?._ref?.match(/-(\d+)x(\d+)-/)
    if (!dimensions) return true
    return Number(dimensions[1]) === width && Number(dimensions[2]) === height
      ? true
      : `Η εικόνα πρέπει να είναι ακριβώς ${width} × ${height} px.`
  })

const squareImage = (Rule) =>
  Rule.required().custom((image) => {
    const dimensions = image?.asset?._ref?.match(/-(\d+)x(\d+)-/)
    if (!dimensions) return true
    return dimensions[1] === dimensions[2]
      ? true
      : 'Η εικόνα πρέπει να είναι τετράγωνη (αναλογία 1:1).'
  })

export default defineType({name:'production',title:'Παράσταση',type:'document',fields:[
  defineField({name:'englishReady',title:'Έτοιμη η αγγλική έκδοση',type:'boolean',description:'Ενεργοποιήστε μόνο όταν έχουν συμπληρωθεί και ελεγχθεί όλα τα αγγλικά πεδία. Μέχρι τότε η παράσταση δεν εμφανίζεται στο αγγλικό site.',initialValue:false}),
  defineField({name:'title',title:'Τίτλος',type:'string',group:'el',validation:required}),
  defineField({name:'titleEn',title:'Title',type:'string',group:'en',validation:(Rule)=>Rule.custom((value,context)=>!context.document?.englishReady||Boolean(value)||'Συμπληρώστε τον αγγλικό τίτλο ή απενεργοποιήστε την αγγλική έκδοση.')}),
  defineField({name:'slug',title:'Σταθερό URL (slug)',type:'slug',description:'Πατήστε «Δημιουργία» από τον τίτλο. Το URL παραμένει ίδιο ακόμη και όταν η παράσταση περάσει στο αρχείο.',options:{source:'title',maxLength:96},validation:required}),
  defineField({name:'summary',title:'Σύντομη περίληψη',type:'text',rows:3,group:'el',description:'Εμφανίζεται στις λίστες και στις μηχανές αναζήτησης.',validation:(Rule)=>Rule.required().max(220)}),
  defineField({name:'summaryEn',title:'Short summary',type:'text',rows:3,group:'en',validation:(Rule)=>Rule.max(220).custom((value,context)=>!context.document?.englishReady||Boolean(value)||'Συμπληρώστε την αγγλική περίληψη.')}),
  defineField({name:'description',title:'Περιγραφή',type:'array',group:'el',of:portableText,validation:required}),
  defineField({name:'descriptionEn',title:'Description',type:'array',group:'en',of:portableText,validation:(Rule)=>Rule.custom((value,context)=>!context.document?.englishReady||Boolean(value?.length)||'Συμπληρώστε την αγγλική περιγραφή.')}),
  defineField({name:'coverImage',title:'Cover κινητού / tablet (758 × 432)',...imageWithAlt,description:'Χρησιμοποιείται στην κορυφή της σελίδας παράστασης σε κινητό και tablet. Ανεβάστε αρχείο ακριβώς 758 × 432 px.',validation:exactImageSize(758,432)}),
  defineField({name:'desktopCoverImage',title:'Cover desktop (1111 × 337)',...imageWithAlt,description:'Η πολύ φαρδιά εικόνα στην κορυφή της σελίδας παράστασης σε desktop. Ανεβάστε αρχείο ακριβώς 1111 × 337 px και κρατήστε τα βασικά πρόσωπα ή γράμματα μακριά από τις άκρες.',validation:exactImageSize(1111,337)}),
  defineField({name:'poster',title:'Εικόνα grid (τετράγωνη 1:1)',...imageWithAlt,description:'Χρησιμοποιείται στην αρχική, στις λίστες και στο αρχείο. Ανεβάστε τετράγωνη εικόνα, κατά προτίμηση τουλάχιστον 800 × 800 px.',validation:squareImage}),
  defineField({name:'gallery',title:'Φωτογραφίες',type:'array',description:'Κάθε φωτογραφία χρειάζεται εναλλακτικό κείμενο.',of:[{...imageWithAlt}]}),
  defineField({name:'credits',title:'Συντελεστές',type:'array',group:'el',of:[{type:'object',title:'Συντελεστής / ομάδα',fields:[{name:'role',title:'Ρόλος',type:'string',validation:required},{name:'names',title:'Ονόματα',type:'string',validation:required}],preview:{select:{title:'role',subtitle:'names'}}}]}),
  defineField({name:'creditsEn',title:'Creative team',type:'array',group:'en',description:'Αγγλική απόδοση ρόλων και ονομάτων.',of:[{type:'object',title:'Credit',fields:[{name:'role',title:'Role',type:'string',validation:required},{name:'names',title:'Names',type:'string',validation:required}],preview:{select:{title:'role',subtitle:'names'}}}]}),
  defineField({name:'duration',title:'Διάρκεια σε λεπτά',type:'number',validation:(Rule)=>Rule.required().integer().positive()}),
  defineField({name:'category',title:'Κατηγορία',type:'string',group:'el',description:'Π.χ. Δράμα, Κωμωδία, Παιδικό.',validation:required}),defineField({name:'categoryEn',title:'Category',type:'string',group:'en'}),
  defineField({name:'ageRating',title:'Ηλικιακή καταλληλότητα',type:'string',group:'el',description:'Π.χ. 12+ ή Κατάλληλο για όλους.',validation:required}),defineField({name:'ageRatingEn',title:'Age guidance',type:'string',group:'en'}),
  defineField({name:'priceInfo',title:'Πληροφορίες τιμών',type:'text',rows:2,group:'el',description:'Αναφέρετε κανονικό, μειωμένο και τυχόν ειδικά εισιτήρια.',validation:required}),defineField({name:'priceInfoEn',title:'Price information',type:'text',rows:2,group:'en'}),
  defineField({name:'trailerUrl',title:'Trailer',type:'url',description:'Προαιρετικό URL μόνο από YouTube ή Vimeo.',validation:(Rule)=>httpUrl(Rule).custom((value)=>!value||/^https?:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(value)||'Επιτρέπονται μόνο σύνδεσμοι YouTube ή Vimeo.')})
],groups:[{name:'el',title:'Ελληνικά',default:true},{name:'en',title:'English'}],preview:{select:{title:'title',subtitle:'category',media:'poster',englishReady:'englishReady'},prepare:({title,subtitle,media,englishReady})=>({title,subtitle:`${subtitle||''}${englishReady?' · EN έτοιμο':' · μόνο EL'}`,media})}})
