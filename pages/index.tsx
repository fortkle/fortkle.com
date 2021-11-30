import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Profile from '../components/profile'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2>Fukuaki TAKANO is...</h2>
        <Profile />
      </section>
      <section>
        <h2>Links</h2>
        <ul>
          <li><a href="https://github.com/fortkle" target="_blank">GitHub</a></li>
          <li><a href="https://twitter.com/fortkle" target="_blank">Twitter</a></li>
          <li><a href="https://blog.fortkle.com" target="_blank">Blog</a></li>
        </ul>
      </section>
    </Layout>
  )
}
