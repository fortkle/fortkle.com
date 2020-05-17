import Head from 'next/head'
import Error from 'next/error'
import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/layout'
import Date from '../../components/date'
import Profile from '../../components/profile'
import { getRecentPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!postData) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title} - { siteTitle }</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/darcula.min.css" />
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <section>
        <h5>Written By Fukuaki TAKANO</h5>
        <Profile />
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getRecentPostIds()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
