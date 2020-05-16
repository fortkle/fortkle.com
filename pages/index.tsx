import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>FRTKL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>this is top page.</p>
      <Link href="/posts/[id]" as="/posts/sample"><a>go to post page</a></Link>
    </div>
  )
}
