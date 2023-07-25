import { Select, Card, CardBody, List,ListIcon,ListItem } from "@chakra-ui/react";
import { CarteraPaymentTermsContext } from "../context/carterasContext";
import { useContext, useState,useEffect } from "react";
import { CheckIcon } from "@chakra-ui/icons";
export const PaymentTerms = ({setPaymentTerms}) => {
  const { CarteraPaymentTerms } = useContext(CarteraPaymentTermsContext);
  const [tabIndex, setTabIndex] = useState(0);

  const handleSelectChange = (event) => {
    const newIndex = parseInt(event.target.value);
    setTabIndex(newIndex);
  };
  useEffect(() => {
    setPaymentTerms(CarteraPaymentTerms[tabIndex]);
  }, [tabIndex]);
  return (
    <Card w="100%">
      <CardBody>
        <Select onChange={handleSelectChange} value={tabIndex}>
          {CarteraPaymentTerms.map((e, index) => (
            <option value={index} key={index}>
              {e.title}
            </option>
          ))}
        </Select>
        <List spacing={3} mt={5}>
          {CarteraPaymentTerms[tabIndex] &&
            CarteraPaymentTerms[tabIndex].items.map((e, index) => (
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
