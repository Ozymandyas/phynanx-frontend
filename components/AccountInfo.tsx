import useAuth from '../src/hooks/auth'

const AccountInfo = () => {
  const { user } = useAuth()

  return (
    <div>
      <div>
        <div>Adresse e-mail</div>
        {user && user.email}
        <div>Compte vérifié</div>
        {user && user.emailVerified.toString()}
      </div>
      <div>
        <div>Changer d&apos;adresse e-mail</div>
        <div>Changer de mot de passe</div>
        <div>Supprimer mon compte</div>
      </div>
    </div>
  )
}

export default AccountInfo
