import { Provider } from '@/components/helpers/context'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Head>
        <script
          data-goatcounter="https://musicalconquest.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
