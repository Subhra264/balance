import { ethers } from 'ethers'
import { contractABI, contractAddress } from './consts'

interface TransferEtherDetails {
  from: string
  to: string
  message: string
  amount: number
}

export const getSmartContract = (ethereum: any) => {
  const ethProvider = new ethers.providers.Web3Provider(ethereum)
  const contractSigner = ethProvider.getSigner()

  return new ethers.Contract(contractAddress, contractABI, contractSigner)
}

export const transferAmount = async (ethereum: any, transferDetails: TransferEtherDetails) => {
  try {
    console.log('Transfer details', transferDetails)
    console.log('Transfer amount toString', transferDetails.amount.toString())

    const transactionContract = getSmartContract(ethereum)
    const parsedEther = ethers.utils.parseEther(transferDetails.amount.toString())

    console.log('Parsed amount', parsedEther)

    const transferTransactionHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: transferDetails.from,
        to: transferDetails.to,
        gas: '0x5208',
        value: parsedEther._hex
      }]
    })

    console.log('transferTransactionHash', transferTransactionHash)

    const txHash = await transactionContract.addToChain(
      transferDetails.to,
      parsedEther,
      transferDetails.message
    )

    await txHash.wait()

    console.log('Transaction hash', txHash)

    // console.log('transactions from smart_contract', await transactionContract.getAllTransactions())
    return {
      success: true,
      transferTransactionHash
    }

  } catch(err) {
    console.log('Error sending eth', err)
    return false
  }
}