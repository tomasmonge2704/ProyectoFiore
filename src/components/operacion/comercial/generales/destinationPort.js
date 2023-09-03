import { InputSearch } from "@/utils/inputSearch";

export const DestinationPort = ({ fields, setFields, CarteraPuertos }) => {
  const findCountryByPort = (port, portArray) => {
    const foundPort = portArray.find((item) => item.port === port);
    return foundPort ? foundPort.country : null;
  };
  const handleIndexChange = (e) => {
    const country = findCountryByPort(e.target.value, CarteraPuertos);
    setFields({
      ...fields,
      destinationPort: e.target.value,
      destinationCountry: country,
      exportTo: country,
    });
  };

  return (
    <InputSearch
      searchParam="port"
      selectChangeLogic={handleIndexChange}
      placeholder="Search Port..."
      cartera={CarteraPuertos}
    />
  );
};
