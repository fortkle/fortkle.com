import styles from './profile.module.css'

export default function Profile() {
  return (
    <div className={styles.container}>
      <img
        src="/images/profile.png"
        className={styles.profileImage}
        alt="fortkle icon"
      />
      <p className={styles.profileText}>
        Engineering Manager at Connehito inc.<br />
        <span className={styles.lightText}>Please contact me via twitter.  <a href="https://twitter.com/fortkle" target="_blank" rel="noopener">@fortkle</a></span>
      </p>
    </div>
  )
}
