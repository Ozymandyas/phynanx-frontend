import { User } from 'firebase/auth'
import { useEffect } from 'react'
import useAuth from '../hooks/auth'
import AuthService from '../services/AuthService'

export default function AuthStateChanged({ children }: any) {
  const { setUser } = useAuth()
  console.log('AuthStateChanged useAuth')

  useEffect(() => {
    console.log(AuthService.auth.currentUser)
    const unsubscribe = AuthService.waitForUser((userCred: User) => {
      console.log('test', AuthService.auth.currentUser)
      console.log('AuthStateChanged')
      setUser(userCred)
    })
    return () => unsubscribe()
    //eslint-disable-next-line
  }, [])
  // if (loading) {
  //   return <h1>Loading</h1>
  // }
  return children
}
