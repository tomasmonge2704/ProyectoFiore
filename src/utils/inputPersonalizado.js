import { InputGroup,Input,InputLeftAddon } from "@chakra-ui/react"
export default function InputPersonalizado ({type,label,w,onChange}){
 return (
    <InputGroup w={w}>
                <InputLeftAddon>{label}</InputLeftAddon>
                <Input variant="filled" type={type} onChange={onChange} />
    </InputGroup>
 )
}