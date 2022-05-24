import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/NotFound.module.scss'

const NotFound = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'
  if (locale === 'en') {
    return (
      <div className={styles.notFound}>
        <h1>Ooops</h1>
        <h2>That page cannot be found</h2>
        <p>
          Go back to the{' '}
          <Link href="/">
            <a>Home Page</a>
          </Link>
        </p>
      </div>
    )
  } else if (locale === 'fr') {
    return (
      <div className={styles.notFound}>
        <h1>Ooops</h1>
        <h2>Cette page est introuvable</h2>
        <p>
          Retourner sur la{' '}
          <Link href="/">
            <a>Page d&apos;Accueil</a>
          </Link>
        </p>
      </div>
    )
  }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['footer', 'nav'])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default NotFound
