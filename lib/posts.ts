import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import highlight from 'remark-highlight.js'
import * as remarkSlug from 'remark-slug'
import toc from 'remark-toc'

const url = 'https://api.esa.io/v1/teams/fortkle'

const SLUG_REGEXP = /\[(.+)\]/

function getSlug(post) {
  const matched = post.name.match(SLUG_REGEXP)
  return matched ? matched[1] : null
}

function getCategoryDate(post) {
  return post.category
    .replace(/^posts\//, '')
    .replace(/\//g, '-')
}

async function getPosts(params: Record<string, string>) {
  const qs = new URLSearchParams(params)
  const response = await fetch(
    `${url}/posts?${qs}`,
    { headers: { 'Authorization': `Bearer ${process.env.ESA_ACCESS_TOKEN}` } }
  )
  if (response.status !== 200) {
    return false
  }

  return await response.json()
}

export async function getSortedPostsData() {
  const params = { sort: 'created', q: 'in:posts', per_page: '100' };
  const json = await getPosts(params)

  const allPostsData = json.posts
    .filter(post => SLUG_REGEXP.test(post.name))
    .map(post => {
      return {
        id: post.number,
        date: formatISO(parseISO(getCategoryDate(post))),
        title: post.name.replace(/\[.+\]/, '').trim(),
        slug: getSlug(post),
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

export async function getRecentPostSlugs() {
  const params = { sort: 'created', q: 'in:posts', per_page: '5' };
  const json = await getPosts(params)

  return json.posts
    .filter(post => SLUG_REGEXP.test(post.name))
    .map(post => {
      return {
        params: {
          slug: getSlug(post)
        }
      }
  })
}

export async function getPostData(slug: string) {
  const params = { sort: 'created', q: `in:posts [${slug}]`, per_page: '1' };
  const json = await getPosts(params)
  if (!json || !json.posts.length) {
    return false
  }

  const post = json.posts.shift()
  const matterResult = matter(post.body_md)
  const processedContent = await remark()
    .use(html)
    .use(highlight)
    .use(remarkSlug)
    .use(toc, { heading: '目次', maxDepth: 3 })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id: post.number,
    date: formatISO(parseISO(getCategoryDate(post))),
    title: post.name.replace(/\[.+\]/, '').trim(),
    contentHtml: contentHtml,
    slug: getSlug(post),
  }
}
