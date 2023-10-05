import { Center,Spinner } from "@chakra-ui/react"
export const Loadder = ({size,height}) => {
    return(
        <Center h={height ? height : "80vh"}>
    <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size={size ? size : "xl"}
/>
    </Center>
    )
}