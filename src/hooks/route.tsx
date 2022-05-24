import useAuth from './auth'
import styles from '../../styles/Route.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    const auth = useAuth()
    const router = useRouter()
    const user = auth.user
    useEffect(() => {
      if (user) {
        router.replace('/')
      }
    }, [user, router])
    if (user === null) {
      return <Component auth={auth} {...props} />
    } else if (user === undefined) {
      return (
        <div className={styles.container}>
          <div className={styles.spinner}>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    }
  }
}

export function withProtected(Component: any) {
  return function WithProtected(props: any) {
    const router = useRouter()
    const auth = useAuth()
    const user = auth.user

    useEffect(() => {
      if (user === null) {
        router.replace('/')
      }
    }, [user, router])

    if (!user) {
      return (
        <div className={styles.container}>
          <div className={styles.spinner}>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    }
    return <Component auth={auth} {...props} />
  }
}
