import useAuth from './auth'
import styles from '../../styles/Route.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    const auth = useAuth()
    // const router = useRouter()
    if (auth.user) {
      // router.replace('/')
      return <h1>Loading</h1>
    }
    return <Component auth={auth} {...props} />
  }
}

export function withProtected(Component: any) {
  return function WithProtected(props: any) {
    const router = useRouter()
    const auth = useAuth()
    const user = auth.user
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (user === null) {
        router.replace('/')
      }
    }, [user])

    if (!auth.user) {
      return (
        <div className={styles.container}>
          <div className={styles.spinner}>
            <div></div>
            <div></div>
          </div>
          <div className={styles.bouncer}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.square}>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    }
    return <Component auth={auth} {...props} />
  }
}
