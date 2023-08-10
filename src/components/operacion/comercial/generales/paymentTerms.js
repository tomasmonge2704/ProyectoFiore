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
  const findElementByTitle = (title) => {
    const foundElement = CarteraPaymentTerms.find((item) => item.title === title);
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
        <Select onChange={(e) => handleSelectChange(e)} value={paymentTerms ?  paymentTerms.title : ""}>
        <option value="" disabled>Payment Terms</option>
          {CarteraPaymentTerms.map((e, index) => (
            <option value={e.title} key={index}>
              {e.title}
            </option>
          ))}
        </Select>
  );
};
