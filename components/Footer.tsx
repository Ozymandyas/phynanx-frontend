import Link from 'next/link'
import styles from '../styles/Footer.module.scss'
import en from '../public/locales/en/footer.json'
import fr from '../public/locales/fr/footer.json'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { i18n } from 'next-i18next'

const Footer = () => {
  const { locale } = useRouter()

  // const [translation, setTranslation] = useState({})
  // useEffect(() => {
  //   const bundle = i18n?.getResourceBundle(locale ?? 'en', 'footer')
  //   console.log(bundle)
  //   setTranslation(bundle)
  // }, [locale])

  // const t = (word: string) =>
  //   word.split('.').reduce((p, c) => (p && p[c]) || null, translation)

  const t = (key: string) => {
    if (locale == 'en') {
      return en[key as keyof typeof en]
    } else if (locale == 'fr') {
      return fr[key as keyof typeof fr]
    }
  }
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>{t('resources')}</h3>
          <ul>
            <li>
              <Link href="/computations">
                <a>{t('computations')}</a>
              </Link>
            </li>
            <li>
              <Link href="/docs">
                <a>{t('documentation')}</a>
              </Link>
            </li>
            <li>
              <a href="">More to come</a>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>{t('about-phynanx')}</h3>
          <ul>
            <li>
              <Link href="/contact">
                <a className={styles.contact}>{t('contact')}</a>
              </Link>
            </li>
            <li>
              <a href="">{t('github')}</a>
            </li>
            <li>
              <a href="">{t('twitter')}</a>
            </li>
          </ul>
        </div>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>{t('legal')}</h3>
          <ul>
            <li>
              <Link href="/legal">
                <a className={styles.legal}>{t('mentions')}</a>
              </Link>
            </li>
            <li>
              <a href="">More to come</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
