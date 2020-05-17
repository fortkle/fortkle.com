import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import PostList from '../components/postList'
import { getSortedPostsData } from '../lib/posts'

type Props = {
  allPostsData: any
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1>Fukuaki TAKANO is...</h1>
        <p>a web engineer.</p>
        <p>Please contact me via twitter.  <a href="https://twitter.com/fortkle" target="_blank" rel="noopener">@fortkle</a></p>
      </section>
      <section>
        <h2>Blog</h2>
        <PostList postsData={allPostsData} />
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
