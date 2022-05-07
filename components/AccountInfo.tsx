import { useForm } from 'react-hook-form'
import useAuth from '../src/hooks/auth'

const AccountInfo = () => {
  const { user } = useAuth()
  const { register } = useForm()

  return (
    <div>
      <div>
        <div>Adresse e-mail</div>
        {user && user.email}
        <div>Compte vérifié</div>
        {user && user.emailVerified.toString()}
      </div>
      <div>
        <div>Vérifier mon adresse e-mail</div>
        <button>Envoyer un e-mail de vérification</button>
        <div>Changer d&apos;adresse e-mail</div>
        <label htmlFor="">Ancien e-mail</label>
        <input type="email" />
        <label htmlFor="">Nouvel e-mail</label>
        <input type="email" />
        <div>Changer de mot de passe</div>
        <label htmlFor="">Ancien mot de passe</label>
        <input type="password" />
        <label htmlFor="">Nouveau mot de passe</label>
        <input type="password" />
        <label htmlFor="">Répétez le nouveau mot de passe</label>
        <input type="password" />
        <div>Supprimer mon compte</div>
        <input type="text" />
      </div>
    </div>
  )
}

export default AccountInfo
