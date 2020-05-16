import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p>this is top page.</p>
      <Link href="/posts/[id]" as="/posts/sample"><a>go to post page</a></Link>
    </Layout>
  )
}
