import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../src/hooks/auth'
import FirestoreService from '../src/services/FirestoreService'
import styles from '../styles/Register.module.scss'

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
      const { user, errorMsg } = await signup(data.email, data.password1)
      if (errorMsg) {
        setErrorRegistering(errorMsg)
      } else {
        await FirestoreService.addToUsers({ email: data.email, api: [] })
        router.push('/')
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
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['register'])),
      // Will be passed to the page component as props
    },
  }
}

export default Register
