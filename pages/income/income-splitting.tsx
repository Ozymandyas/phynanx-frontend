import Cookies from 'js-cookie'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRef } from 'react'

const calculParts = () => {
  const computeParts = async (e: any) => {
    e.preventDefault()
    Cookies.set('user', 'public', { sameSite: 'strict' })
    const res = await fetch('http://localhost:8080/api/v1/income-splitting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        situationMaritale: 'celibataire',
        enfantsGardeTotale: parseInt(e.target[0].value),
      }),
    })
    const jsonResponse = await res.json()
    console.log(jsonResponse)
  }

  return (
    <div>
      <form onSubmit={computeParts}>
        <input type="text" />
        <input type="submit" />
      </form>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['nav', 'footer'])),
        // Will be passed to the page component as props
      },
    }
  } else {
    return {
      props: {},
    }
  }
}

export default calculParts
