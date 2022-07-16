import React, { Component, useEffect, useState } from 'react'
import { LayoutContext } from '../utils/contexts'
import Header from './Header'
import detectEthereumProvider from "@metamask/detect-provider";

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const [search, setSearch] = useState('')
  const [provider, setProvider] = useState<any>(null)
  const [currentAccount, setCurrentAccount] = useState('')

  useEffect(() => {
    async function setEthereumProvider() {
      const ethereumProvider: any = await detectEthereumProvider()

      if (!ethereumProvider) return
      setProvider(ethereumProvider)

      const accounts = await ethereumProvider.request({
        method: "eth_accounts"
      })
      console.log('Accounts', accounts)

      if (accounts.length) setCurrentAccount(accounts[0])
    }

    setEthereumProvider()
  }, [])

  const connectWallet = async () => {
    if (!provider) return alert('Install Metamask first!')
    
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    })
    console.log('connectWallet accounts', accounts)
    if (accounts[0]) setCurrentAccount(accounts[0])
  }

  return (
    <div className='layout'>
      <LayoutContext.Provider value={{ search, currentAccount, connectWallet }}>
        <Header setSearch={setSearch} />
        {children}
      </LayoutContext.Provider>
    </div>
  )
}

export default Layout