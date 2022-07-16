import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import NFTCard, { NFTCardProps } from './NFTCard'
import { querySearchNFTs } from '../libs/graphQLQuery'

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

  const [result, setResult] = useState<Array<NFTCardProps>>([])

	useEffect(() => {
		if (props.search && props.fetchResult) {
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
      }

			fetchAPI()
		}
	}, [props.search, props.fetchResult])

	return (
    <>
      {
        result.length?
          (
            <NFTCardListContainer>
              {
                result.map(nft => (
                  <NFTCard {...nft}/>
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