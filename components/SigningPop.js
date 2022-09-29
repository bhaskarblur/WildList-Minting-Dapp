import React, { Component, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import { ethers } from "ethers";
import LoginPop from './LoginPopup'
import LoadingSpinner from './Spinner_2';
import LoginPop_2 from './LoginPopup_2';
const SigningPop = ({sign,setSign}) => {
    function openPopup() {
        setSign("Open");
    }
    function closePopup() {
        setSign(null);
    }
    return (
        <div className={styles.popUp}>
     
        <div className={styles.popupDiv}>
        <div onClick={openPopup} className={styles.crossBtn}>
        <Image  src='/cross.png' width={18} height={18}></Image> </div>
        <h2 className={styles.popupHead}>Transaction pending</h2>
        <h3 className={styles.popupSubHead}>It will take some time to finish. You can always close this message. 
        You will get the transaction hash when finished.</h3>
        <div className={styles.spinnerDiv}>
        <LoadingSpinner className={styles.spin}></LoadingSpinner> 
        </div>
       
        </div>
    </div>

    )
  }

export default SigningPop