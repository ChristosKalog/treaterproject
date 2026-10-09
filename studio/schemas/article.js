import {defineField, defineType} from 'sanity'
import {imageWithAlt, portableText, required} from './helpers'

const articleSlug = (Rule) => Rule.required().custom((value) => {
  if (!value?.current) return true
  return /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value.current)
    ? true
    : 'Το slug δεν πρέπει να περιέχει /, κενά ή ειδικούς χαρακτήρες. Πατήστε «Generate» για αυτόματη δημιουργία.'
})

export default defineType({name:'article',title:'Άρθρο',type:'document',fields:[
  defineField({name:'title',title:'Τίτλος',type:'string',validation:required}),defineField({name:'slug',title:'Σταθερό URL (slug)',type:'slug',description:'Πατήστε «Generate» από τον τίτλο. Μην προσθέτετε κάθετο / στην αρχή ή στο τέλος.',options:{source:'title',maxLength:96},validation:articleSlug}),
  defineField({name:'summary',title:'Περίληψη',type:'text',rows:3,validation:(Rule)=>Rule.required().max(220)}),defineField({name:'image',title:'Κεντρική εικόνα',...imageWithAlt,description:'Προτεινόμενες διαστάσεις: 1600 × 900 px (οριζόντια αναλογία 16:9). Η ίδια εικόνα χρησιμοποιείται στη λίστα Νέα και στη σελίδα του άρθρου.',validation:required}),
  defineField({name:'body',title:'Κείμενο',type:'array',of:portableText,validation:required}),defineField({name:'publishedAt',title:'Ημερομηνία δημοσίευσης',type:'datetime',validation:required})
],preview:{select:{title:'title',subtitle:'publishedAt',media:'image'}}})
