import {defineField, defineType} from 'sanity'
import {httpUrl, portableText, required} from './helpers'
export default defineType({name:'theatreSettings',title:'Στοιχεία θεάτρου',type:'document',fields:[
  defineField({name:'name',title:'Όνομα θεάτρου',type:'string',validation:required}),defineField({name:'shortDescription',title:'Σύντομη περιγραφή',type:'text',rows:3,validation:(Rule)=>Rule.required().max(240)}),
  defineField({name:'about',title:'Περιγραφή θεάτρου',type:'array',of:portableText,validation:required}),defineField({name:'address',title:'Διεύθυνση',type:'string',validation:required}),
  defineField({name:'phone',title:'Τηλέφωνο',type:'string',validation:required}),defineField({name:'email',title:'Email',type:'string',validation:(Rule)=>Rule.required().email()}),
  defineField({name:'access',title:'Πληροφορίες πρόσβασης',type:'array',of:portableText}),defineField({name:'accessibility',title:'Πληροφορίες προσβασιμότητας',type:'array',of:portableText}),
  defineField({name:'mapUrl',title:'Σύνδεσμος χάρτη',type:'url',validation:httpUrl}),defineField({name:'socials',title:'Κοινωνικά δίκτυα',type:'array',of:[{type:'object',fields:[{name:'label',title:'Όνομα',type:'string',validation:required},{name:'url',title:'URL',type:'url',validation:httpUrl}],preview:{select:{title:'label',subtitle:'url'}}}]}),
  defineField({name:'seoTitle',title:'Τίτλος SEO',type:'string',description:'Προτεινόμενο μήκος έως 60 χαρακτήρες.',validation:(Rule)=>Rule.required().max(60)}),defineField({name:'seoDescription',title:'Περιγραφή SEO',type:'text',rows:3,description:'Προτεινόμενο μήκος έως 160 χαρακτήρες.',validation:(Rule)=>Rule.required().max(160)})
],preview:{prepare:()=>({title:'Στοιχεία θεάτρου',subtitle:'Μοναδικό έγγραφο ρυθμίσεων'})}})
