import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import ComputationsSaved from '../components/ComputationsSaved'
import Developpers from '../components/Developpers'
import useAuth from '../src/hooks/auth'
import { withProtected } from '../src/hooks/route'
import styles from '../styles/Account.module.scss'

const Account = () => {
  const [selected, setSelected] = useState('account')
  const { t } = useTranslation('account')

  return (
    <div className={styles.container}>
      <div className={styles.columnLeft}>
        <div
          className={`${styles.menuOptions} ${
            selected == 'account' && styles.embolden
          }`}
          onClick={e => setSelected('account')}
        >
          {t('account-info')}
        </div>
        <div
          className={`${styles.menuOptions} ${
            selected == 'computations' ? styles.embolden : ''
          }`}
          onClick={e => setSelected('computations')}
        >
          Computations saved
        </div>
        <div
          className={`${styles.menuOptions} ${
            selected == 'developpers' ? styles.embolden : ''
          }`}
          onClick={e => setSelected('developpers')}
        >
          Developpers
        </div>
      </div>
      <div className={styles.mainComponent}>
        {(selected === 'account' && <AccountInfo />) ||
          (selected === 'computations' && <ComputationsSaved />) ||
          (selected === 'developpers' && <Developpers />)}
      </div>
    </div>
  )
}

export default withProtected(Account)
