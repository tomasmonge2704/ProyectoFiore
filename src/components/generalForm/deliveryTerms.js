import { Select } from "@chakra-ui/react"
export const DeliveryTerms = ({fields, setFields}) => {
    const handleIndexChange = (e) => {
        setFields({ ...fields, deliveryTerms: e.target.value })
      };
    return (
    <Select value={fields.deliveryTerms ? fields.deliveryTerms : ""} onChange={(e) => handleIndexChange(e)}>
         <option value="" disabled>INCOTERMS</option>
        <option value="FOB">FOB</option>
        <option value="CFR">CFR</option>
        <option value="CIF">CIF</option>
      </Select>
    )
}