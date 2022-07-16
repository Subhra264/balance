import React from 'react'

interface ILayoutContext {
  search: string
  currentAccount: string,
  connectWallet?: () => void,
  ethereum?: any
}

export const LayoutContext = React.createContext<ILayoutContext>({
  search: '',
  currentAccount: ''
})