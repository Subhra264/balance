import { styled } from '@mui/material/styles'
import Image from 'next/image'
import React from 'react'
import { SECONDARY_DARK, TERTIARY_COLOR } from '../utils/colors'

export interface NFTCardProps {
  tokenId: string
	tokenAddress: string
	metadata: any
	contractType: string
}

const NFTCardContainer = styled('div')(({theme}) => ({
	display: 'inline-block',
	width: '18rem',
	height: 350,
	borderRadius: 8,
	margin: 12,
	backgroundColor: TERTIARY_COLOR,
	boxShadow: `0 0 8px 0 #f5e6e6`
}))

const NFTImageContainer = styled('div')(({theme}) => ({
	width: '100%',
	height: 250
}))

const NFTCardDescContainer = styled('div')(({theme}) => ({
	padding: '10px 12px'
}))

const NFTCard: React.FC<NFTCardProps> = (props) => {
  const metadata = JSON.parse(props.metadata)

  let image = (metadata.image || metadata.image_url) as string || ''
  if (image.startsWith('ipfs://')) image = `https://ipfs.io/${metadata?.image.slice(7)}`

	return (
		<NFTCardContainer>
			<NFTImageContainer>
				<img
					src={image}
					width='100%'
					height='100%'
				/>
			</NFTImageContainer>
			<NFTCardDescContainer>
				<div>{metadata.name}</div>
				<div>{props.tokenAddress.slice(0, 8)}...</div>
			</NFTCardDescContainer>
		</NFTCardContainer>
	)
}

export default NFTCard