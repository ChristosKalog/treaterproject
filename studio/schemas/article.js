import {defineField, defineType} from 'sanity'
import {imageWithAlt, portableText, required} from './helpers'
export default defineType({name:'article',title:'Άρθρο',type:'document',fields:[
  defineField({name:'title',title:'Τίτλος',type:'string',validation:required}),defineField({name:'slug',title:'Σταθερό URL (slug)',type:'slug',options:{source:'title',maxLength:96},validation:required}),
  defineField({name:'summary',title:'Περίληψη',type:'text',rows:3,validation:(Rule)=>Rule.required().max(220)}),defineField({name:'image',title:'Κεντρική εικόνα',...imageWithAlt,validation:required}),
  defineField({name:'body',title:'Κείμενο',type:'array',of:portableText,validation:required}),defineField({name:'publishedAt',title:'Ημερομηνία δημοσίευσης',type:'datetime',validation:required})
],preview:{select:{title:'title',subtitle:'publishedAt',media:'image'}}})
