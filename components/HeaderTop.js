import React, { Component, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import { ethers } from "ethers";
import LoginPop from '../components/LoginPopup'
import LoginPop_2 from './LoginPopup_2';
const HeaderTop = ({ accounts,SetAccounts}) => {
    const [popup,setPopup]=useState([]);
    const popupStat=Boolean(popup);
    const [type,setType] = useState([]);
    const isConnected= Boolean(accounts[0]);
    const [network, setNetwork] = useState();
    const [provider,setProvider]= useState([]);
    const [wallet,SetWallet] = useState([]);
    const address=String(accounts).substring(0,6);
    async function connectMetamask(){
        if(window.ethereum) {
            const accounts= await window.ethereum.request({
                method:"eth_requestAccounts"
            });
            SetAccounts(accounts)
        }
    }

    function openPopup() {
        setPopup("Open");
    }
    function closePopup() {
        setPopup(null);
    }
    return (
      <div className={styles.Nav}>
      {popupStat ? (
        <div></div>
    ) : (
        <LoginPop_2 accounts={accounts} SetAccounts={SetAccounts} 
        popup={popup} setPopup={setPopup} type={type} setType={setType} network={network} setNetwork={setNetwork}
        provider={provider} setProvider={setProvider} wallet={wallet} SetWallet={SetWallet}></LoginPop_2>
  
    )}
        <div className={styles.leftNav}>
            <a href='#'><Image className={styles.topLogo} src='/logoTop.svg' width={180} height={90}  style={{
                cursor:'pointer'
            }}></Image></a>
        </div>
        <div className={styles.rightNav}>
        <ul className={styles.socialList}>
                <li className={styles.socialListLi}>   
                     <div className={styles.socialBg}>
                     <Image  src='/social_1.png' width={18} height={18}  style={{
                cursor:'pointer'
            }}></Image>
                    </div>
                </li>
                <li className={styles.socialListLi}>   
                    <div className={styles.socialBg}>
                    <Image  src='/social_2.png' width={18} height={18}  style={{
                cursor:'pointer'
            }}></Image>
                   </div>
               </li>
               <li className={styles.socialListLi}>   
                <div className={styles.socialBg}>
                <Image src='/social_3.png' width={18} height={18}  style={{
                cursor:'pointer'
            }}></Image>
               </div>
           </li>
            </ul>
            
            {isConnected ? (
               <button className={styles.walletButton}>Wallet:{address}</button>
            ) : (
                <div></div>
            )}
        </div>
      </div>
    )
  }

export default HeaderTop