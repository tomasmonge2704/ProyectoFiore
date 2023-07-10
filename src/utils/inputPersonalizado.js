import { InputGroup,Input,InputLeftAddon } from "@chakra-ui/react"
export default function InputPersonalizado ({type,label,w,onChange}){
 return (
    <InputGroup w={w}>
                <InputLeftAddon children={label} />
                <Input variant="filled" type={type} onChange={onChange} />
    </InputGroup>
 )
}