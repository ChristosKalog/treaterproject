import {defineCliConfig} from 'sanity/cli'
export default defineCliConfig({
  api:{projectId:process.env.SANITY_STUDIO_PROJECT_ID||'demo',dataset:process.env.SANITY_STUDIO_DATASET||'production'},
  deployment:{appId:'j7dy21doic6dnaug14hq0pmh'},
})
