import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type Unsubscribe,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { firebaseAuth } from './firebase'

export interface AuthCredentials {
  email: string
  password: string
}

export const authService = {
  signIn(credentials: AuthCredentials): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password,
    )
  },

  signUp(credentials: AuthCredentials): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      firebaseAuth,
      credentials.email,
      credentials.password,
    )
  },

  signOut(): Promise<void> {
    return firebaseSignOut(firebaseAuth)
  },

  observeAuthState(onChange: (user: User | null) => void): Unsubscribe {
    return onAuthStateChanged(firebaseAuth, onChange)
  },
}
