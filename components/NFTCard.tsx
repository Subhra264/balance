import { styled } from '@mui/material/styles'
import Image from 'next/image'
import React from 'react'
import { SECONDARY_DARK, TERTIARY_COLOR } from '../utils/colors'

interface NFTCardProps {

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
	return (
		<NFTCardContainer>
			<NFTImageContainer>
				<img
					src={'https://bapesclan.mypinata.cloud/ipfs/QmXrxPHX9porchZaYUKjL13nPJbCUSPSvbsk2XPxXqxdSC/1961.jpg'}
					width='100%'
					height='100%'
				/>
			</NFTImageContainer>
			<NFTCardDescContainer>
				<div>Name</div>
				<div>Address</div>
			</NFTCardDescContainer>
		</NFTCardContainer>
	)
}

export default NFTCard