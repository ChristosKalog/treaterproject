import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structure'
import {DuplicateEngagementAction} from './actions/DuplicateEngagementAction'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'demo'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'theatre-studio', title: 'Διαχείριση θεάτρου', projectId, dataset,
  plugins: [structureTool({structure}), visionTool({defaultApiVersion:'2026-10-09'})],
  schema: {types: schemaTypes, templates: (templates) => templates.filter((template) => template.schemaType !== 'theatreSettings')},
  document: {
    actions: (actions, context) => {
      if (context.schemaType === 'theatreSettings') return actions.filter(({action}) => ['publish','discardChanges','restore'].includes(action))
      if (context.schemaType === 'seasonEngagement') return [...actions.filter(({action}) => action !== 'duplicate'), DuplicateEngagementAction]
      return actions
    },
  },
})
