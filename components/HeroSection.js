import React, { Component, useState } from 'react'
import styles from '../styles/HeroSection.module.css'
import Image from 'next/image';
import { ethers, BigNumber } from "ethers";
import LoginPop from '../components/LoginPopup'
import Web3 from 'web3';
import web3Modal from 'web3modal'
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";
import WildListNFTABI from '../config/WildListNFTABI.json';
import {heroText,heroSubText,DappUrl,contractAddress,contractABI, INFURA_KEY_TEST,INFURA_KEY} from '../config/configData.js'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { get } from 'store';

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

const HeroSection = ({ accounts,SetAccounts,type,setType}) => {
   
    const [popup,setPopup]=useState([]);
    [type,setType] = useState([]);
    const [network, setNetwork] = useState();
    const [provider,setProvider]= useState([]);
 const [mintPublicPrice,setMintPublicPrice, 
    ] = useState([]);
    const [mintWhitelistPrice, setMintWhitelistPrice ] = useState([]);
    const [ mintLeft, setMintLeft ] = useState([]);
    const [ isWhitelisted, setIsWhitelisted ] = useState([]);
    const [valuePrice, setValuePrice]= useState([]);
    const popupStat=Boolean(popup);
    const isConnected= Boolean(accounts[0]);
    const address=String(accounts);
  //  const mintPublicPrice= String('0.075 ETH');
  //  const mintWhitelistPrice= String('0.055 ETH');
    if(isConnected) {
        if(type=='metamask') {
          //  const contract= new ethers.Contract('0x81534B49ee122fA09cf8f03e5af8B99841882A82',WildListNFTABI.abi,signer);
            getData();
            async function getData() {
     
                //const provider_ =new ethers.providers.Web3Provider(window.ethereum);
                const provider_= new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider_.getSigner();
                const contract= new ethers.Contract(
                    contractAddress,
                    WildListNFTABI.abi,
                    signer
                  );
                mintPublicPrice=await contract.publicPrice();
                mintWhitelistPrice= await contract.whiteListPrice();
               setMintLeft( 3 - parseInt (String(await contract.mintDetails(accounts[0])).charAt(0)));
              //  alert(mintLeft);
              if(String(await contract.mintDetails(accounts[0])).includes('true')){
                setIsWhitelisted(true);
                setValuePrice(mintWhitelistPrice);
              }
              else {
                setIsWhitelisted(false);
                setValuePrice(mintPublicPrice);
              }
        
                setMintWhitelistPrice(Web3.utils.fromWei(String(mintWhitelistPrice))+' ETH');
                setMintPublicPrice(Web3.utils.fromWei(String(mintPublicPrice))+' ETH');
                
          
            }
        }
        else if(type=='walletconnect') {
            getData();
            async function getData() {
                const provider_ = await web3Modal1.connect();
                const library = new ethers.providers.Web3Provider(provider_);
                const web3Provider = new ethers.providers.Web3Provider(provider);
                const signer=web3Provider.getSigner();
                const contract= new ethers.Contract(
                    contractAddress,
                    WildListNFTABI.abi,
                   signer
                  );
                  mintPublicPrice=await contract.publicPrice();
                  mintWhitelistPrice= await contract.whiteListPrice();
                 setMintLeft( 3 - parseInt (String(await contract.mintDetails(accounts[0])).charAt(0)));
                //  alert(mintLeft);
                if(String(await contract.mintDetails(accounts[0])).includes('true')){
                  setIsWhitelisted(true);
                  setValuePrice(mintWhitelistPrice);
                }
                else {
                  setIsWhitelisted(false);
                  setValuePrice(mintPublicPrice);
                }
          
                  setMintWhitelistPrice(Web3.utils.fromWei(String(mintWhitelistPrice))+' ETH');
                  setMintPublicPrice(Web3.utils.fromWei(String(mintPublicPrice))+' ETH');
                  
            
              
            }
        }
        else if(type=='coinbase') {
            getData();
            async function getData() {
                const provider_ = await web3Modal1.connect(); 
                const library = new ethers.providers.Web3Provider(provider_);
                const web3Provider = new ethers.providers.Web3Provider(provider);
                const signer=library.getSigner();
                const contract= new ethers.Contract(
                    contractAddress,
                    WildListNFTABI.abi,
                   signer
                  );
                  mintPublicPrice=await contract.publicPrice();
                  mintWhitelistPrice= await contract.whiteListPrice();
                 setMintLeft( 3 - parseInt (String(await contract.mintDetails(accounts[0])).charAt(0)));
                //  alert(mintLeft);
                if(String(await contract.mintDetails(accounts[0])).includes('true')){
                  setIsWhitelisted(true);
                  setValuePrice(mintWhitelistPrice);
                }
                else {
                  setIsWhitelisted(false);
                  setValuePrice(mintPublicPrice);
                }
          
                  setMintWhitelistPrice(Web3.utils.fromWei(String(mintWhitelistPrice))+' ETH');
                  setMintPublicPrice(Web3.utils.fromWei(String(mintPublicPrice))+' ETH');
                  
            
              
            }
        }
    }
    function openPopup() {
        setPopup("Open");
    }
    function closePopup() {
        setPopup(null);
    }
    async function handleMint() {}
    return (
    <div className={styles.heroSection}>
    {popupStat ? (
        <div></div>
    ) : (
        <LoginPop accounts={accounts} SetAccounts={SetAccounts} 
        popup={popup} setPopup={setPopup} type={type} setType={setType} network={network} setNetwork={setNetwork}
        provider={provider} setProvider={setProvider}></LoginPop>
  
    )}
        <div className={styles.heroLeft}>
        <div className={styles.frame1}>
        <Image src='/frame1.png' width={400} height={380} ></Image>
        </div>
         <div className={styles.girlImage}>
         <Image src='/girlImage.png' width={980} height={1210} ></Image>
         </div>
           
        </div>

        <div className={styles.heroMid}>
            <div className={styles.heroTextDiv}>
                <h2 className={styles.heroText}>{heroText}</h2>
                <h3 className={styles.heroSubText}>{heroSubText}</h3>
                {isConnected ? (
                    <>
                    <div className='mintForm'>
                    {isWhitelisted ? (
                        <h3 className={styles.mintPriceText}>Price: <span className={styles.priceSpan}>{mintWhitelistPrice}</span></h3>
                    ) : (
                        <h3 className={styles.mintPriceText}>Price: <span className={styles.priceSpan}>{mintPublicPrice}</span></h3>
                    )}
                  
                    <h3 className={styles.mintLeftText}>You can mint: <span className={styles.mintLeftSpan}>{mintLeft}</span></h3>
                    <button onClick={handleMint} className={styles.mintButton}>Mint NFT</button>
                    </div>
                    </>
                ) : (
                    <button onClick={closePopup} className={styles.connectButton}>Connect Wallet</button>
                )}
                <div className={styles.circleBg}>
                <Image src={'/circleBg.png'} width={400} height={400}></Image>
                </div>
             
            </div>
        </div>
        <div className={styles.heroRight}>
                <div className={styles.frame2}>
                <Image  src='/frame2.png' width={400} height={380} ></Image>
                </div>
          
           <div className={styles.boyImage}> 
           <Image  src='/boyImage.png' width={1040} height={1280} ></Image>
           </div> 
        </div>
    </div>
    )
  }

export default HeroSection;