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
import { INFURA_KEY_TEST,INFURA_KEY } from '../config/configData';
export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "WildList Minting DAPP",
     infuraId: process.env.INFURA_KEY_TEST 
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
     infuraId: process.env.INFURA_KEY_TEST 
   }
 }
};

let web3Modal1;
if (typeof window !== 'undefined'){
    web3Modal1 = new Web3Modal({
        network: 'testnet',
        providerOptions,
        cacheProvider:true // required
      });
    }
const LoginPop = ({ accounts,SetAccounts,popup, setPopup, type,setType,network,setNetwork,provider,setProvider}) =>{
    function closePopup() {
        setPopup("close");
    }
    
    async function connectMetamask() {
        if(window.ethereum) {
            const accounts= await window.ethereum.request({
                method:"eth_requestAccounts"
            });
            const provider_= new ethers.providers.Web3Provider(window.ethereum);
            SetAccounts(accounts)
            setProvider(provider_);
            setType('metamask');
            setPopup("close");
        }
    }

        async function connectWallet() {

         //  Create WalletConnect Provider
         const provider = new WalletConnectProvider({
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
        setType('walletconnect');
        setPopup("close");
        //provider.disconnect();
       
        }

        const connectCoinBase = async () => {
                
            try {
              const provider = await web3Modal1.connect();
              const library = new ethers.providers.Web3Provider(provider);
              const accounts = await library.listAccounts();
              const network = await library.getNetwork();
              SetAccounts(accounts[0]);
              setType('coinbase');
              setProvider(provider);
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