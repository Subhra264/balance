import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { NFTCardListContainer } from '../../components/NFTCardList'
import { queryNFTCollection } from '../../libs/graphQLQuery'
import NFTModal from '../../components/NFTModal'
import NFTCard, { NFTCardProps } from '../../components/NFTCard'


interface ContractDetails {
  name: string
  contractType: string
  symbol: string
  tokenAddress: string
  syncedAt: string
}

interface NFTContract extends NFTCardProps {
  amount: string
  name: string
  symbol: string
}

const NFTCollection: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [contractDetails, setContractDetails] = useState<ContractDetails>()
  const [contractNFTs, setContractNFTs] = useState<NFTContract[]>([])
  const [modalProps, setModalProps] = useState<NFTCardProps>()
  const [openModal, setOpenModal] = useState(false)
  const address = router.query.address as string

  useEffect(() => {
    if (address) {
      const fetchAPI = async () => {
        const query = queryNFTCollection()

        const res = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query,
            variables: {
              address
            }
          })
        })

        const result = await res.json()
        console.log('Balance result', result)
        const contractMetadata = result.data.data.moralis_nftContractMetadata
        const contractNFTCollection = result.data.data.moralis_nftCollection

        if (contractMetadata && contractNFTCollection) {

          setContractDetails(contractMetadata)
          setContractNFTs(contractNFTCollection)
        }
        setLoading(false)
      }

      fetchAPI()
    }
  }, [address])

  return (
    <div>
      <Head>
        <title>NFT Collection - { address }</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '2rem' }}>
        {
          address && <>
            {
              loading?
                <CircularProgress />
              :
              <>
                {
                  contractDetails && 
                    <div>
                      <h3>Contract Address: {address}</h3>
                      <div>
                        <b>Name:</b>{` ${contractDetails.name}`}
                      </div>
                      <div>
                        <b>Contract Type:</b>{` ${contractDetails.contractType}`}
                      </div>
                      <div>
                        <b>Symbol:</b>{` ${contractDetails.symbol}`}
                      </div>
                    </div>
                }
                {
                  contractNFTs.length?
                    (
                      <NFTCardListContainer>
                        <NFTModal
                          modalProps={modalProps}
                          open={openModal}
                          setOpen={setOpenModal}
                        />
                        {
                          contractNFTs.map(nft => (
                            nft?.metadata &&
                            <NFTCard
                              {...nft}
                              key={`${nft.tokenAddress}-${nft.tokenId}`}
                              setOpenModal={setOpenModal}
                              setModalProps={setModalProps}
                            />
                          ))
                        }
                      </NFTCardListContainer>
                    )
                  :
                    <div
                      style={{
                        padding: '1rem',
                        textAlign: 'center'
                      }}
                    >
                      No Match Found
                    </div>
                }
              </>
            }
          </>
        }
      </main>
    </div>
  )
}

export default NFTCollection