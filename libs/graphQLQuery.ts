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

export function queryTransactions(network: string = 'api-rinkeby') {
	return `query Query($address: String!, $etherscan_apikey: Secret!) {
		etherscan_transactions(
      etherscan_apikey: $etherscan_apikey
      address: $address
      module: "account"
      action: "txlist"
      sort: "desc"
      network: "${network}"
    ) {
      message
      status
      result {
        blockNumber
        timeStamp
        hash
        from
        to
        value
        gas
        gasPrice
        isError
        cumulativeGasUsed
        gasUsed
      }
    }
	}`
}

export function queryBalance(network: string = 'api-rinkeby') {
	return `query Query($address: String!, $etherscan_apikey: Secret!) {
		etherscan_transactions(
      etherscan_apikey: $etherscan_apikey
      address: $address
      module: "account"
      action: "txlist"
      sort: "desc"
      network: "${network}"
    ) {
      message
      status
      result {
        blockNumber
        timeStamp
        hash
        from
        to
        value
        gas
        gasPrice
        isError
        cumulativeGasUsed
        gasUsed
      }
    }
	}`
}