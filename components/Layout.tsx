import React, { Component, useState } from 'react';
import { LayoutContext } from '../utils/contexts';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  const [search, setSearch] = useState('')

  return (
    <div className='layout'>
      <Header setSearch={setSearch} />
      <LayoutContext.Provider value={{ search }}>
        {children}
      </LayoutContext.Provider>
    </div>
  )
}

export default Layout