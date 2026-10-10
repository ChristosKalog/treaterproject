import {defineField, defineType} from 'sanity'
import {imageWithAlt, portableText, required} from './helpers'

const articleSlug = (Rule) => Rule.required().custom((value) => {
  if (!value?.current) return true
  return /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value.current)
    ? true
    : 'Το slug δεν πρέπει να περιέχει /, κενά ή ειδικούς χαρακτήρες. Πατήστε «Generate» για αυτόματη δημιουργία.'
})

export default defineType({name:'article',title:'Άρθρο',type:'document',fields:[
  defineField({name:'englishReady',title:'Έτοιμη η αγγλική έκδοση',type:'boolean',description:'Μόνο τότε θα εμφανιστεί το άρθρο στο αγγλικό site.',initialValue:false}),
  defineField({name:'title',title:'Τίτλος',type:'string',group:'el',validation:required}),defineField({name:'titleEn',title:'Title',type:'string',group:'en',validation:(Rule)=>Rule.custom((v,c)=>!c.document?.englishReady||Boolean(v)||'Συμπληρώστε τον αγγλικό τίτλο.')}),defineField({name:'slug',title:'Σταθερό URL (slug)',type:'slug',description:'Πατήστε «Generate» από τον ελληνικό τίτλο. Το ίδιο σταθερό slug χρησιμοποιείται και στις δύο γλώσσες.',options:{source:'title',maxLength:96},validation:articleSlug}),
  defineField({name:'summary',title:'Περίληψη',type:'text',rows:3,group:'el',validation:(Rule)=>Rule.required().max(220)}),defineField({name:'summaryEn',title:'Summary',type:'text',rows:3,group:'en',validation:(Rule)=>Rule.max(220).custom((v,c)=>!c.document?.englishReady||Boolean(v)||'Συμπληρώστε την αγγλική περίληψη.')}),defineField({name:'image',title:'Κεντρική εικόνα',...imageWithAlt,description:'Προτεινόμενες διαστάσεις: 1600 × 900 px (16:9). Χρησιμοποιείται και στις δύο γλώσσες.',validation:required}),
  defineField({name:'body',title:'Κείμενο',type:'array',group:'el',of:portableText,validation:required}),defineField({name:'bodyEn',title:'Article text',type:'array',group:'en',of:portableText,validation:(Rule)=>Rule.custom((v,c)=>!c.document?.englishReady||Boolean(v?.length)||'Συμπληρώστε το αγγλικό κείμενο.')}),defineField({name:'publishedAt',title:'Ημερομηνία δημοσίευσης',type:'datetime',validation:required})
],groups:[{name:'el',title:'Ελληνικά',default:true},{name:'en',title:'English'}],preview:{select:{title:'title',subtitle:'publishedAt',media:'image',englishReady:'englishReady'},prepare:({title,subtitle,media,englishReady})=>({title,subtitle:`${subtitle||''}${englishReady?' · EN έτοιμο':' · μόνο EL'}`,media})}})
