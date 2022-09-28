import React, { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/HeroSection.module.css'
import Image from 'next/image';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from 'web3';
import web3Modal from 'web3modal'
import Web3Modal from 'web3modal'
import { connectAccount } from '../config/accountSlice'
import { BigNumber, utils } from 'ethers'

import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { INFURA_KEY_TEST,INFURA_KEY ,RPC_URL,chainId} from '../config/configData';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from '@web3-react/core'
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const ROPSTEN_RPC_URL = `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`;
const RINKEBY_RPC_URL = RPC_URL;

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimel
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: "0x3",
      token: "tROP",
      namespace: "evm",
      label: "Ethereum Ropsten Testnet",
      rpcUrl: ROPSTEN_RPC_URL
    },
    {
      id: "0x4",
      token: "rETH",
      namespace: "evm",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: RINKEBY_RPC_URL
    }
  ],
  appMetadata: {
    name: "WildList NFT Minting Dapp",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    description: "WildList NFT Minting Dapp",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});
export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
    appName: "WildList Minting DAPP",
    infuraId: process.env.INFURA_KEY ,
    rpc: RPC_URL,
    chainId:chainId,
    rpc: {
     4: RPC_URL,
   },
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    qrcodeModalOptions: {
      desktopLinks: [
        'ledger',
        'tokenary',
        'wallet',
        'wallet 3',
        'secuX',
        'ambire',
        'wallet3',
        'apolloX',
        'zerion',
        'sequence',
        'punkWallet',
        'kryptoGO',
        'nft',
        'riceWallet',
        'vision',
        'keyring'
      ],
      mobileLinks: [
        "rainbow",
        "metamask",
        "argent",
        "trust",
        "imtoken",
        "pillar",
      ],
    },
     rpc: {
      4: RPC_URL,
    },
   }
 }
};

let web3Modal1;
if (typeof window !== 'undefined'){
    web3Modal1 = new Web3Modal({
        network: 'rinkeby',
        providerOptions,
        cacheProvider:true // required
      });
    }

    const CoinbaseWallet = new WalletLinkConnector({
      url: RPC_URL,
      appName: "WildList NFT Minting Dapp",
      supportedChainIds: [1, 3, 4, 5, 42],
     });
     
     const WalletConnect_ = new WalletConnectConnector({
      rpcUrl: RPC_URL,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
     });
     
     const Injected = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42]
     });

const LoginPop = ({ accounts,SetAccounts,popup, setPopup, type,setType,network,setNetwork,provider,setProvider ,wallet, SetWallet}) =>{
    function closePopup() {
        setPopup("close");
    }


    if (typeof window !== undefined) {
      window.onbeforeunload = async () => {
        //await web3Modal1.clearCachedProvider();
        const [primaryWallet] = await onboard.state.get().wallets;
        if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
      }
    }
    async function connectMetamask() {
        if(window.ethereum) {
          try{
            const accounts= await window.ethereum.request({
                method:"eth_requestAccounts", 
            });
            const provider_= new ethers.providers.Web3Provider(window.ethereum);
            SetAccounts(accounts)
            setProvider(provider_);
            setType('metamask');
            setPopup("close");
        }
        
      catch(err){
        if(String(err).includes('closed modal')){
          alert('Connection Rejected')
        }
      }
    }
    else {
      alert('Metamask extension not found!')
    }
  }

        async function connectWallet() {
          try{
         //  Create WalletConnect Provider
         const provider = new WalletConnectProvider({
          rpc: {
            4: RPC_URL,
            URL:'https://localhost:8545'
          },
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
            qrcodeModalOptions: {
              desktopLinks: [
                'ledger',
                'tokenary',
                'wallet',
                'wallet 3',
                'secuX',
                'ambire',
                'wallet3',
                'apolloX',
                'zerion',
                'sequence',
                'punkWallet',
                'kryptoGO',
                'nft',
                'riceWallet',
                'vision',
                'keyring'
              ],
              mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
              ],
            },
          });
        await provider.enable();
        const web3 = new Web3(provider);
        const accounts1 = await web3.eth.getAccounts();
        console.log(accounts1);
        SetAccounts(accounts1)
        setProvider(provider);
        provider.disconnect();
        setType('walletconnect');
        setPopup("close");
      }
      
      catch(err){
        if(String(err).includes('closed modal')){
          alert('Connection Rejected')
        }
      }
       
        }

        const connectCoinBase = async () => {
                
            try {
              const wallets = await onboard.connectWallet();
             //const provider=await web3Modal1.connect();
              const accounts = wallets[0].accounts[0].address;
              const network = await wallets[0];
           
              SetAccounts(accounts);
              setType('coinbase');
              SetWallet(wallet[0]);
              setProvider(wallets[0].provider);
              setPopup("close");
         
            setNetwork(network);
            } catch (error) {
              console.error(error);
              alert(error);
            }
          };
    

    return(
        <div className={styles.popUp}>
     
            <div className={styles.popupDiv}>
            <div onClick={closePopup} className={styles.crossBtn}>
            <Image  src='/cross.png' width={18} height={18}></Image> </div>
            <h2 className={styles.popupHead}>Connect with</h2>
            <div className={styles.connectDiv}>
            <button onClick={connectMetamask} className={styles.walletButton}>Metamask Wallet</button>
            <button onClick={connectWallet} className={styles.walletButton}>Wallet Connect</button>
            <button onClick={connectCoinBase}  className={styles.walletButton}>Coinbase Wallet</button>   
            </div>
             
            </div>
        </div>
    );
}

export default LoginPop