import React from 'react'

interface ILayoutContext {
  search: string
  currentAddress: string
  currentBalance: number
  connectWallet?: () => void
  ethereum?: any
  updateBalance: (newHexBalance: string) => void
  checkingWalletConnection: boolean;
}

export const LayoutContext = React.createContext<ILayoutContext>({
  search: '',
  currentAddress: '',
  currentBalance: 0,
  updateBalance: () => {},
  checkingWalletConnection: true
})