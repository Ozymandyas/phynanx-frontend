import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../src/hooks/auth'
import styles from '../styles/AccountInfo.module.scss'

type EmailInputs = {
  oldEmail: string
  newEmail: string
  password: string
}

type PasswordInputs = {
  oldPassword: string
  newPassword1: string
  newPassword2: string
}

type DeleteInput = {
  delete: string
  password: string
}

const AccountInfo = () => {
  const { user, verifyEmail, deleteUser, changeEmail, changePassword, signin } =
    useAuth()
  const router = useRouter()
  const locale = router.locale ?? 'en'

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
    reset: resetEmail,
  } = useForm<EmailInputs>()

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm<PasswordInputs>()

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete },
    reset: resetDelete,
  } = useForm<DeleteInput>()

  const { t } = useTranslation('account')
  console.log(useTranslation('account'))

  const submitChangeEmail: SubmitHandler<EmailInputs> = async data => {
    try {
      if (data.oldEmail === user.email) {
        const reloadedUser = await signin(user.email, data.password, locale)
        if (reloadedUser.user) {
          const newEmail = await changeEmail(data.newEmail)
          resetEmail()
          return { newEmail: newEmail.newEmail }
        } else {
          return { error: 'wrong-password' }
        }
      } else {
        return { error: 'wrong-old-email' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const submitChangePassword: SubmitHandler<PasswordInputs> = async data => {
    try {
      const reloadedUser = await signin(user.email, data.oldPassword, locale)
      if (reloadedUser.user) {
        await changePassword(data.newPassword1)
        resetPassword()
      } else {
        return { error: 'wrong password' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const submitDelete: SubmitHandler<DeleteInput> = async data => {
    try {
      const reloadedUser = await signin(user.email, data.password, locale)
      if (reloadedUser.user) {
        if (data.delete === 'DELETE') {
          await deleteUser()
          resetDelete()
          router.push('/')
        } else {
          return { error: 'wrong-delete' }
        }
      } else {
        return { error: 'wrong-password' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <h3>{t('account-info')}</h3>
        <div>
          {t('email')}: {user && user.email}
        </div>

        <div>
          {t('account-verified')}: {user && user.emailVerified.toString()}
        </div>
      </div>
      <div className={styles.accountChanges}>
        {!user.emailVerified && (
          <div className={styles.verifyEmail}>
            <h3>{t('verify-email')}</h3>
            <button onClick={() => verifyEmail()}>{t('send-email')}</button>
          </div>
        )}

        <form onSubmit={handleSubmitEmail(submitChangeEmail)}>
          <h3>{t('change-email')}</h3>
          <div>
            <label htmlFor="oldEmail">{t('current-email')}</label>
            <input
              required
              type="email"
              placeholder={t('enter-current-email')}
              {...registerEmail('oldEmail', { required: true })}
              name="oldEmail"
              id="oldEmail"
            />
            {errorsEmail.oldEmail && <span>{t('field')}</span>}
          </div>
          <div>
            <label htmlFor="newEmail">{t('new-email')}</label>
            <input
              required
              type="email"
              placeholder={t('enter-new-email')}
              {...registerEmail('newEmail', { required: true })}
              name="newEmail"
              id="newEmail"
            />
            {errorsEmail.newEmail && <span>{t('field')}</span>}
          </div>

          <div>
            <label htmlFor="password">{t('password')}</label>
            <input
              required
              type="password"
              placeholder={t('enter-password')}
              {...registerEmail('password', { required: true })}
              name="password"
              id="password"
            />
            {errorsEmail.password && <span>{t('field')}</span>}
          </div>

          <input type="submit" value={t('confirm')} />
        </form>

        <form onSubmit={handleSubmitPassword(submitChangePassword)}>
          <h3>{t('change-password')}</h3>
          <div>
            <label htmlFor="oldPassword">{t('current-password')}</label>
            <input
              required
              type="password"
              placeholder={t('enter-password')}
              {...registerPassword('oldPassword', { required: true })}
              name="oldPassword"
              id="oldPassword"
            />
            {errorsPassword.oldPassword && <span>{t('field')}</span>}
          </div>

          <div>
            <label htmlFor="new-password">{t('new-password')}</label>
            <input
              required
              type="password"
              placeholder={t('enter-new-password')}
              {...registerPassword('newPassword1', { required: true })}
              id="new-password"
            />
            {errorsPassword.newPassword1 && <span>{t('field')}</span>}
          </div>

          <div>
            <label htmlFor="new-password2">{t('repeat-password')}</label>
            <input
              required
              type="password"
              placeholder={t('repeat-password')}
              {...registerPassword('newPassword2', { required: true })}
              id="new-password2"
            />
            {errorsPassword.newPassword2 && <span>{t('field')}</span>}
          </div>

          <input type="submit" value={t('confirm')} />
        </form>

        <form onSubmit={handleSubmitDelete(submitDelete)}>
          <h3>{t('delete-account')}</h3>
          <p>Cette action est immédiate et irréversible.</p>
          <p>
            Pour supprimer votre compte, vous devez entrer DELETE ci-dessous
          </p>

          <div>
            <label htmlFor="delete">Delete word</label>
            <input
              required
              type="text"
              placeholder={t('delete')}
              {...registerDelete('delete', { required: true })}
              id="delete"
            />
            {errorsDelete.delete && <span>{t('field')}</span>}
          </div>
          <div>
            <label htmlFor="current-password">{t('password')}</label>
            <input
              required
              type="password"
              placeholder={t('enter-password')}
              {...registerDelete('password', { required: true })}
              name="password"
              id="current-password"
            />
            {errorsEmail.password && <span>{t('field')}</span>}
          </div>

          <input type="submit" value={t('delete-account')} />
        </form>
      </div>
    </div>
  )
}

export default AccountInfo
