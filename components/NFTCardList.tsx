import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import NFTCard, { NFTCardProps } from './NFTCard'
import { querySearchNFTs } from '../libs/graphQLQuery'
import NFTModal from './NFTModal'
import { CircularProgress } from '@mui/material'

interface NFTCardListProps {
	search: string
	fetchResult: boolean
	setFetchResult: React.Dispatch<React.SetStateAction<boolean>>
}

const NFTCardListContainer = styled('div')(({theme}) => ({
	display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))'
}))

const NFTCardList: React.FC<NFTCardListProps> = (props) => {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Array<NFTCardProps>>([])
  const [modalProps, setModalProps] = useState<NFTCardProps>()
  const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		if (props.search && props.fetchResult) {
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
            // !props.search?
            //   'Please type something in the search box'
            // :
              'No Match Found'
      }
    </>
	)
}

export default NFTCardList