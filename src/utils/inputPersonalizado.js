import { InputGroup,Input,InputLeftAddon } from "@chakra-ui/react"
export default function InputPersonalizado ({type,label,w,onChange,defaultValue,value,variant,readOnly}){
 return (
    <InputGroup w={w}>
                <InputLeftAddon>{label}</InputLeftAddon>
                <Input variant={variant || "filled"} readOnly={readOnly} type={type} onChange={onChange} defaultValue={defaultValue} value={value} />
    </InputGroup>
 )
}