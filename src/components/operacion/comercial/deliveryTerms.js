import { Select } from "@chakra-ui/react"
import { useEffect, useState } from "react";
export const DeliveryTerms = ({fields, handleChange,type}) => {
    const [deliveryTerms, setDeliveryTerms] = useState(type);
    useEffect(() => {
      if(type == "sale"){
        setDeliveryTerms(fields.deliveryTermsSale)
      }
      if(type == "purchase"){
        setDeliveryTerms(fields.deliveryTermsPurchase)
      }
    },[type,fields])
    const handleIndexChange = (e) => {
        if(type == "sale"){
          handleChange(e.target.value,"deliveryTermsSale");
        }
        if(type == "purchase"){
          handleChange(e.target.value,"deliveryTermsPurchase");
        }
      };
    return (
    <Select value={deliveryTerms ? deliveryTerms : ""} onChange={(e) => handleIndexChange(e)}>
         <option value="" disabled>INCOTERMS</option>
        <option value="FOB">FOB</option>
        <option value="CFR">CFR</option>
        <option value="CIF">CIF</option>
      </Select>
    )
}