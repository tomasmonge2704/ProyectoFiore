import { CarteraBancariaContext } from "../context/carterasContext";
import { useContext,useState,useEffect } from "react";
import {Select} from "@chakra-ui/react";
import InputPersonalizado from "@/utils/inputPersonalizado";
export const Buyer = ({direccion2,setDireccion2,direccion,setDireccion,vatNumber,setVatNumber}) => {
    const { CarteraBancaria } = useContext(CarteraBancariaContext);
    const [indexCartera, setIndexCartera] = useState(0);
    const handleIndexChange = (e) => {
      setIndexCartera(parseInt(e.target.value));
    };
    useEffect(() => {
      setDireccion2(CarteraBancaria[indexCartera]?.direccion2 || "");
      setDireccion(CarteraBancaria[indexCartera]?.direccion || "");
      setVatNumber(CarteraBancaria[indexCartera]?.vatNumber || "");
    }, [indexCartera, CarteraBancaria]);
  return (
    <>
      <Select onChange={handleIndexChange}>
        <option value={0}>
          {CarteraBancaria && CarteraBancaria[0].empresa}
        </option>
        <option value={1}>
          {CarteraBancaria && CarteraBancaria[1].empresa}
        </option>
      </Select>
      <InputPersonalizado
        type="text"
        label="Direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <InputPersonalizado
        type="text"
        label="Direccion2"
        value={direccion2}
        onChange={(e) => setDireccion2(e.target.value)}
      />
      <InputPersonalizado
        type="text"
        label="VAT NUMBER"
        value={vatNumber}
        onChange={(e) => setVatNumber(e.target.value)}
      />
    </>
  );
};
