import { useEffect, useState } from "react";
import { SelectComponent } from "@/utils/select";
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
    <SelectComponent
    options={carteraIndex >= 0 ? CarteraBancaria[carteraIndex].banks : []}
    value={fields.empresa.bank ?  fields.empresa.bank.beneficiaryBank : ""}
    handleIndexChange={handleIndexChange}
    textDefault="Banco"
    param="beneficiaryBank"
  />
  );
};
