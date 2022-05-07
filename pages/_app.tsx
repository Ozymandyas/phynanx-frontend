import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../src/config/firebase'
import { AuthProvider } from '../src/hooks/auth'
import AppLayout from '../src/layouts/AppLayout'
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)

