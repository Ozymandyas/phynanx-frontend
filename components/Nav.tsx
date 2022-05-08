import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../src/hooks/auth'
import styles from '../styles/Nav.module.scss'
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

import en from '../public/locales/en/nav.json'
import fr from '../public/locales/fr/nav.json'
import { useRouter } from 'next/router'
import { useCurrentWidth } from '../hooks/useCurrentWidth'

const Nav = () => {
  const { locale } = useRouter()

  // equivalent of t function from useTranslation() which is not working
  // in this nested layout
  const t = (key: string) => {
    if (locale == 'en') {
      return en[key as keyof typeof en]
    } else if (locale == 'fr') {
      return fr[key as keyof typeof fr]
    }
  }

  const { user, logout } = useAuth()
  // the top modal of navbar showing account information
  const [modal, setModal] = useState(false)
  // the fa book on documentation
  const [book, setBook] = useState(false)
  // the arrows turning on computations
  const [arrows, setArrows] = useState(false)
  // the right navbar for small viewports
  const [rightMenu, setRightMenu] = useState(false)

  // to solve an issue (needs more explanation)
  const nbRendersBook = useRef(0)
  const nbRendersArrows = useRef(0)

  //hook to retrive page width client side
  const width = useCurrentWidth()

  useEffect(() => {
    setRightMenu(false)
    setModal(false)
  }, [width])

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
          bookRef.style.transform = ''
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
          bookRef.style.transform = 'rotate(90deg)'
          bookRef.style.transform += 'translate(-8px)'
          bookRef.style.transform += 'translateY(-8px)'
        } else {
          bookRef.style.color = 'lightgray'
          bookRef.style.transform = ''
        }
      }
    }
  }, [arrows])

  return (
    <>
      <div className={`${rightMenu ? styles.rightMenu : styles.hidden}`}>
        <div className={styles.items}>
          <div className={styles.itemInput}>
            <input type="text" placeholder={t('search-placeholder')} />
            <div className={styles.bgSearchRightMenu}>
              <FontAwesomeIcon
                icon={faSearch}
                className={styles.faSearchRightMenu}
              />
            </div>
          </div>
          <div className={styles.item} onClick={() => setRightMenu(false)}>
            {user ? (
              <div className={styles.accountConnectedRightMenu}>
                <Link href="/account">
                  <a>{t('my-account')}</a>
                </Link>
                <span style={{ color: 'white' }}> | </span>
                <a>{t('logout')}</a>
              </div>
            ) : (
              <div className={styles.accountRightMenu}>
                <span>
                  <Link href="/connect">{t('connect')}</Link>
                </span>
                <span style={{ color: 'white' }}> | </span>
                <span>
                  <Link href="/register">{t('register')}</Link>
                </span>
              </div>
            )}
          </div>
          <div className={styles.item} onClick={() => setRightMenu(false)}>
            <Link href="/docs">
              <a>{t('documentation')}</a>
            </Link>
          </div>
          <div className={styles.item} onClick={() => setRightMenu(false)}>
            <Link href="/computations">
              <a>{t('computations')}</a>
            </Link>
          </div>
        </div>
      </div>
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
              {t('computations')}
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
                placeholder={t('search-placeholder')}
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
                {user !== undefined && <a>{t('parameters')}</a>}
              </div>
              <div className={styles.myAccount}>
                {user !== undefined && (
                  <a onClick={() => setModal(!modal)}>{t('my-account')}</a>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.blockAccount}>
              <div
                className={`${styles.connect} ${
                  user === undefined ? styles.skeleton : ''
                }`}
              >
                {user !== undefined && (
                  <Link href="/connect">
                    <a>{t('connect')}</a>
                  </Link>
                )}
              </div>
              <div
                className={`${styles.register} ${
                  user === undefined ? styles.skeleton : ''
                }`}
              >
                {user !== undefined && (
                  <Link href="/register">
                    <a>{t('register')}</a>
                  </Link>
                )}
              </div>
            </div>
          )}
          <div className={styles.smallScreenMenu}>
            <FontAwesomeIcon
              icon={faBars}
              className={styles.faBars}
              onClick={e => setRightMenu(!rightMenu)}
            />
          </div>
        </div>

        <div className={modal ? styles.account : styles.accountHidden}>
          <div
            onClick={() => {
              setModal(!modal)
            }}
          >
            <div className={styles.email}>
              {user?.email.split('@')[0].slice(0, 18)}
            </div>
            <div className={styles.language}>
              {t('language')}: {locale?.toUpperCase()}
            </div>
          </div>
          <div
            onClick={() => {
              setModal(!modal)
            }}
            className={styles.manage}
          >
            <Link href="/account">
              <a>{t('manage')}</a>
            </Link>
          </div>
          <div
            onClick={() => {
              logout()
              setModal(!modal)
            }}
            className={styles.logout}
          >
            <a>{t('logout')}</a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
