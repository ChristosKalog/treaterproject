import {defineField, defineType} from 'sanity'
import {httpUrl, imageWithAlt, portableText, required} from './helpers'

const accessCard = {
  type: 'object',
  name: 'accessCard',
  title: 'Κάρτα πρόσβασης',
  fields: [
    defineField({name:'icon',title:'Εικόνα / εικονίδιο',type:'image',options:{hotspot:true},description:'Προτείνεται τετράγωνη ασπρόμαυρη εικόνα ή PNG με διαφανές φόντο, τουλάχιστον 800 × 800 px.',fields:[defineField({name:'alt',title:'Εναλλακτικό κείμενο',type:'string',description:'Π.χ. Εικονογράφηση συρμού μετρό.',validation:required}),defineField({name:'altEn',title:'Alternative text (English)',type:'string',validation:required})],validation:required}),
    defineField({name:'title',title:'Τίτλος',type:'string',description:'Π.χ. Με μετρό',validation:(Rule)=>Rule.required().max(60)}),
    defineField({name:'titleEn',title:'Title (English)',type:'string',validation:(Rule)=>Rule.required().max(60)}),
    defineField({name:'description',title:'Περιγραφή',type:'text',rows:3,description:'Σύντομη και πρακτική πληροφορία για τον επισκέπτη.',validation:(Rule)=>Rule.required().max(260)}),
    defineField({name:'descriptionEn',title:'Description (English)',type:'text',rows:3,validation:(Rule)=>Rule.required().max(260)}),
  ],
  preview: {select:{title:'title',subtitle:'description',media:'icon'}},
}

export default defineType({name:'theatreSettings',title:'Στοιχεία θεάτρου',type:'document',fields:[
  defineField({name:'name',title:'Όνομα θεάτρου',type:'string',group:'el',validation:required}),defineField({name:'nameEn',title:'Theatre name',type:'string',group:'en',validation:required}),defineField({name:'shortDescription',title:'Σύντομη περιγραφή',type:'text',rows:3,group:'el',validation:(Rule)=>Rule.required().max(240)}),defineField({name:'shortDescriptionEn',title:'Short description',type:'text',rows:3,group:'en',validation:(Rule)=>Rule.required().max(240)}),
  defineField({name:'heroMessage',title:'Μήνυμα κεντρικού hero',type:'text',rows:2,group:'el',description:'Προαιρετικό σύντομο μήνυμα πάνω στην κεντρική φωτογραφία. Αν μείνει κενό, χρησιμοποιείται η σύντομη περιγραφή.',validation:(Rule)=>Rule.max(180)}),defineField({name:'heroMessageEn',title:'Homepage hero message',type:'text',rows:2,group:'en',validation:(Rule)=>Rule.max(180).custom((value,context)=>!context.document?.heroMessage||Boolean(value)||'Συμπληρώστε το μήνυμα του hero στα αγγλικά.')}),
  defineField({name:'logo',title:'Κυκλικό λογότυπο',...imageWithAlt,description:'Ανεβάστε το κυκλικό λογότυπο σε PNG ή WebP, ιδανικά τετράγωνο και με διαφανές φόντο.'}),
  defineField({name:'heroImage',title:'Κεντρική φωτογραφία θεάτρου',...imageWithAlt,description:'Χρησιμοποιείται στο hero της αρχικής και στη σελίδα «Το θέατρο». Προτείνεται οριζόντια εικόνα τουλάχιστον 1920 × 900 px.'}),
  defineField({name:'contactHeroImage',title:'Φωτογραφία σελίδας επικοινωνίας',...imageWithAlt,description:'Χρησιμοποιείται στο hero της Επικοινωνίας. Προτείνεται οριζόντια εικόνα τουλάχιστον 1920 × 900 px.'}),
  defineField({name:'about',title:'Περιγραφή θεάτρου',type:'array',group:'el',of:portableText,validation:required}),defineField({name:'aboutEn',title:'About the theatre',type:'array',group:'en',of:portableText,validation:required}),defineField({name:'address',title:'Διεύθυνση',type:'string',group:'el',validation:required}),defineField({name:'addressEn',title:'Address',type:'string',group:'en',validation:required}),
  defineField({name:'phone',title:'Τηλέφωνο',type:'string',validation:required}),defineField({name:'email',title:'Email',type:'string',validation:(Rule)=>Rule.required().email()}),
  defineField({name:'access',title:'Πληροφορίες πρόσβασης',type:'array',group:'el',of:portableText}),defineField({name:'accessEn',title:'Getting here',type:'array',group:'en',of:portableText,validation:(Rule)=>Rule.custom((value,context)=>!context.document?.access?.length||Boolean(value?.length)||'Συμπληρώστε τις πληροφορίες πρόσβασης στα αγγλικά.')}),defineField({name:'accessibility',title:'Πληροφορίες προσβασιμότητας',type:'array',group:'el',of:portableText}),defineField({name:'accessibilityEn',title:'Accessibility information',type:'array',group:'en',of:portableText,validation:(Rule)=>Rule.custom((value,context)=>!context.document?.accessibility?.length||Boolean(value?.length)||'Συμπληρώστε τις πληροφορίες προσβασιμότητας στα αγγλικά.')}),
  defineField({name:'accessCards',title:'Κάρτες πρόσβασης & προσβασιμότητας',type:'array',group:['el','en'],description:'Προσθέστε μία κάρτα για κάθε τρόπο πρόσβασης ή πληροφορία προσβασιμότητας. Μπορείτε να αλλάξετε τη σειρά τους με μεταφορά. Προτείνονται τρεις κάρτες.',of:[accessCard],validation:(Rule)=>Rule.max(6).warning('Για καθαρή εμφάνιση προτείνονται έως 6 κάρτες.')}),
  defineField({name:'mapUrl',title:'Σύνδεσμος χάρτη',type:'url',validation:httpUrl}),defineField({name:'socials',title:'Κοινωνικά δίκτυα',type:'array',of:[{type:'object',fields:[{name:'label',title:'Όνομα',type:'string',validation:required},{name:'url',title:'URL',type:'url',validation:httpUrl}],preview:{select:{title:'label',subtitle:'url'}}}]}),
  defineField({name:'siteUrl',title:'Δημόσια διεύθυνση ιστοσελίδας',type:'url',description:'Π.χ. https://amaliatheatre.netlify.app — χρησιμοποιείται για SEO και κοινωνικά δίκτυα.',validation:httpUrl}),
  defineField({name:'seoTitle',title:'Τίτλος SEO',type:'string',group:'el',description:'Προτεινόμενο μήκος έως 60 χαρακτήρες.',validation:(Rule)=>Rule.required().max(60)}),defineField({name:'seoTitleEn',title:'SEO title',type:'string',group:'en',validation:(Rule)=>Rule.required().max(60)}),defineField({name:'seoDescription',title:'Περιγραφή SEO',type:'text',rows:3,group:'el',description:'Προτεινόμενο μήκος έως 160 χαρακτήρες.',validation:(Rule)=>Rule.required().max(160)}),defineField({name:'seoDescriptionEn',title:'SEO description',type:'text',rows:3,group:'en',validation:(Rule)=>Rule.required().max(160)})
],groups:[{name:'el',title:'Ελληνικά',default:true},{name:'en',title:'English'}],preview:{prepare:()=>({title:'Στοιχεία θεάτρου',subtitle:'Μοναδικό έγγραφο ρυθμίσεων'})}})
