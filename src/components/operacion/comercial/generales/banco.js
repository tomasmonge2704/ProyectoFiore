import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const SelectBanco = ({ fields, setFields,empresa,CarteraBancaria }) => {
  const [carteraIndex, setCarteraIndex] = useState(undefined);
  useEffect(() => {
    if(CarteraBancaria.length) {
    const index = CarteraBancaria.findIndex((elemento) => elemento.empresa === empresa);
    setCarteraIndex(index);
    }
  },[empresa,CarteraBancaria])
  const handleIndexChange = (e) => {
    const bank = CarteraBancaria[carteraIndex].banks.find((elemento) => elemento.beneficiaryBank === e.target.value);
    setFields({ ...fields, empresa:{...fields.empresa,bank:bank}});
  };
  return (
      <Select value={fields.empresa.bank.beneficiaryBank} onChange={(e) => handleIndexChange(e)}>
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
