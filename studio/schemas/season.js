import {defineField, defineType} from 'sanity'
import {required} from './helpers'
export default defineType({name:'season',title:'Σεζόν',type:'document',fields:[
  defineField({name:'title',title:'Τίτλος σεζόν',type:'string',description:'Π.χ. 2026–2027.',validation:required}),
  defineField({name:'startDate',title:'Ημερομηνία έναρξης',type:'date',validation:required}),
  defineField({name:'endDate',title:'Ημερομηνία λήξης',type:'date',validation:(Rule)=>Rule.required().custom((value,context)=>!value||!context.document?.startDate||value>=context.document.startDate||'Η λήξη πρέπει να είναι μετά την έναρξη.')}),
  defineField({name:'isActive',title:'Ενεργή σεζόν',type:'boolean',description:'Μόνο μία σεζόν μπορεί να είναι ενεργή.',initialValue:false,validation:(Rule)=>Rule.custom(async(value,context)=>{if(!value)return true;const client=context.getClient({apiVersion:'2026-10-09'});const id=(context.document?._id||'').replace(/^drafts\./,'');const count=await client.fetch('count(*[_type == "season" && isActive == true && !(_id in $ids)])',{ids:[id,`drafts.${id}`]});return count===0||'Υπάρχει ήδη άλλη ενεργή σεζόν.'})})
],preview:{select:{title:'title',active:'isActive'},prepare:({title,active})=>({title,subtitle:active?'Ενεργή σεζόν':'Μη ενεργή'})}})
