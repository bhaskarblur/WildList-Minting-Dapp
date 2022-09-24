import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HeaderTop from '../components/HeaderTop'
import { useState } from 'react'
import HeroSection from '../components/HeroSection'
export default function Home() {
  const [accounts, SetAccounts, popup, setPopup,type, setType] = useState([]);
  function closePopup() {
    setPopup(null);
}
  return (
    <div className={styles.container}>
      <Head>
        <title>WildList NFTs Minting Dapp</title>
        <meta name="description" content="WildList NFTs" />
        <link rel="icon" href="/logoTop.svg" />
      </Head>
      <HeaderTop accounts={accounts} SetAccounts={SetAccounts}></HeaderTop>
      <HeroSection accounts={accounts} SetAccounts={SetAccounts} type={type} setType={setType}></HeroSection>
    </div>
  )
}
