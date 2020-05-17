import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import PostList from '../components/postList'
import Profile from '../components/profile'
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
        <h2>Fukuaki TAKANO is...</h2>
        <Profile />
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
