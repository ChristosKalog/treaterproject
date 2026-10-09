export const byId = (items = []) => new Map(items.map((item) => [item._id, item]))
export const normalizeSlug = (value = '') => String(value).replace(/^\/+|\/+$/g, '')
export function enrich(data) {
  const productionItems = (data.productions || []).map((item) => ({...item, slug: normalizeSlug(item.slug)}))
  const articleItems = (data.articles || []).map((item) => ({...item, slug: normalizeSlug(item.slug)}))
  const productions = byId(productionItems), seasons = byId(data.seasons), stages = byId(data.stages), engagements = byId(data.engagements)
  const events = (data.events || []).map((event) => {
    const engagement = engagements.get(event.engagementId)
    return {...event, engagement, production: productions.get(engagement?.productionId), season: seasons.get(engagement?.seasonId), stage: stages.get(event.stageId), ticketUrl: event.ticketUrl || engagement?.ticketUrl || ''}
  }).filter((event) => event.production)
  return {...data, productions: productionItems, articles: articleItems, events}
}
export const unique = (values) => [...new Set(values.filter(Boolean))].sort((a,b) => a.localeCompare(b, 'el'))
export const safeExternalUrl = (value) => {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : '' } catch { return '' }
}
export const trailerEmbedUrl = (value) => {
  const safe = safeExternalUrl(value); if (!safe) return ''
  const url = new URL(safe)
  if (['youtube.com','www.youtube.com','youtu.be'].includes(url.hostname)) {
    const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v')
    return id && /^[\w-]{6,}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : ''
  }
  if (['vimeo.com','www.vimeo.com'].includes(url.hostname)) { const id = url.pathname.split('/').filter(Boolean)[0]; return /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : '' }
  return ''
}
