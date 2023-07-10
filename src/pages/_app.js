import '@/styles/globals.css';
import Chakra from '@/components/chakra';
import Fonts from '@/components/fonts';
export default function App({ Component, pageProps }) {
  return (
    <Chakra>
      <Fonts/>
  <Component {...pageProps} />
  </Chakra>
  )
}
