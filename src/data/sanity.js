import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-10-09'
export const hasSanityConfig = Boolean(projectId)

const localApiConfig = import.meta.env.DEV
  ? {apiHost: `${window.location.origin}/sanity-api`, useProjectHostname: false}
  : {}

export const client = hasSanityConfig ? createClient({projectId, dataset, apiVersion, useCdn: false, perspective: 'published', ...localApiConfig}) : null
const builder = client ? imageUrlBuilder(client) : null
export const imageUrl = (source, width = 900, height) => {
  if (!source || !builder) return ''
  const image = builder.image(source).width(width).auto('format')
  return (height ? image.height(height).fit('crop') : image.fit('max')).url()
}

const query = `{
  "settings": *[_type == "theatreSettings"][0],
  "seasons": *[_type == "season"] | order(startDate desc),
  "stages": *[_type == "stage"] | order(name asc),
  "productions": *[_type == "production"] | order(title asc){..., "slug": slug.current},
  "engagements": *[_type == "seasonEngagement"]{..., "productionId": production._ref, "seasonId": season._ref},
  "events": *[_type == "performanceDate"] | order(startsAt asc){..., "engagementId": engagement._ref, "stageId": stage._ref},
  "articles": *[_type == "article"] | order(publishedAt desc){..., "slug": slug.current}
}`

export async function fetchSiteData() {
  if (!client) return null
  return client.fetch(query, {}, {cache: 'no-store'})
}
