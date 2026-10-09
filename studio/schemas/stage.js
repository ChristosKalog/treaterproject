import {defineField, defineType} from 'sanity'
import {required} from './helpers'
export default defineType({name:'stage',title:'Σκηνή',type:'document',fields:[defineField({name:'name',title:'Όνομα σκηνής',type:'string',validation:required}),defineField({name:'details',title:'Πληροφορίες χώρου',type:'text',rows:3,description:'Προαιρετικά: χωρητικότητα, όροφος ή οδηγίες πρόσβασης.'})],preview:{select:{title:'name',subtitle:'details'}}})
