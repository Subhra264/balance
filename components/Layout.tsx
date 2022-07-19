import React, { useEffect, useState } from 'react'
import { LayoutContext } from '../utils/contexts'
import Header from './Header'
import detectEthereumProvider from "@metamask/detect-provider";
import Network from '../utils/networks';

interface LayoutProps {
  children: React.ReactNode
}

interface CurrentAccount {
  address: string
  balance: number
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const [search, setSearch] = useState('')
  const [checkingWalletConnection, setCheckingWalletConnection] = useState(true)
  const [ethereum, setEthereum] = useState<any>(null)
  const [currentAccount, setCurrentAccount] = useState<CurrentAccount>({ 
    address: '',
    balance: 0
  })
  const [selectedNetwork, setSelectedNetwork] = useState(Network.RINKEBY)

  useEffect(() => {
    async function setEthereumProvider() {
      const ethereum_: any = await detectEthereumProvider()

      if (!ethereum_)
        return setCheckingWalletConnection(false)
      setEthereum(ethereum_)

      const accounts = await ethereum_.request({
        method: "eth_accounts"
      })
      
      if (accounts.length){
        const balance_ = await ethereum_.request({
          method: 'eth_getBalance',
          params: [
            accounts[0],
            'latest'
          ]
        })
        console.log('Balance:', balance_)
        const balance: number = Number(balance_) / 10 ** 18

        setCurrentAccount({ address: accounts[0], balance })
      }
      setCheckingWalletConnection(false)
    }
    
    setEthereumProvider()
  }, [])

  const connectWallet = async () => {
    if (checkingWalletConnection) return
    if (!ethereum) return alert('Install Metamask first!')

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    })

    if (accounts.length){
      const balance_ = await ethereum.request({
        method: 'eth_getBalance',
        params: [
          accounts[0],
          'latest'
        ]
      })
      const balance: number = Number(balance_) / 10 ** 18

      setCurrentAccount({ address: accounts[0], balance })
    }
  }

  const updateBalance = (newHexBalance: string) => {
    const newBalance = Number(newHexBalance) / 10 ** 18
    setCurrentAccount((oldAccount) => ({
      address: oldAccount.address,
      balance: newBalance
    }))
  }

  return (
    <div className='layout'>
      <LayoutContext.Provider
        value={{
          search,
          currentAddress: currentAccount.address,
          currentBalance: currentAccount.balance,
          connectWallet,
          updateBalance,
          ethereum,
          checkingWalletConnection,
          selectedNetwork
        }}
      >
        <Header
          setSearch={setSearch}
          setSelectedNetwork={setSelectedNetwork}
        />
        {children}
      </LayoutContext.Provider>
    </div>
  )
}

export default Layout