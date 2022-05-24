import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
  return <h1></h1>
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

export default Home

