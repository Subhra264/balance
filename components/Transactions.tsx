import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { queryTransactions } from '../libs/graphQLQuery'
import StickyHeadTable, { Column } from './StickyHeadTable'

interface TransactionsProps {
  address: string
}

const columns: Column[] = [
  { id: 'from', label: 'From', minWidth: 170 },
  { id: 'to', label: 'To', minWidth: 100 },
  {
    id: 'value',
    label: 'Value',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'age',
    label: 'Age',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'transactionHash',
    label: 'Transaction Hash',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
  {
    id: 'blockNumber',
    label: 'Block Number',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
  {
    id: 'success',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
]

const Transactions: React.FC<TransactionsProps> = (props) => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (props.address) {
    // if (props.refresh) {
      // props.setRefresh(false)
      const fetchTransactions = async () => {
        const query = queryTransactions()
        console.log('Fetch transactions query', query)
  
        const response = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            variables: {
              address: props.address
            }
          })
        })
  
        const res = await response.json()
        console.log('Fetched transactions', res)

        const result_ = res.data.data
          .rinkeby_etherscan_transactions
          .result
          .map((txn: any) => ({
            from: <a href={`https://etherscan.io/address/${txn.from}`} style={{ color: 'blue' }}>
                {txn.from.slice(0, 8)}...{txn.from.slice(30)}
              </a>,
            to: <a href={`https://etherscan.io/address/${txn.to}`} style={{ color: 'blue' }}>
                {txn.to.slice(0, 8)}...{txn.to.slice(30)}
              </a>,
            value: Number(txn.value) / 10 ** 18,
            age: txn.timeStamp,
            transactionHash: txn.hash,
            blockNumber: txn.blockNumber,
            success: Number(txn.isError)? 'Failure' : 'Success'
          }))

        setResult(result_)
        setLoading(false)
      }
  
      fetchTransactions()
    }
  }, [props.address])

  return (
    loading?
      <CircularProgress />
    :
      result.length ?
        <StickyHeadTable columns={columns} rows={result}/>
      :
        <div>No Transaction Found</div>
  )
}

export default Transactions