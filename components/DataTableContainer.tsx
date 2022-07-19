import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { SECONDARY_DARK } from '../utils/colors'
import NFTCardList from './NFTCardList'
import Transactions from './Transactions'

interface DataTableContainerProps {
  address: string
}

const DataTableWrapper = styled('div')(({theme}) => ({
  borderRadius: 10,
  background: '#fff'
}))

const TableType = styled('div')(({theme}) => ({
  fontSize: '1.1rem',
  padding: '1rem',
  color: '#222',
  cursor: 'pointer',
  margin: '0 0.7rem',
  '&:hover': {
    background: '#dfdfdf'
  }
}))

const DataTableContainer: React.FC<DataTableContainerProps> = ({ address }) => {
  const [showTransactions, setShowTransactions] = useState(true)

  return (
    <DataTableWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <TableType
          onClick={() => setShowTransactions(true)}
          style={{
            color: showTransactions? '#000' : '#444',
            fontWeight: showTransactions? 'bold' : 'normal'
          }}
        >
          Transactions
        </TableType>
        <TableType
          onClick={() => setShowTransactions(false)}
          style={{
            color: showTransactions? '#444' : '#000',
            fontWeight: showTransactions? 'normal' : 'bold'
          }}
        >
          NFTs
        </TableType>
      </div>
      {
        showTransactions?
          <Transactions address={address}/>
        :
          <NFTCardList ownerAddress={address} />
      }
    </DataTableWrapper>
  )
}

export default DataTableContainer