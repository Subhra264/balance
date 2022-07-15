// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchAPI from '../../libs/fetchAPI'
import { queryNFTSearch } from '../../libs/graphQLQuery'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let address
  if(req?.query?.address) {
    address = req.query.address
  } else {
    // Dummy address if no address
    // is returned from metamask
    address = process.env.ADDRESS
  }

  const data = await fetchAPI(
    // If no stepzen endpoint, use studio mock data
    process.env.STEPZEN_API_URL ? process.env.STEPZEN_API_URL : "https://graphqlcf.stepzen.net/api/cfa9352aab44fe6cbf8bfd17d99807f6/__graphql",
    process.env.STEPZEN_API_KEY ? process.env.STEPZEN_API_KEY : null,
    queryNFTSearch(),
    {
        address: address,
        etherscan_apikey: process.env.ETHERSCAN_API_KEY,
        moralis_apikey: process.env.MORALIS_API_KEY,
        infura_app_id: process.env.INFURA_APP_ID
    },
  );

  res.status(200).json({ data: data } as any)
}
