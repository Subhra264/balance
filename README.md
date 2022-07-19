This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

**Note**: You need to have node.js installed in your machine.

### Steps to get started

- Clone this repo `git clone https://github.com/Subhra264/balance.git`
- Change to the balance directory: `cd balance/`
- Run `yarn`
- Globally install stepzen: `npm install -g stepzen`
- Create an API key for stepzen by creating a free stepzen account
- Create an API key for Moralis Api by creating a free Moralis account
- Create an API key for Etherscan API by creating a free Etherscan account
- Copy the .env.sample file to .env file: `cp .env.sample .env`
- Paste the API keys there
- Open two terminals
- In one terminal, run: `cd stepzen/ && stepzen start`
- Copy the URL that you will see after running the previous commands
- Paste the URL into .env file for the key `STEPZEN_API_URL`
- In the other terminal, run: `yarn run dev`
- Open [http://localhost:3000](http://localhost:3000) in the browser
