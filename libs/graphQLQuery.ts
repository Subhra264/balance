export function querySearchNFTs() {
  return `query DefaultProvider($q: String!, $moralis_apikey: Secret!) {
		moralis_nftMetadataCollection(
			moralis_apikey: $moralis_apikey
			q: $q
		) {
			tokenId
			tokenAddress
			metadata
			contractType
		}
	}`
}

export function queryNFTTransfers() {
	return `query DefaultProvider($address: String!, $tokenId: String!, $moralis_apikey: Secret!) {
		moralis_getWalletTokenIdTransfers(
			moralis_apikey: $moralis_apikey
			address: $address
			tokenId: $tokenId
		) {
			page
  		pageSize
			result {
				tokenAddress
				tokenId
				fromAddress
				toAddress
				transactionHash
				value
				amount
				blockTimestamp
				blockNumber
			}
 			total
		}
	}`
}