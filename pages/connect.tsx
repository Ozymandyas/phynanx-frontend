import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../src/hooks/auth'
import styles from '../styles/Connect.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { GetServerSideProps } from 'next'

type Inputs = {
  email: string
  password: string
}

const Connect = () => {
  const { t } = useTranslation('connect')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const { signin } = useAuth()
  const router = useRouter()
  const [errorConnecting, setErrorConnecting] = useState<string>('')

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setErrorConnecting('')
      const { user, errorMsg } = await signin(data.email, data.password)
      if (errorMsg) {
        setErrorConnecting(errorMsg)
      } else {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.welcome}>{t('welcome')}</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.inputBlock}>
            <label htmlFor="email">{t('email')}</label>
            <input
              autoFocus={true}
              type="email"
              placeholder={t('enter-email')}
              {...register('email', { required: true })}
              name="email"
              id="email"
            />
            {errors.email && <span>{t('field')}</span>}
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              placeholder={t('enter-password')}
              {...register('password', { required: true })}
              name="password"
              id="password"
            />
            {errors.password && <span>{t('field')}</span>}
          </div>

          <div className={errorConnecting && styles.errors}>
            <div className={styles.errorMsg}>{errorConnecting}</div>
          </div>

          <div className={styles.inputBlock}>
            <div className={styles.buttonConnect}>
              <input type="submit" value={t('connect')} />
              <Link href="/forgotten">
                <a className={styles.forgotten}>{t('forgotten')}</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['connect'])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default Connect
