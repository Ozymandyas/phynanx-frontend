import { FirebaseError, getApp } from 'firebase/app'
import {
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  updateEmail,
  sendEmailVerification,
  updatePassword,
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
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
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
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
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
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
      }
    }
  }

  async logout() {
    try {
      await signOut(this.auth)
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
      }
    }
  }

  async verifyEmail() {
    const user = this.auth.currentUser
    console.log(user)
    try {
      if (user) {
        await sendEmailVerification(user)
        return { uid: user.uid }
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
      }
    }
  }

  async deleteUser() {
    const user = this.auth.currentUser
    try {
      if (user) {
        await deleteUser(user)
        return { uid: user.uid }
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
      }
    }
  }

  async changePassword(password: string) {
    const user = this.auth.currentUser
    try {
      if (user) {
        await updatePassword(user, password)
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
      }
    }
  }

  async changeEmail(email: string) {
    const user = this.auth.currentUser
    try {
      if (user) {
        await updateEmail(user, email)
        return { oldEmail: user.email, newEmail: email }
      } else {
        return { error: 'no user' }
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { error: error.code }
      } else {
        return { error }
      }
    }
  }
}

export default new AuthService(getApp())
