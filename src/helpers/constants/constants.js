import firebase_app from '@/firebase/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const auth = getAuth(firebase_app)
export const db = getFirestore(firebase_app)
