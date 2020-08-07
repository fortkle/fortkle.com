import { AppProps } from 'next/app'
import '../styles/global.css'
import * as gtag from '../lib/gtags'
import { useEffect } from 'react'
import { Router } from 'next/router'

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
