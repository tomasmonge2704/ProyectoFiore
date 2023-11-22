import { InputGroup,Input,InputLeftAddon } from "@chakra-ui/react"
export default function InputPersonalizado ({type,label,w,onChange,defaultValue,value,variant}){
 return (
    <InputGroup w={w}>
                <InputLeftAddon>{label}</InputLeftAddon>
                <Input variant={variant || "filled"} type={type} onChange={onChange} defaultValue={defaultValue} value={value} />
    </InputGroup>
 )
}