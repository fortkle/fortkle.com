import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'

export const siteTitle = 'FRTKL'

type Props = {
  children: React.ReactNode
  home?: boolean
}

export default function Layout({ children, home }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/logo.png"
              className={styles.headerHomeImage}
              alt={siteTitle}
            />
            <h1 className={styles.headerTitle}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/logo.png"
                  className={styles.headerImage}
                  alt={siteTitle}
                />
              </a>
            </Link>
            <h2 className={styles.headerTitle}>
              <Link href="/">
                <a>{siteTitle}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

