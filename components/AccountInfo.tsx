import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import useAuth from '../src/hooks/auth'
import styles from '../styles/AccountInfo.module.scss'

const AccountInfo = () => {
  const { user, verifyEmail } = useAuth()
  const { register } = useForm()
  const { t } = useTranslation('account')

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <span>{t('account-info')}</span>
        <div>{t('email')}</div>
        {user && user.email}
        <div>{t('account-verified')}</div>
        {user && user.emailVerified.toString()}
      </div>
      <div className={styles.accountChanges}>
        <form action="">
          <div>Vérifier mon adresse e-mail</div>
          <button onClick={() => verifyEmail()}>
            Envoyer un e-mail de vérification
          </button>
          <div>Changer d&apos;adresse e-mail</div>
          <label htmlFor="">Ancienne adresse e-mail</label>
          <input
            type="email"
            placeholder="Entrez votre ancienne adresse e-mail"
          />
          <label htmlFor="">Nouvelle adresse e-mail</label>
          <input
            type="email"
            placeholder="Saisissez votre nouvelle adresse e-mail"
          />
          <input type="submit" value="Confirmer" />
        </form>
        <form action="">
          <div>Changer de mot de passe</div>
          <label htmlFor="">Ancien mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre ancien mot de passe"
          />
          <label htmlFor="">Nouveau mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre nouveau mot de passe"
          />
          <label htmlFor="">Répétez le nouveau mot de passe</label>
          <input
            type="password"
            placeholder="Répétez le nouveau mot de passe"
          />
          <input type="submit" value="Confirmer" />
        </form>
        <form action="">
          <div>Supprimer mon compte</div>
          <p>Cette action est immédiate et irréversible.</p>
          <p>
            Pour supprimer votre compte, vous devez entrer DELETE ci-dessous
          </p>
          <input type="text" placeholder="Confirmez la suppression du compte" />
          <input type="submit" value="Supprimer mon compte" />
        </form>
      </div>
    </div>
  )
}

export default AccountInfo
