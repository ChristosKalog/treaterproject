import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {demoData} from './demoData'
import {fetchSiteData, hasSanityConfig} from './sanity'

const DataContext = createContext(null)
export function DataProvider({children}) {
  const [data, setData] = useState(hasSanityConfig ? null : demoData)
  const [loading, setLoading] = useState(hasSanityConfig)
  const [error, setError] = useState('')
  const refresh = useCallback(async () => {
    if (!hasSanityConfig) return
    try { setError(''); const next = await fetchSiteData(); setData(next) }
    catch { setError('load-error') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => {
    refresh()
    const timer = window.setInterval(refresh, 60000)
    const onVisible = () => document.visibilityState === 'visible' && refresh()
    document.addEventListener('visibilitychange', onVisible)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible) }
  }, [refresh])
  const value = useMemo(() => ({data, loading, error, refresh, isDemo: !hasSanityConfig}), [data, loading, error, refresh])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
export const useSiteData = () => useContext(DataContext)
