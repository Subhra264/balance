import { styled } from '@mui/material/styles'
import { useState } from 'react'
import NetworkSelect from './NetworkSelect'
import Transactions from './Transactions'

interface DataTableContainerProps {
  address: string
}

const DataTableWrapper = styled('div')(({theme}) => ({
  borderRadius: 10,
  background: '#fff'
}))

const DataTableContainer: React.FC<DataTableContainerProps> = ({ address }) => {

  return (
    <DataTableWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', padding: '1rem'}}>
          Transactions
        </div>
        <div></div>
      </div>
      <Transactions address={address}/>
    </DataTableWrapper>
  )
}

export default DataTableContainer