import Document, { Html, Head, Main, NextScript } from 'next/document'
import { existsGaTrackingId, GA_TRACKING_ID } from '../lib/gtags'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
          {/* Google Analytics */}
          {existsGaTrackingId ? (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });`,
                }}
              />
            </>
          ) : null}
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}
