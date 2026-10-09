import {createClient} from '@sanity/client'

const {SANITY_PROJECT_ID, SANITY_DATASET='production', SANITY_WRITE_TOKEN, CONFIRM_SEED} = process.env
if (CONFIRM_SEED !== 'YES') throw new Error('Για ασφάλεια απαιτείται CONFIRM_SEED=YES.')
if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) throw new Error('Λείπει SANITY_PROJECT_ID ή SANITY_WRITE_TOKEN.')
const client=createClient({projectId:SANITY_PROJECT_ID,dataset:SANITY_DATASET,apiVersion:'2026-10-09',token:SANITY_WRITE_TOKEN,useCdn:false})
const existing=await client.fetch('count(*[])')
if(existing>0) throw new Error('Το dataset δεν είναι κενό. Η εισαγωγή ακυρώθηκε χωρίς αλλαγές.')
const tx=client.transaction()
tx.create({_id:'theatreSettings',_type:'theatreSettings',name:'Δοκιμαστικό Θέατρο',shortDescription:'Δοκιμαστικό περιεχόμενο για έλεγχο της εγκατάστασης.',address:'Οδός Θεάτρου 1, Αθήνα',phone:'+30 210 000 0000',email:'info@example.gr',seoTitle:'Δοκιμαστικό Θέατρο',seoDescription:'Πρόγραμμα και νέα του δοκιμαστικού θεάτρου.',about:[]})
tx.create({_id:'season-demo',_type:'season',title:'2026–2027',startDate:'2026-09-01',endDate:'2027-08-31',isActive:true})
tx.create({_id:'stage-demo',_type:'stage',name:'Κεντρική Σκηνή'})
await tx.commit()
console.log('Δημιουργήθηκαν μόνο οι βασικές δοκιμαστικές εγγραφές. Συνεχίστε από το Studio.')
