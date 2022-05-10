import { User } from 'firebase/auth'

export interface ContextInterface {
  user: any
  error: any
  loginWithGoogle: any
  logout: () => Promise<void>
  setUser: any
  signin(
    email: string,
    password: string
  ): Promise<{
    user: User | null
    errorMsg: string | null
  }>
  signup: (
    email: string,
    password: string
  ) => Promise<{
    user: User | null
    errorMsg: string | null
  }>
  verifyEmail: () => Promise<{
    uid: string | null
    error: unknown
  }>
  deleteUser(): Promise<{
    uid: string | null
    error: unknown
  }>
  changeEmail(email: string): Promise<{
    oldEmail: string | null
    newEmail: string | null
    error: unknown
  }>
}
