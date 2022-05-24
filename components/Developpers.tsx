import styles from '../styles/Developpers.module.scss'
import { useMemo, useRef, useState } from 'react'
import useAuth from '../src/hooks/auth'
import FirestoreService from '../src/services/FirestoreService'
import { User } from 'firebase/auth'
import { createPDFAPIKey } from '../src/services/PDFService'

const Developpers = () => {
  const { user }: { user: User } = useAuth()

  const [apiKey, setApiKey] = useState('')
  const [hasApiKey, setHasApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const inputTextRef = useRef<HTMLInputElement>(null)

  const generateAPIKey = async () => {
    setApiKey('Loading...')
    setCopied(false)
    try {
      if (user && user.email) {
        console.log('BEGIN LOADING')
        const apiKeyUnhashed = await FirestoreService.addApiKey(user.email)
        console.log('END LOADING')
        setApiKey(apiKeyUnhashed)
        setHasApiKey(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useMemo(async () => {
    if (user && user.email) {
      const hasApiKey = await FirestoreService.checkIfApiKey(user.email)
      setHasApiKey(hasApiKey === undefined ? false : hasApiKey)
    } else {
      setHasApiKey(false)
    }
    return true
  }, [user])

  const copyToClipboard = async () => {
    if (inputTextRef.current != null) {
      await navigator.clipboard.writeText(inputTextRef.current.value)
    }
    setCopied(true)
  }

  const downloadPDF = async () => {
    if (inputTextRef.current != null) {
      const element = document.createElement('a')
      const pdfUInt8Array = await createPDFAPIKey(inputTextRef.current.value)
      const file = new Blob([pdfUInt8Array], {
        type: 'application/pdf',
      })
      element.href = URL.createObjectURL(file)
      element.download = 'phynanx_api_key.pdf'
      document.body.appendChild(element)
      element.click()
    }
  }

  return (
    <>
      {hasApiKey && (
        <div className={styles.container}>
          <p>You already have an API Key created.</p>
          <p>
            If your API Key has been leaked or if you have lost it, you can
            generate a new API Key but it will delete the former one and you
            will not be able to access it anymore.
          </p>
        </div>
      )}
      <div className={styles.container}>
        <h1>API Key Generation</h1>
        <div className={styles.outputGeneration}>
          <label htmlFor="key">Generate Api Key</label>
          <input
            type="text"
            name="key"
            placeholder="API KEY"
            ref={inputTextRef}
            value={apiKey}
            disabled
          />
        </div>

        <button onClick={generateAPIKey}>Generate a new API Key</button>
        {apiKey !== 'Loading...' && apiKey !== '' && (
          <>
            <button onClick={copyToClipboard}>
              {copied ? 'Key copied!' : 'Copy to clipboard'}
            </button>
            <button onClick={downloadPDF}>Save as PDF</button>
          </>
        )}
      </div>
    </>
  )
}

export default Developpers
