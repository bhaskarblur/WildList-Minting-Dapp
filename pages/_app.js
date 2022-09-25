import '../styles/globals.css'
import "@fontsource/work-sans" 
import "@fontsource/work-sans/400.css" 
import "@fontsource/work-sans/500.css" 
import "@fontsource/work-sans/600.css"
import "@fontsource/work-sans/700.css"
import "@fontsource/work-sans/800.css" 
import { Provider } from 'react-redux'
import { store } from '../config/store'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
