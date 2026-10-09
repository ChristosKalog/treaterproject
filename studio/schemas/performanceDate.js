import {defineField, defineType} from 'sanity'
import {httpUrl, required} from './helpers'
export default defineType({name:'performanceDate',title:'Ημερομηνία παράστασης',type:'document',fields:[
  defineField({name:'engagement',title:'Παράσταση και σεζόν',type:'reference',to:[{type:'seasonEngagement'}],description:'Επιλέξτε πρώτα την ένταξη της παράστασης στη σωστή σεζόν.',validation:required}),
  defineField({name:'startsAt',title:'Ημερομηνία και ώρα έναρξης',type:'datetime',description:'Η δημόσια ιστοσελίδα εμφανίζει την ώρα σε Europe/Athens.',options:{timeStep:15},validation:required}),
  defineField({name:'stage',title:'Σκηνή',type:'reference',to:[{type:'stage'}],validation:required}),
  defineField({name:'status',title:'Κατάσταση',type:'string',options:{layout:'radio',list:[{title:'Διαθέσιμη',value:'available'},{title:'Sold out',value:'soldOut'},{title:'Ακυρώθηκε',value:'cancelled'}]},initialValue:'available',validation:required}),
  defineField({name:'ticketUrl',title:'Ειδικό URL προπώλησης',type:'url',description:'Προαιρετικό. Αν συμπληρωθεί, υπερισχύει του URL της ένταξης σε σεζόν.',validation:httpUrl})
],preview:{select:{title:'engagement.production.title',startsAt:'startsAt',stage:'stage.name',status:'status'},prepare:({title,startsAt,stage,status})=>({title:title||'Χωρίς παράσταση',subtitle:[startsAt&&new Intl.DateTimeFormat('el-GR',{dateStyle:'medium',timeStyle:'short',timeZone:'Europe/Athens'}).format(new Date(startsAt)),stage,status==='cancelled'?'Ακυρώθηκε':status==='soldOut'?'Sold out':'Διαθέσιμη'].filter(Boolean).join(' · ')} )}})
