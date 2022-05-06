import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../src/hooks/auth'
import styles from '../styles/Nav.module.css'
import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faAnglesRight,
  faSearch,
  faBars,
} from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'next-i18next'

const Nav = () => {
  const { t } = useTranslation('nav')

  const { user, logout } = useAuth()
  const [modal, showModal] = useState(false)
  const [book, setBook] = useState(false)
  const [arrows, setArrows] = useState(false)
  const nbRendersBook = useRef(0)
  const nbRendersArrows = useRef(0)

  useEffect(() => {
    if (nbRendersBook.current < 2) {
      nbRendersBook.current += 1
    } else {
      const bookRef = document.getElementById('faBook')
      if (bookRef) {
        if (book) {
          bookRef.style.color = 'white'
        } else {
          bookRef.style.color = 'lightgray'
        }
      }
    }
  }, [book])

  useEffect(() => {
    if (nbRendersArrows.current < 2) {
      nbRendersArrows.current += 1
    } else {
      const bookRef = document.getElementById('faAnglesRight')
      if (bookRef) {
        if (arrows) {
          bookRef.style.color = 'white'
        } else {
          bookRef.style.color = 'lightgray'
        }
      }
    }
  }, [arrows])

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navbar}>
        <div className={styles.title}>
          <Link href="/">
            <a>Phynanx</a>
          </Link>
        </div>
        <div className={styles.central}>
          <div
            className={styles.calculateurs}
            onMouseEnter={() => setArrows(true)}
            onMouseLeave={() => setArrows(false)}
          >
            Calculateurs <span className={styles.fiscaux}>fiscaux</span>
            <FontAwesomeIcon
              icon={faAnglesRight}
              className={styles.faAnglesRight}
              id="faAnglesRight"
            />
          </div>
          <div className={styles.blockSearch}>
            <input
              type="text"
              className={styles.inputSearch}
              placeholder="Recherche..."
            />
            <div className={styles.bgSearch}>
              <FontAwesomeIcon icon={faSearch} className={styles.faSearch} />
            </div>
          </div>
        </div>
        <div className={styles.documentationContainer}>
          <Link href="/docs">
            <div
              className={styles.documentation}
              onMouseEnter={() => setBook(true)}
              onMouseLeave={() => setBook(false)}
            >
              Doc<span className={styles.umentation}>umentation</span>
              <FontAwesomeIcon
                icon={faBook}
                className={styles.faBook}
                id="faBook"
              />
            </div>
          </Link>
        </div>

        {user ? (
          <div className={styles.blockAccount}>
            <div className={styles.parameters}>
              <a>{t('parameters')}</a>
            </div>
            <div className={styles.email}>
              <a onClick={() => showModal(!modal)}>{t('account')}</a>
            </div>
          </div>
        ) : (
          <div className={styles.blockAccount}>
            <div className={styles.connect}>
              <Link href="/connect">
                <a>{t('connect')}</a>
              </Link>
            </div>
            <div className={styles.register}>
              <Link href="/register">
                <a>{t('account')}</a>
              </Link>
            </div>
          </div>
        )}
        <div className={styles.smallScreenMenu}>
          <FontAwesomeIcon icon={faBars} className={styles.faBars} />
        </div>
      </div>

      <div className={modal ? styles.account : styles.accountHidden}>
        <div
          onClick={() => {
            showModal(!modal)
          }}
        >
          <a>Language: FR</a>
        </div>
        <div
          onClick={() => {
            showModal(!modal)
          }}
        >
          <Link href="/account">
            <a>Manage your account</a>
          </Link>
        </div>
        <div
          onClick={() => {
            logout()
            showModal(!modal)
          }}
        >
          <a>Déconnexion</a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
