import React from 'react'

interface ILayoutContext {
  search: string
  currentAccount: string,
  connectWallet?: () => void
}

export const LayoutContext = React.createContext<ILayoutContext>({
  search: '',
  currentAccount: ''
})