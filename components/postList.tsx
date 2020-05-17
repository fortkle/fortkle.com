import Link from "next/link";
import Date from "./date";
import styles from './postList.module.css'

type Props = {
  postsData: any
}

export default function PostList({ postsData }: Props) {
  if (!postsData) {
    return null
  }

  return (
    <ul className={styles.list}>
    {postsData.map(( { id, date, title }) => (
        <li className={styles.listItem} key={id}>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <a>{title}</a>
          </Link>
          <br />
          <small className={styles.lightText}>
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </ul>
  )
}
