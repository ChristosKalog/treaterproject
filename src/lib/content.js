export const byId = (items = []) => new Map(items.map((item) => [item._id, item]))
export const normalizeSlug = (value = '') => String(value).replace(/^\/+|\/+$/g, '')
const localized = (item, lang, fields) => lang !== 'en' ? item : fields.reduce((next, field) => ({...next, [field]: item[`${field}En`] || item[field]}), {...item})
export function enrich(data, lang = 'el') {
  const productionItems = (data.productions || []).filter((item) => lang === 'el' || item.englishReady).map((item) => ({...localized(item,lang,['title','summary','description','category','ageRating','priceInfo','credits']),slug:normalizeSlug(item.slug)}))
  const articleItems = (data.articles || []).filter((item) => lang === 'el' || item.englishReady).map((item) => ({...localized(item,lang,['title','summary','body']),slug:normalizeSlug(item.slug)}))
  const seasonItems = (data.seasons || []).map((item) => localized(item,lang,['title']))
  const stageItems = (data.stages || []).map((item) => localized(item,lang,['name','details']))
  const settings = localized(data.settings || {},lang,['name','shortDescription','heroMessage','about','address','access','accessibility','seoTitle','seoDescription'])
  const productions = byId(productionItems), seasons = byId(seasonItems), stages = byId(stageItems), engagements = byId(data.engagements)
  const events = (data.events || []).map((event) => {
    const engagement = engagements.get(event.engagementId)
    return {...event, engagement, production: productions.get(engagement?.productionId), season: seasons.get(engagement?.seasonId), stage: stages.get(event.stageId), ticketUrl: event.ticketUrl || engagement?.ticketUrl || ''}
  }).filter((event) => event.production)
  return {...data,settings,seasons:seasonItems,stages:stageItems,productions:productionItems,articles:articleItems,events}
}
export const unique = (values, locale='el') => [...new Set(values.filter(Boolean))].sort((a,b) => a.localeCompare(b,locale))
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
