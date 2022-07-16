import React, { useEffect, useState } from 'react'
import { LayoutContext } from '../utils/contexts'
import Header from './Header'
import detectEthereumProvider from "@metamask/detect-provider";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const [search, setSearch] = useState('')
  const [ethereum, setEthereum] = useState<any>(null)
  const [currentAccount, setCurrentAccount] = useState('')

  useEffect(() => {
    async function setEthereumProvider() {
      const ethereum_: any = await detectEthereumProvider()

      if (!ethereum_) return
      setEthereum(ethereum_)

      const accounts = await ethereum_.request({
        method: "eth_accounts"
      })

      if (accounts.length) setCurrentAccount(accounts[0])
    }

    setEthereumProvider()
  }, [])

  const connectWallet = async () => {
    if (!ethereum) return alert('Install Metamask first!')
    
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    })
    if (accounts[0]) setCurrentAccount(accounts[0])
  }

  return (
    <div className='layout'>
      <LayoutContext.Provider value={{ search, currentAccount, connectWallet, ethereum }}>
        <Header setSearch={setSearch} />
        {children}
      </LayoutContext.Provider>
    </div>
  )
}

export default Layout