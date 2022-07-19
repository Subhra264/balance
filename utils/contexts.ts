import React from 'react'
import Network from './networks'

interface ILayoutContext {
  search: string
  currentAddress: string
  currentBalance: number
  connectWallet?: () => void
  ethereum?: any
  updateBalance: (newHexBalance: string) => void
  checkingWalletConnection: boolean
  selectedNetwork: Network
}

export const LayoutContext = React.createContext<ILayoutContext>({
  search: '',
  currentAddress: '',
  currentBalance: 0,
  updateBalance: () => {},
  checkingWalletConnection: true,
  selectedNetwork: Network.RINKEBY
})