import Cookies from 'js-cookie'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import AuthService from '../services/AuthService'
import { ContextInterface } from '../interfaces/ContextInterface'
import { User } from 'firebase/auth'
import { useTranslation } from 'next-i18next'

export const authContext = createContext<ContextInterface>({
  user: null,
  error: null,
  loginWithGoogle: null,
  logout: null,
  setUser: null,
  signin: null,
  signup: null,
  verifyEmail: null,
  deleteUser: null,
  changeEmail: null,
})

export default function useAuth() {
  return useContext(authContext)
}

// PropsWithChildren<{}>

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(undefined)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = AuthService.waitForUser((userCred: User) => {
      setUser(userCred)
    })
    return () => unsubscribe()
    //eslint-disable-next-line
  }, [])

  const loginWithGoogle = async () => {
    const { user, error } = {
      user: null,
      error: null,
      ...(await AuthService.loginWithGoogle()),
    }
    setUser(user ?? null)
    setError(error)
  }

  const signin = async (email: string, password: string) => {
    const { user, error } = {
      user: null,
      error: null,
      ...(await AuthService.signin(email, password)),
    }
    let errorMsg = null
    if (error) {
      switch (error) {
        case 'auth/wrong-password':
          errorMsg = 'Identifiants incorrects'
          break
        case 'auth/user-not-found':
          errorMsg = 'Identifiants incorrects'
          break
        case 'auth/user-disabled':
          errorMsg = 'Votre compte a été désactivé. Contactez un administrateur'
          break
        case 'auth/operation-not-allowed':
          errorMsg = "Une erreur s'est produite"
          break
      }
    }
    setUser(user ?? null)
    setError(error)
    return { user, errorMsg }
  }

  const signup = async (email: string, password: string) => {
    const { user, error } = {
      user: null,
      error: null,
      ...(await AuthService.signup(email, password)),
    }
    let errorMsg = null
    if (error) {
      switch (error) {
        case 'auth/weak-password':
          errorMsg = 'Le mot de passe doit contenir plus de 6 caractères'
          break
        case 'auth/email-already-in-use':
          errorMsg = 'Cette adresse e-mail est déjà utilisée !'
          break
        case 'auth/invalid-email':
          errorMsg = "Cette adresse e-mail n'est pas valide"
          break
        case 'auth/operation-not-allowed':
          errorMsg = "Une erreur s'est produite !"
          break
      }
    }
    return { user, errorMsg }
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  const verifyEmail = async () => {
    const { uid, error } = {
      uid: null,
      error: null,
      ...(await AuthService.verifyEmail()),
    }
    return { uid, error }
  }

  const deleteUser = async () => {
    const { uid, error } = {
      uid: null,
      error: null,
      ...(await AuthService.deleteUser()),
    }
    return { uid, error }
  }

  const changeEmail = async (email: string) => {
    const { oldEmail, newEmail, error } = {
      oldEmail: null,
      newEmail: null,
      error: null,
      ...(await AuthService.changeEmail(email)),
    }
    return { oldEmail, newEmail, error }
  }

  const value = {
    user,
    error,
    loginWithGoogle,
    setUser,
    signup,
    logout,
    signin,
    verifyEmail,
    deleteUser,
    changeEmail,
  }
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
