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