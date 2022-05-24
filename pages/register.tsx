import Link from 'next/link'
import { GetServerSideProps, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../src/hooks/auth'
import FirestoreService from '../src/services/FirestoreService'
import styles from '../styles/Register.module.scss'
import { withPublic } from '../src/hooks/route'

type Inputs = {
  email: string
  password1: string
  password2: string
}

const Register = () => {
  const { t } = useTranslation('register')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const { signup } = useAuth()
  const router = useRouter()

  const [errorRegistering, setErrorRegistering] = useState<string>('')

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setErrorRegistering('')
      const locale = router.locale ?? 'en'
      console.log(locale)
      const { user, errorMsg } = await signup(
        data.email,
        data.password1,
        locale
      )
      if (errorMsg) {
        setErrorRegistering(errorMsg)
      } else {
        router.push('/')
        await FirestoreService.addToUsers({ email: data.email, api: '' })
      }
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(watch('email'))

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
              required
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
            <label htmlFor="password1">{t('password')}</label>
            <input
              required
              type="password"
              placeholder={t('enter-password')}
              {...register('password1', { required: true })}
              name="password1"
              id="password1"
            />
            {errors.password1 && <span>{t('field')}</span>}
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="password1">{t('password')}</label>
            <input
              required
              type="password"
              placeholder={t('confirm-password')}
              {...register('password2', { required: true })}
              name="password2"
              id="password2"
            />
            {errors.password2 && <span>{t('field')}</span>}
          </div>

          <div className={errorRegistering && styles.errors}>
            <div className={styles.errorMsg}>{errorRegistering}</div>
          </div>

          <div className={styles.inputBlock}>
            <div className={styles.buttonRegister}>
              <input type="submit" value={t('register')} />
              <Link href="/connect">
                <a className={styles.connect}>Already have an account?</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'register',
          'nav',
          'footer',
        ])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default withPublic(Register)
