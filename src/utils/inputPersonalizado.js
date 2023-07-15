import { InputGroup,Input,InputLeftAddon } from "@chakra-ui/react"
export default function InputPersonalizado ({type,label,w,onChange,defaultValue,value}){
 return (
    <InputGroup w={w}>
                <InputLeftAddon>{label}</InputLeftAddon>
                <Input variant="filled" type={type} onChange={onChange} defaultValue={defaultValue} value={value} />
    </InputGroup>
 )
}