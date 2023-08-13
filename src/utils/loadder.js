import { Center,Spinner } from "@chakra-ui/react"
export const Loadder = () => {
    return(
        <Center h="80vh">
    <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
    </Center>
    )
}