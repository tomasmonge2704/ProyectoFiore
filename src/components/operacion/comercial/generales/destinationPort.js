import { Select } from "@chakra-ui/react";

export const DestinationPort = ({ fields, setFields,CarteraPuertos }) => {
  const findCountryByPort = (port, portArray) => {
    const foundPort = portArray.find((item) => item.port === port);
    return foundPort ? foundPort.country : null;
  };
  const handleIndexChange = (e) => {
    const country = findCountryByPort(e.target.value, CarteraPuertos);
    setFields({...fields,destinationPort:e.target.value,destinationCountry:country,exportTo:country});
  };

  return (
    <Select
      value={fields.destinationPort ? fields.destinationPort : ""}
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
