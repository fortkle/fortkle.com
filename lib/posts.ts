import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import slug from 'remark-slug'
import toc from 'remark-toc'

const url = 'https://api.esa.io/v1/teams/fortkle'

export async function getSortedPostsData() {
  const params = { sort: 'created', q: 'category:posts', per_page: '100' };
  const qs = new URLSearchParams(params);

  const response = await fetch(
    `${url}/posts?${qs}`,
    { headers: { 'Authorization': `Bearer ${process.env.ESA_ACCESS_TOKEN}` } }
  )
  const json = await response.json()

  const allPostsData = json.posts.map(post => {
    const categoryDate = post.category
      .replace(/^posts\//, '')
      .replace(/\//g, '-')

    return {
      id: post.number,
      date: formatISO(parseISO(categoryDate)),
      title: post.name
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getRecentPostIds() {
  const params = { sort: 'created', q: 'category:posts', per_page: '1' };
  const qs = new URLSearchParams(params);

  const response = await fetch(
    `${url}/posts?${qs}`,
    { headers: { 'Authorization': `Bearer ${process.env.ESA_ACCESS_TOKEN}` } }
  )
  const json = await response.json()

  return json.posts.map(post => {
    return {
      params: {
        id: post.number.toString(),
      }
    }
  })
}

export async function getPostData(id: string) {
  const response = await fetch(
    `${url}/posts/${id}?`,
    { headers: { 'Authorization': `Bearer ${process.env.ESA_ACCESS_TOKEN}` } }
  )
  if (response.status !== 200) {
    return false
  }
  const json = await response.json()

  const categoryDate = json.category
    .replace(/^posts\//, '')
    .replace(/\//g, '-')


  const matterResult = matter(json.body_md)
  const processedContent = await remark()
    .use(html)
    .use(highlight)
    .use(slug)
    .use(toc, { heading: '目次', maxDepth: 3 })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id: json.number,
    date: formatISO(parseISO(categoryDate)),
    title: json.name,
    contentHtml: contentHtml,
    contentHtml2: json.body_html,
  }
}
