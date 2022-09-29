import React, { Component, useState } from 'react'
import styles from '../styles/HeroSection.module.css'
import Image from 'next/image';
import LoadingSpinner from './Spinner';
import { ethers, BigNumber } from "ethers";
import LoginPop_2 from '../components/LoginPopup_2'
import LoginPop from './LoginPopup';
import Web3 from 'web3';
import web3Modal from 'web3modal'
import Web3Modal from 'web3modal'
import SigningPop from './SigningPop'
var Tx = require('ethereumjs-tx');
import { publicSupply } from '../config/configData.js';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from "@walletconnect/web3-provider";
import WildListNFTABI from '../config/WildListNFTABI.json';
import {heroText,heroSubText,DappUrl,logoURL,iconURL, contractAddress,contractABI, INFURA_KEY_TEST,INFURA_KEY,RPC_URL,chainId} from '../config/configData.js'
import WalletConnect from "@walletconnect/web3-provider";
import { get } from 'store';
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_KEY}`;
const ROPSTEN_RPC_URL = `https://ropsten.infura.io/v3/${INFURA_KEY}`;
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
    icon: iconURL,
    logo: logoURL,
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

const HeroSection = ({ accounts,SetAccounts,type,setType}) => {
   
    const [popup,setPopup]=useState([]);
    const [sign,setSign] =useState([]);
    [type,setType] = useState([]);
    const [network, setNetwork] = useState();
    const [provider,setProvider]= useState([]);
 const [mintPublicPrice,setMintPublicPrice, 
    ] = useState([]);
    const [loaded,SetLoaded] = useState([])
    const [mintWhitelistPrice, setMintWhitelistPrice ] = useState([]);
    const mintPublicPrice_=undefined;
    const mintWhitelistPrice_=undefined;
    const [ mintLeft, setMintLeft ] = useState([]);
    const [ isWhitelisted, setIsWhitelisted ] = useState([]);
    const [valuePrice, setValuePrice]= useState([]);
    const popupStat=Boolean(popup);
    const popupStat_2=Boolean(sign);
    const isConnected= Boolean(accounts[0]);
    const address=String(accounts);
    const [wallet,SetWallet] = useState([]);
    const [signed,SetSigned] = useState([]);
  
  //  const mintPublicPrice= String('0.075 ETH');
  //  const mintWhitelistPrice= String('0.055 ETH');

 
    if(isConnected) {
        if(type=='metamask') {
          //  const contract= new ethers.Contract('0x81534B49ee122fA09cf8f03e5af8B99841882A82',WildListNFTABI.abi,signer);
            getData();
            async function getData() {
              const rpc=RPC_URL;
                //const provider_ =new ethers.providers.Web3Provider(window.ethereum);
                const provider_= new ethers.providers.JsonRpcProvider(rpc,'rinkeby');

                const signer = provider_.getSigner();
                const contract= new ethers.Contract(
                  contractAddress,
                  WildListNFTABI.abi,
                  provider_
                );
                try{
              mintPublicPrice_=await contract.publicPrice();
              mintWhitelistPrice_= await contract.whiteListPrice();
             setMintLeft( publicSupply- parseInt (String(await contract.mintDetails(accounts[0])).charAt(0)));
         
            if(String(await contract.mintDetails(accounts[0])).includes('true')){
              setIsWhitelisted(true);
              setValuePrice(BigNumber.from(mintWhitelistPrice_));
           
            }
            else {
              setIsWhitelisted(false);
              setValuePrice(BigNumber.from(mintPublicPrice_));
          
            }
       
              setMintWhitelistPrice(Web3.utils.fromWei(String(mintWhitelistPrice_))+' ETH');
              setMintPublicPrice(Web3.utils.fromWei(String(mintPublicPrice_))+' ETH');
              SetLoaded(true);
          }
          catch(err){
            alert(err+'connected but error');
          }
        
            }
        }
        else if(type=='walletconnect') {
            getData();
            async function getData() {
              //  const provider_ = await web3Modal1.connect();
              //  const library = new ethers.providers.Web3Provider(provider_);
               // const web3Provider = new ethers.providers.Web3Provider(provider);
                const rpc=RPC_URL;
                // const provider_ =new ethers.providers.Web3Provider(window.ethereum);
                 const provider_= new ethers.providers.JsonRpcProvider(rpc);
               // const signer=web3Provider.getSigner();
              // const signer=library.getSigner();
                const contract= new ethers.Contract(
                    contractAddress,
                    WildListNFTABI.abi,
                   provider_
                  );

                  try{
                    mintPublicPrice_=await contract.publicPrice();
                    mintWhitelistPrice_= await contract.whiteListPrice();
                   setMintLeft( publicSupply - parseInt (String(await contract.mintDetails(accounts[0])).charAt(0)));
               
                  if(String(await contract.mintDetails(accounts[0])).includes('true')){
                    setIsWhitelisted(true);
                    setValuePrice(BigNumber.from(mintWhitelistPrice_));
                 
                  }
                  else {
                    setIsWhitelisted(false);
                    setValuePrice(BigNumber.from(mintPublicPrice_));
                
                  }
             
                    setMintWhitelistPrice(Web3.utils.fromWei(String(mintWhitelistPrice_))+' ETH');
                    setMintPublicPrice(Web3.utils.fromWei(String(mintPublicPrice_))+' ETH');
                    SetLoaded(true);
                }
                catch(err){
                  alert(err+'connected but error');
                }
              
            }
        }
        else if(type=='coinbase') {
            getData();
            async function getData() {
              const rpc=RPC_URL;
             // const provider_eth =new ethers.providers.Web3Provider(window.ethereum);
              const provider__ = new ethers.providers.JsonRpcProvider(rpc);
              // const wallets = await onboard.connectWallet();
              //const provider_new= new ethers.providers.Web3Provider(wallets[0].provider,'rinkeby');
              const web3 = new Web3(rpc);
             //   const provider_ = await web3Modal1.connect(); 
             // const library = new ethers.providers.Web3Provider(provider_);
             
                //const signer=library.getSigner();
                //const new_address=wallet.accounts[0].address;
                const contract= new web3.eth.Contract(WildListNFTABI.abi, contractAddress)
                try{
                 await contract.methods.publicPrice().call((err, result) => {   mintPublicPrice_=result;})
                 await contract.methods.whiteListPrice().call((err, result) => {   mintWhitelistPrice_=result;})

                 const mintDetails=null;
                 await contract.methods.mintDetails(accounts).call((err, result) => {   mintDetails=String(JSON.stringify(result)); setMintLeft(
                  publicSupply - parseInt (String(JSON.parse(JSON.stringify(result)).tokenMinted)))
                  
                });
                 if(String(mintDetails).includes('true')){
                  setIsWhitelisted(true);
                  setValuePrice(BigNumber.from(mintWhitelistPrice_));
               
                }
                else {
                  setIsWhitelisted(false);
                  setValuePrice(BigNumber.from(mintPublicPrice_));
              
                }
                  setMintWhitelistPrice(Web3.utils.fromWei(String(mintWhitelistPrice_))+' ETH');
                    setMintPublicPrice(Web3.utils.fromWei(String(mintPublicPrice_))+' ETH');
                    SetLoaded(true);
                }
                catch(err){
                  alert("An unknown error has occured! Try again");
                  
                }
            }
        }
    }
    function openPopup() {
        setPopup("Open");
    }
    function closePopup() {
        setPopup(null);
    
    }

    function closePopup_2() {
      setSign(null);
   
    
  }
 
   function handleMint() {
     // alert(type)

      if(type=='metamask') {
          mintGo();
         
         async function mintGo() {
            if(window.ethereum) {
              const rpc='https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
               const provider_eth =new ethers.providers.Web3Provider(window.ethereum);
               const provider_= new Web3.providers.HttpProvider(rpc);
             
              const web3 = new Web3(provider_);
              const contract= new web3.eth.Contract(WildListNFTABI.abi, contractAddress);
                try{
                  if(isWhitelisted) {
                 // const response= await contract.whiteListMint([1],
                 // {gasLimit:3000000,
                //  value:ethers.BigNumber.from(valuePrice)});
                   await contract.methods.whiteListMint([1],
                    {gasLimit:3000000,
                    value:ethers.BigNumber.from(valuePrice)}).call((err, result) => { alert(result)});
                  }
                  else {
                   // const response= await contract.publicMint([1],
                   //   {gasLimit:3000000,
                   //   value:ethers.BigNumber.from(valuePrice)});
               
                     const response= await contract.methods.publicMint([1]);
                     
                      
                      provider_.send({from:accounts[0],
                        gasLimit:3000000,
                           value:ethers.BigNumber.from(valuePrice)},response);
                    
                        
                  }
            }
            catch(err) {
              if(String(err).includes('user rejected')) {
                alert('You cancelled the transaction!')
              }
              else{
               // alert(err);
              }
            }
           }
           else {
            alert("Metamask extension not installed!")
           }
        }
        
      }
      else if(type=='walletconnect'){
        mintGo();
     
        async function mintGo() {
          const provider_ = await web3Modal1.connect();
                const library = new ethers.providers.Web3Provider(provider_);
                const rpc='https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
                // const provider_ =new ethers.providers.Web3Provider(window.ethereum);
                 const provider__= new ethers.providers.JsonRpcProvider(rpc);
              //  const signer=web3Provider.getSigner();
                const contract= new ethers.Contract(
                    contractAddress,
                    WildListNFTABI.abi,
                    provider__.getSigner(accounts[0])
                  );
                  try{
                    if(isWhitelisted) {
                    const response= await contract.whiteListMint([1],
                    {gasLimit:3000000,
                    value:ethers.BigNumber.from(valuePrice)});
                    }
                    else {
                      const response= await contract.publicMint([1],
                        {gasLimit:3000000,
                        value:ethers.BigNumber.from(valuePrice)});
                    }
              }
              catch(err) {
                if(String(err).includes('user rejected')) {
                  alert('You cancelled the transaction!')
                }
                else{
               // throw(err);
                }
              }
        }
      } else if(type=='coinbase'){
        mintGo();
            async function mintGo() {
                const provider_ = await web3Modal1.connect(); 
                const rpc='https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
                // const provider_ =new ethers.providers.Web3Provider(window.ethereum);
                 const provider__= new ethers.providers.JsonRpcProvider(rpc);
                const library = new ethers.providers.Web3Provider(provider_);
                const wallets = await onboard.connectWallet();
                const ethersProvider = new ethers.providers.Web3Provider(
                  wallets[0].provider,
                  'rinkeby'
                );
                //const signer=library.getSigner(accounts[0]);
                const contract= new ethers.Contract(
                    contractAddress,
                    WildListNFTABI.abi,
                    ethersProvider.getSigner()
                  );
                  closePopup_2();
                 
                  try{
                    if(isWhitelisted) {
                   
                    const response= await contract.whiteListMint([1],
                    {gasLimit:3000000,
                    value:ethers.BigNumber.from(valuePrice)});
                    if(response) {
                      setSign('close');
                    } 
                    }
                    else {
                      const response= await contract.publicMint([1],
                        {gasLimit:3000000,
                        value:ethers.BigNumber.from(valuePrice)});
                        if(response) {
                          setSign('close');
                        }
                    
                    }
                    
                
              }
              catch(err) {
                setSign('close');
                if(String(err).includes('user rejected')) {
                  alert('You cancelled the transaction!')
                }
                else if(String(err).includes('bad response')) {
                  alert('An error has occured. Check your wallet network connection & try again.')
                }
                else{
                  alert('Transaction Rejected or Failed due to error.')
                }
              }
              
            }
        }
      
    }
    return (
    <div className={styles.heroSection}>
        
    {popupStat ? (
        <div>
        </div>
    ) : (
        <LoginPop_2 accounts={accounts} SetAccounts={SetAccounts} 
        popup={popup} setPopup={setPopup} type={type} setType={setType} network={network} setNetwork={setNetwork}
        provider={provider} setProvider={setProvider} wallet={wallet} SetWallet={SetWallet}></LoginPop_2>
  
    )}
    {sign==null ? (
      <SigningPop sign={sign} setSign={setSign}></SigningPop>
     
    ) : (
      <div></div>
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
                    <div className={styles.mintForm}>
                 
                    {isWhitelisted ? (
                        <h3 className={styles.mintPriceText}>Price: {loaded==true ? (<span className={styles.priceSpan}>{mintWhitelistPrice}</span>)
                        : (<LoadingSpinner></LoadingSpinner>  )}</h3>
                    ) : (
                      <h3 className={styles.mintPriceText}>Price: {loaded==true ? (<span className={styles.priceSpan}>{mintPublicPrice}</span>)
                        : (<LoadingSpinner></LoadingSpinner>  )}</h3>
                    )}
                  
                    <h3 className={styles.mintLeftText}>You can mint: 
                    {loaded==true ? (<span className={styles.mintLeftSpan}>{mintLeft} NFTs</span>) : 
                    (<LoadingSpinner></LoadingSpinner>  ) }
                     </h3>
                     {loaded==true ? (
                      <>
                      {parseInt(mintLeft)>0 ? (
                        <button onClick={handleMint} className={styles.mintButton}>Mint NFT</button>
                      ) : (
                        <button className={styles.mintButtonDisabled}>Mint NFT</button>
                       
                       
                      )}
                      </>
                     ) : (
                      <>
                      <div>
                      
                      <button className={styles.mintButtonDisabled}>Mint NFT</button>
                      </div>
                       
                      </>
                     )}
                    
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