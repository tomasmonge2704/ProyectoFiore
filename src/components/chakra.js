import {
  ChakraProvider,
} from '@chakra-ui/react'
export default function Chakra({ children }) {

  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  )
}