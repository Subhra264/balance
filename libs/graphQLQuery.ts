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

export function queryTransactions(network: string = 'rinkeby') {

	const query = `query Query($address: String!, $etherscan_apikey: Secret!) {
		${network}_transactions(
      etherscan_apikey: $etherscan_apikey
      address: $address
      module: "account"
      action: "txlist"
      sort: "desc"
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

  return {
    query,
    resultField: `${network}_transactions`
  }
}

export function queryBalance(network: string = 'rinkeby') {

	const query = `query Query($address: String!, $etherscan_apikey: Secret!) {
		${network}_balance(
      etherscan_apikey: $etherscan_apikey
      address: $address
      module: "account"
      action: "balance"
      tag: "latest"
    ) {
      message
      status
      result
    }
	}`

  return {
    query,
    resultField: `${network}_balance`
  }
}