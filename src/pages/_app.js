import '@/styles/globals.css'
import Chakra from '@/components/chakra'

export default function App({ Component, pageProps }) {
  return (
    <Chakra>
  <Component {...pageProps} />
  </Chakra>
  )
}
