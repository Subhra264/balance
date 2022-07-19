import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import NFTCard, { NFTCardProps } from './NFTCard'
import { querySearchNFTs, queryNFTsByOwner } from '../libs/graphQLQuery'
import NFTModal from './NFTModal'
import { CircularProgress } from '@mui/material'

interface NFTCardListProps {
	search?: string
	fetchResult?: boolean
	setFetchResult?: React.Dispatch<React.SetStateAction<boolean>>
  ownerAddress?: string
}

export const NFTCardListContainer = styled('div')(({theme}) => ({
	display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))'
}))

const NFTCardList: React.FC<NFTCardListProps> = (props) => {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Array<NFTCardProps>>([])
  const [modalProps, setModalProps] = useState<NFTCardProps>()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (props.ownerAddress) {
      setLoading(true)

      const fetchAPI = async () => {
        const query = queryNFTsByOwner()

        const res = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            variables: {
              address: props.ownerAddress
            }
          })
        })

        const result = await res.json()
        setResult(result.data.data.moralis_nftOwnerCollection)
        setLoading(false)
      }

      fetchAPI()
    }
  }, [])

	useEffect(() => {
		if (props.search
      && props.fetchResult
      && props.setFetchResult) {

      setLoading(true)
			props.setFetchResult(false)
      const fetchAPI = async () => {
			  const query = querySearchNFTs()

        const res = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            variables: {
              q: props.search
            }
          })
        })

        const result = await res.json()
        setResult(result.data.data.moralis_nftMetadataCollection)
        setLoading(false)
      }

			fetchAPI()
		}
	}, [props.search, props.fetchResult])

	return (
    <>
      {
        loading?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        :
          result.length?
            (
              <NFTCardListContainer>
                <NFTModal
                  modalProps={modalProps}
                  open={openModal}
                  setOpen={setOpenModal}
                />
                {
                  result.map(nft => (
                    nft.metadata &&
                    <NFTCard
                      {...nft}
                      key={`${nft.tokenAddress}-${nft.tokenId}`}
                      setOpenModal={setOpenModal}
                      setModalProps={setModalProps}
                    />
                  ))
                }
              </NFTCardListContainer>
            )
          :
            <div
              style={{
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              No Match Found
            </div>
      }
    </>
	)
}

export default NFTCardList