import { AppProps } from 'next/app'
import '../styles/globals.css'
import Router from "next/router"
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Header from '../components/Header'
import { GlobalState } from "../global/GlobalState"
import Footer from '../components/Footer'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.start())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GlobalState>
      <Header />
      <main className='containerPages'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </GlobalState>
  )
}

export default MyApp
