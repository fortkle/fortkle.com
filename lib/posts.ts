import parseISO from 'date-fns/parseISO'
import formatISO from 'date-fns/formatISO'

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
