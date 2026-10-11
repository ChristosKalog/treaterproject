export const ATHENS_TZ = 'Europe/Athens'
const now = () => new Date()
export const isPast = (iso) => new Date(iso).getTime() < now().getTime()
export const formatDate = (iso, options = {}, locale = 'el-GR') => new Intl.DateTimeFormat(locale, {timeZone: ATHENS_TZ, day: 'numeric', month: 'long', year: 'numeric', ...options}).format(new Date(iso))
export const formatDayMonth = (iso, locale='el-GR') => new Intl.DateTimeFormat(locale, {timeZone: ATHENS_TZ, day: 'numeric', month: 'long'}).format(new Date(iso))
export const formatDateTime = (iso, locale='el-GR') => formatDate(iso, {weekday:'long',hour:'2-digit',minute:'2-digit'}, locale)
export const formatCompactDateTime = (iso, locale='el-GR') => {
  const parts = new Intl.DateTimeFormat(locale, {
    timeZone: ATHENS_TZ,
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(iso))
  const part = type => parts.find(item => item.type === type)?.value || ''
  const weekday = part('weekday').replace(/[.\s]/g, '').toLocaleUpperCase(locale)
  return `${weekday} ${part('day')}/${part('month')} ${part('hour')}:${part('minute')}`
}
export const monthKey = (iso) => new Intl.DateTimeFormat('en-CA', {timeZone: ATHENS_TZ, year: 'numeric', month: '2-digit'}).format(new Date(iso))
export const localDayKey = (iso) => new Intl.DateTimeFormat('en-CA', {timeZone: ATHENS_TZ, year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(iso))
export const startOfWeek = () => { const d = new Date(); const day = d.getDay() || 7; d.setDate(d.getDate() - day + 1); d.setHours(0, 0, 0, 0); return d }
export const endOfWeek = () => { const d = startOfWeek(); d.setDate(d.getDate() + 7); return d }
export const isThisWeek = (iso) => { const d = new Date(iso); return d >= startOfWeek() && d < endOfWeek() }
export const monthLabel = (date, locale='el-GR') => new Intl.DateTimeFormat(locale, {timeZone:ATHENS_TZ,month:'long',year:'numeric'}).format(date)
