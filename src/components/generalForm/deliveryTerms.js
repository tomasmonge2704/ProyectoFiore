import { Select } from "@chakra-ui/react"
export const DeliveryTerms = ({purchase, setPurchase}) => {
    const handleIndexChange = (e) => {
        setPurchase({ ...purchase, deliveryTerms: e.target.value })
      };
    return (
    <Select value={purchase.deliveryTerms ? purchase.deliveryTerms : ""} onChange={(e) => handleIndexChange(e)}>
         <option value="" disabled>INCOTERMS</option>
        <option value="FOB">FOB</option>
        <option value="CFR">CFR</option>
        <option value="CIF">CIF</option>
      </Select>
    )
}