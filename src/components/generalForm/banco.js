import { Select } from "@chakra-ui/react";
import { useMemo, useState } from "react";

export const SelectBanco = ({ fields, setFields,CarteraBancaria }) => {
  const [carteraIndex, setCarteraIndex] = useState(undefined);
  const [ bankName, setBankName] = useState(undefined);
  useMemo(() => {
    const index = CarteraBancaria.findIndex((elemento) => elemento.nombre === fields.empresa.nombre);
    if(index >= 0){
        setCarteraIndex(index);
      }
  },[fields.empresa])
  const handleIndexChange = (e) => {
    const bank = CarteraBancaria[carteraIndex].banks.find((elemento) => elemento.beneficiaryBank === e.target.value);
    setFields({ ...fields, empresa:{...fields.empresa,bank:bank}});
    setBankName(bank.beneficiaryBank);
  };
  return (
      <Select value={ bankName ? bankName : ""} onChange={(e) => handleIndexChange(e)}>
      <option value="" disabled>
        Banco
      </option>
      {carteraIndex >= 0 && CarteraBancaria[carteraIndex].banks.map((e, index) => (
          <option value={e.beneficiaryBank} key={index}>
            {e.beneficiaryBank}
          </option>
        ))}
      </Select>
  );
};
