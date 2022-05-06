import { getApp } from 'firebase/app'
import {
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../config/firebase'

class AuthService {
  auth: Auth
  constructor(firebaseApp: any) {
    this.auth = auth
  }
  waitForUser(callback: any) {
    return onAuthStateChanged(this.auth, userCred => {
      callback(userCred)
    })
  }

  async loginWithGoogle() {
    try {
      const userCred = await signInWithPopup(
        this.auth,
        new GoogleAuthProvider()
      )
      return {
        user: userCred.user,
      }
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  }

  async signin(email: string, password: string) {
    try {
      const userCred = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      )
      return userCred
    } catch (error: any) {
      return {
        error: error.code,
      }
    }
  }

  async signup(email: string, password: string) {
    try {
      const userCred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      )
      return userCred
    } catch (error: any) {
      console.log(error)
      return {
        error: error.code,
      }
    }
  }

  async logout() {
    await signOut(this.auth)
  }
}

export default new AuthService(getApp())
