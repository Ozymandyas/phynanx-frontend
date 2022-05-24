import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ComputationsSaved from '../components/ComputationsSaved'
import Developpers from '../components/Developpers'
import useAuth from '../src/hooks/auth'
import { withProtected } from '../src/hooks/route'
import styles from '../styles/Account.module.scss'

const Account = (props: any) => {
  console.log('acoount', props)
  const router = useRouter()
  const [selected, setSelected] = useState(
    localStorage.getItem('stateAccount') || 'account'
  )
  const { t } = useTranslation('account')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('stateAccount', selected)
    }
  }, [selected])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log(`App is changing to ${url}`)
      localStorage.removeItem('stateAccount')
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <div
          className={`${styles.menuOptions} ${
            selected == 'account' && styles.embolden
          }`}
          onClick={e => setSelected('account')}
        >
          {t('account-info')}
        </div>
        <div
          className={`${styles.menuOptions} ${
            selected == 'computations' ? styles.embolden : ''
          }`}
          onClick={e => setSelected('computations')}
        >
          {t('computations-saved')}
        </div>
        <div
          className={`${styles.menuOptions} ${
            selected == 'developpers' ? styles.embolden : ''
          }`}
          onClick={e => setSelected('developpers')}
        >
          {t('dev')}
        </div>
      </div>
      <div className={styles.mainComponent}>
        {(selected === 'account' && <AccountInfo />) ||
          (selected === 'computations' && <ComputationsSaved />) ||
          (selected === 'developpers' && <Developpers />)}
      </div>
      <footer>
        <div className={styles.containerFooter}>
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
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['account'])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default withProtected(Account)
