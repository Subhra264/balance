import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import NFTCard from './NFTCard'

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

	useEffect(() => {
		if (props.search && props.fetchResult) {
			props.setFetchResult(false)
			
		}
	}, [props.search, props.fetchResult])

	return (
		<NFTCardListContainer>
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
			<NFTCard />
		</NFTCardListContainer>
	)
}

export default NFTCardList