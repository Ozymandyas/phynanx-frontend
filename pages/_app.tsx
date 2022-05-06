import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../src/config/firebase'
import { AuthProvider } from '../src/hooks/auth'
import AppLayout from '../src/layouts/AppLayout'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AuthProvider>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['nav'])),
      // Will be passed to the page component as props
    },
  }
}

export default appWithTranslation(MyApp)

