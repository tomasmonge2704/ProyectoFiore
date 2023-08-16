import { Select } from "@chakra-ui/react";
import { CarteraPaymentTermsContext } from "@/components/context/carterasContext";
import { useContext,useState,useEffect } from "react";
export const PaymentTerms = ({fields,setFields,type}) => {
  const { CarteraPaymentTerms } = useContext(CarteraPaymentTermsContext);
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
    return foundElement ? foundElement : null;
  };
  const handleSelectChange = (event) => {
    if(type == "sale"){
      setFields({...fields, paymentTermsSale:findElementByTitle(event.target.value)});
    }
    if(type == "purchase"){
      setFields({...fields, paymentTermsPurchase:findElementByTitle(event.target.value)});
    }
  };

  return (
        <Select onChange={(e) => handleSelectChange(e)} value={paymentTerms ?  paymentTerms.name : ""}>
        <option value="" disabled>Payment Terms</option>
          {CarteraPaymentTerms.map((e, index) => (
            <option value={e.name} key={index}>
              {e.name}
            </option>
          ))}
        </Select>
  );
};
