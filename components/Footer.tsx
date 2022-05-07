import Link from 'next/link'
import styles from '../styles/Footer.module.css'
import en from '../public/locales/en/footer.json'
import fr from '../public/locales/fr/footer.json'
import { useRouter } from 'next/router'

const Footer = () => {
  const { locale } = useRouter()

  const t = (key: string) => {
    if (locale == 'en') {
      return en[key as keyof typeof en]
    } else if (locale == 'fr') {
      return fr[key as keyof typeof fr]
    }
  }
  return (
    <div className={styles.footer}>
      <Link href="/legal">
        <a className={styles.legal}>{t('mentions')}</a>
      </Link>
      <Link href="/contact">
        <a className={styles.contact}>{t('contact')}</a>
      </Link>
    </div>
  )
}

export default Footer
