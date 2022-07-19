import { NextPage } from 'next'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import styles from '../../styles/Me.module.css'
import { LayoutContext } from '../../utils/contexts'
import DataTableContainer from '../../components/DataTableContainer'
import TransferEther from '../../components/TransferEther'
import { queryBalance } from '../../libs/graphQLQuery'
import { networks } from '../../components/NetworkSelect'

const Account: NextPage = () => {
  const router = useRouter()
  const {
    currentAddress,
    checkingWalletConnection,
    selectedNetwork
  } = useContext(LayoutContext)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const address = router.query.address as string

  useEffect(() => {
    if (!checkingWalletConnection) {
      if (address === currentAddress) {
        Router.push('/me')
      } else {
        const fetchAPI = async () => {
          const network = networks[selectedNetwork].etherscanAPI
          const { query, resultField } = queryBalance(network)
  
          const res = await fetch('/api/hello', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query,
              variables: {
                address
              }
            })
          })
  
          const result = await res.json()
          console.log('Balance result', result)
          const balance_ = Number(result.data.data[resultField].result)
          setBalance(balance_ / 10 ** 18)
          setLoading(false)
        }
  
        fetchAPI()
      }
    } 
  }, [address, currentAddress, checkingWalletConnection, selectedNetwork])

  return (
    <div>
      <Head>
        <title>Address - { address }</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '2rem' }}>
        {
          checkingWalletConnection?
            <CircularProgress />
          :
            address && <>
              <div>
                <h2>Account: {address}</h2>
                <div>
                  <b>Balance:</b>
                  {loading? <CircularProgress/> : ` ${balance} Eth`}
                </div>
              </div>
              <div className={styles.sectionsContainer}>
                <div className={styles.leftSection}>
                  <div className={styles.transactionFormContainer}>
                    <TransferEther to={address}/>
                  </div>
                </div>
                <div className={styles.rightSection}>
                  <DataTableContainer address={address} />
                </div>
              </div>
            </>
        }
      </main>
    </div>
  )
}

export default Account