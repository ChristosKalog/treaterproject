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

const pad = (n) => String(n).padStart(2, '0')
const icsDate = (date) => `${date.getUTCFullYear()}${pad(date.getUTCMonth()+1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
const escapeIcs = (value='') => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
export function createIcs(event, production, stage) {
  const start = new Date(event.startsAt); const end = new Date(start.getTime() + (production.duration || 90) * 60000)
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Theatro Starter//EL','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${event._id}@theatro`,`DTSTAMP:${icsDate(new Date())}`,`DTSTART:${icsDate(start)}`,`DTEND:${icsDate(end)}`,`SUMMARY:${escapeIcs(production.title)}`,`LOCATION:${escapeIcs(stage?.name)}`,'END:VEVENT','END:VCALENDAR'].join('\r\n')
}
export function downloadIcs(event, production, stage) {
  const content = createIcs(event, production, stage)
  const url = URL.createObjectURL(new Blob([content], {type: 'text/calendar;charset=utf-8'}))
  const a = document.createElement('a'); a.href = url; a.download = `${production.slug || 'parastasi'}.ics`; a.click(); URL.revokeObjectURL(url)
}
