import { InputGroup,Input,InputRightAddon } from "@chakra-ui/react"
export default function InputRightPersonalizado ({type,label,w,onChange,defaultValue,value}){
 return (
    <InputGroup w={w}>
                <Input variant="filled" type={type} onChange={onChange} defaultValue={defaultValue} value={value} />
                <InputRightAddon>{label}</InputRightAddon>
    </InputGroup>
 )
}