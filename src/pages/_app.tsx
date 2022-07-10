import { AppProps } from 'next/app'
import '../styles/globals.css'
import Router from "next/router"
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Header from '../components/Header'
import { GlobalState } from "../global/GlobalState"
import Footer from '../components/Footer'
import { useWindowSize } from '../hooks/useWindowResize'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.start())

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const size = useWindowSize()
  return (
    <GlobalState>
      <Header />
      <main className='containerPages'>
        <Component size={size} {...pageProps} />
      </main>
      <Footer />
    </GlobalState>
  )
}

export default MyApp
