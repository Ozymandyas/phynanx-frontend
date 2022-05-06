import useAuth from './auth'

export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    console.log('withPublic')
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
    console.log('withProtected')

    const auth = useAuth()
    // const router = useRouter()
    // console.log(router)
    if (!auth.user) {
      // router.replace('/connect')
      return (
        <h1
          style={{ padding: '30px', fontSize: '1.2rem', textAlign: 'center' }}
        >
          Merci de vous connecter pour accéder à cette page.
        </h1>
      )
    }
    return <Component auth={auth} {...props} />
  }
}
