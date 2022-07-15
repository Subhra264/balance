import React from 'react'

interface ILayoutContext {
  search: string
}

export const LayoutContext = React.createContext<ILayoutContext>({
  search: ''
})