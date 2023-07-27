import { Select } from "@chakra-ui/react";
import { useContext } from "react";
import { CarteraPuertosContext } from "../context/carterasContext";
export const DestinationPort = ({ operation, setOperation }) => {
  const {CarteraPuertos} = useContext(CarteraPuertosContext);
  const findCountryByPort = (port, portArray) => {
    const foundPort = portArray.find((item) => item.port === port);
    return foundPort ? foundPort.country : null;
  };
  const handleIndexChange = (e) => {
    const country = findCountryByPort(e.target.value, CarteraPuertos);
    setOperation((prevOperation) => ({
      ...prevOperation,
      destinationPort:e.target.value,
      destinationCountry:country
    }));
  };

  return (
    <Select
      value={operation.destinationPort ? operation.destinationPort : ""}
      onChange={(e) => handleIndexChange(e)}
    >
      <option value="" disabled>
        Destination Port
      </option>
      {CarteraPuertos.map((e,index) => (
        <option value={e.port} key={index}>{e.port}</option>
      ))}
    </Select>
  );
};
