import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Oops! This page doesn't exist.</p>
      <a href="/" className={styles.link}>← Back to Recipe Book</a>
    </div>
  )
}