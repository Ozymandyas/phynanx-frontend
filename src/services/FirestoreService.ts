import { getApp } from 'firebase/app'
import { getIdToken } from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
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
  async addToUsers(data: any) {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), data)
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
      const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}generator`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email }),
      })
      const apiKeys = await response.json()
      return apiKeys.apiKeyUnhashed
    } catch (error) {
      console.log(error)
    }
  }
}

export default new FirestoreService(getApp())
