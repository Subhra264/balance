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
  const transactionContract = getSmartContract(ethereum)
  const parsedEther = ethers.utils.parseEther(transferDetails.amount.toString())

  await ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      from: transferDetails.from,
      to: transferDetails.to,
      gas: '0x5208',
      amount: parsedEther._hex
    }]
  })

  const txHash = await transactionContract.addToChain(
    transferDetails.to,
    parsedEther,
    transferDetails.message
  )

  await txHash.wait()
}