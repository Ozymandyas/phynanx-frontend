import { getApp } from 'firebase/app'
import { getIdToken } from 'firebase/auth'
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import AuthService from './AuthService'

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class FirestoreService {
  db: Firestore
  constructor(firebaseApp: any) {
    this.db = db
  }
  async addToUsers({ email, api }: { email: string; api: string }) {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), { email, api })
      return docRef
    } catch (error) {
      return error
    }
  }
  async addApiKey(email: string) {
    try {
      const user = AuthService.auth.currentUser
      const token = user ? await getIdToken(user, true) : ''
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer ${token}`)
      console.log('BEGIN AUTHSERVICE')
      const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}generator`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email }),
      })
      console.log('END AUTHSERVICE')
      const apiKeys = await response.json()
      return apiKeys.apiKeyUnhashed
    } catch (error) {
      console.log(error)
    }
  }

  async checkIfApiKey(email: string) {
    try {
      const q = query(collection(this.db, 'users'), where('email', '==', email))
      const querySnapshot = await getDocs(q)
      const { api } = querySnapshot.docs[0].data()
      if (api === '') {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log(error)
    }
  }

  async checkUsage(email: string) {
    try {
      const q = query(collection(this.db, 'users'), where('email', '==', email))
      const querySnapshot = await getDocs(q)
      const { apiUsage } = querySnapshot.docs[0].data()
      return apiUsage
    } catch (error) {
      console.log(error)
    }
  }
}

export default new FirestoreService(getApp())
