import { Select, Card, CardBody, List,ListIcon,ListItem } from "@chakra-ui/react";
import { CarteraPaymentTermsContext } from "../context/carterasContext";
import { useContext } from "react";
import { CheckIcon } from "@chakra-ui/icons";
export const PaymentTerms = ({purchase,setPurchase}) => {
  const { CarteraPaymentTerms } = useContext(CarteraPaymentTermsContext);
  const findElementByTitle = (title) => {
    const foundElement = CarteraPaymentTerms.find((item) => item.title === title);
    return foundElement ? foundElement : null;
  };
  const handleSelectChange = (event) => {
    setPurchase({...purchase, paymentTerms:findElementByTitle(event.target.value)});
  };

  return (
    <Card w="100%">
      <CardBody>
        <Select onChange={(e) => handleSelectChange(e)} value={purchase.paymentTerms.title || ""}>
        <option value="" disabled>Payment Terms</option>
          {CarteraPaymentTerms.map((e, index) => (
            <option value={e.title} key={index}>
              {e.title}
            </option>
          ))}
        </Select>
        <List spacing={3} mt={5}>
          {purchase.paymentTerms?.title &&
            purchase.paymentTerms.items.map((e, index) => (
              <ListItem key={index}>
                <ListIcon as={CheckIcon} color="green.500" />
                {e.porcentaje}% {e.descripcion}
              </ListItem>
            ))}
        </List>
      </CardBody>
    </Card>
  );
};
