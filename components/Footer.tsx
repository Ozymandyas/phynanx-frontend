import Link from 'next/link'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link href="/legal">
        <a className={styles.legal}>Mentions légales</a>
      </Link>
      <Link href="/contact">
        <a className={styles.contact}>Formulaire de contact</a>
      </Link>
    </div>
  )
}

export default Footer
