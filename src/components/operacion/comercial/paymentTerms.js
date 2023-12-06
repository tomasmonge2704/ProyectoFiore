import { Select } from "@chakra-ui/react";
import { useState,useEffect } from "react";
export const PaymentTerms = ({fields,handleChange,type,CarteraPaymentTerms}) => {
  const [paymentTerms, setPaymentTerms] = useState(undefined);
    useEffect(() => {
      if(type == "sale"){
        setPaymentTerms(fields.paymentTermsSale)
      }
      if(type == "purchase"){
        setPaymentTerms(fields.paymentTermsPurchase)
      }
    },[type,fields])
  const findElementByTitle = (name) => {
    const foundElement = CarteraPaymentTerms.find((item) => item.name === name);
    return foundElement ? foundElement.name : null;
  };
  const handleSelectChange = (event) => {
    if(type == "sale"){
      handleChange(findElementByTitle(event.target.value),"paymentTermsSale");
    }
    if(type == "purchase"){
      handleChange(findElementByTitle(event.target.value),"paymentTermsPurchase");
    }
  };

  return (
        <Select onChange={(e) => handleSelectChange(e)} value={paymentTerms ?  paymentTerms : ""}>
        <option value="" disabled>Payment Terms</option>
          {CarteraPaymentTerms.map((e, index) => (
            <option value={e.name} key={index}>
              {e.name}
            </option>
          ))}
        </Select>
  );
};
