import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Forgotten = () => {
  return <div>Forgotten</div>
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

export default Forgotten
