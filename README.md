This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

To do any changes regarding the text, ETH network, chain RPC, id and more go to config/ConfigData.


To deploy smart contract, follow the commands:

```bash
cd contratDeploy
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/scriptName.js --network {network name} {'parameter 1',parameter 2'.....}
npx hardhat verify {contract address} --network {network name} {'parameter 1',parameter 2'.....}
```
