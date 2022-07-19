import React, { SetStateAction, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { styled } from '@mui/material/styles'
import { NFTCardProps } from './NFTCard'
import { Column } from './StickyHeadTable'
import { queryNFTTransfers } from '../libs/graphQLQuery'
import { TERTIARY_COLOR } from '../utils/colors'
import BasicTable, { BasicTableColumn } from './BasicTable'

interface NFTModalProps {
  modalProps: NFTCardProps | undefined
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

const NFTImageContainer = styled('div')(({theme}) => ({
  width: '18rem',
  height: 350,
  display: 'inline-block',
  borderRadius: 8,
	margin: 12,
	backgroundColor: TERTIARY_COLOR,
	boxShadow: `0 0 8px 0 #f5e6e6`
}))

const NFTModal: React.FC<NFTModalProps> = ({ modalProps, open, setOpen }) => {
  const [rows, setRows] = React.useState<Array<Record<string, any>>>([])
  const metadata = modalProps?.metadata || null

  let image = (metadata?.image || metadata?.image_url) as string || ''
  if (image.startsWith('ipfs://')) image = `https://ipfs.io/${metadata?.image.slice(7)}`

  const closeDialog = () => {
    setOpen(false)
  }

  const basicTableColumns: BasicTableColumn[] = [
    { id: 'details', label: 'Details', align: 'left'},
    { id: 'value', label: 'Value', align: 'right'}
  ]

  const basicTableRowColumns: Record<string, any>[] = [
    {
      details: 'Token Address',
      value:
        <a
          href={`/nft-collection/${modalProps?.tokenAddress}`}
          style={{ color: 'blue' }}
        >
          {modalProps?.tokenAddress.slice(0, 8)}...{modalProps?.tokenAddress.slice(30)}
        </a>
    },
    { details: 'Token ID', value: modalProps?.tokenId },
    { details: 'Contract Type', value: modalProps?.contractType },
  ]

  const columns: Column[] = [
    { id: 'from', label: 'From', minWidth: 170 },
    { id: 'to', label: 'To', minWidth: 100 },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 170,
      align: 'right',
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      align: 'right',
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'transaction_hash',
      label: 'Transaction Hash',
      minWidth: 170,
      align: 'right',
      // format: (value: number) => value.toFixed(2),
    },
    {
      id: 'block_number',
      label: 'Block Number',
      minWidth: 170,
      align: 'right',
      // format: (value: number) => value.toFixed(2),
    },
  ]

  useEffect(() => {
    const fetchAPI = async () => {
      const query = queryNFTTransfers()

      // TODO
      // const res = await fetch('/api/hello', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     query,
      //     variables: {
      //       address: modalProps?.tokenAddress,
      //       tokenId: modalProps?.tokenId
      //     }
      //   })
      // })

      // const result = await res.json()
    }

    if (modalProps?.tokenAddress && modalProps?.tokenId)
      fetchAPI()
  }, [modalProps?.tokenAddress, modalProps?.tokenId])

  return (
    <Dialog open={open} onClose={closeDialog}>
      {
        metadata && (
          <>
            <DialogTitle>{metadata.name}</DialogTitle>
            <DialogContent>
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <NFTImageContainer>
                    <img
                      src={image}
                      width="100%"
                      height="100%"
                    />
                  </NFTImageContainer>
                  <div style={{ fontWeight: 800, fontStyle: 'italic', padding: '1.2rem' }}>{metadata.name}</div>
                  <div
                    style={{ wordBreak: 'break-word', textAlign: 'center', fontSize: '0.9rem' }}
                  >
                    {metadata.description}
                  </div>
                </div>
                <div>
                  <BasicTable columns={basicTableColumns} rows={basicTableRowColumns} />
                </div>
              </div>
            </DialogContent>
          </>
        )
      }
    </Dialog>
  )
}

export default NFTModal