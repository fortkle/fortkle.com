import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Router from 'next/router'
import '../styles/global.css'
import * as gtag from '../lib/gtags'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!gtag.existsGaTrackingId) {
      return
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path)
    }

    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}
