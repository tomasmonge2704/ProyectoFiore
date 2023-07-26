import { CarteraBancariaContext } from "../context/carterasContext";
import { useContext,useState,useEffect } from "react";
import {Select} from "@chakra-ui/react";
import InputPersonalizado from "@/utils/inputPersonalizado";
export const Buyer = ({setPurchase}) => {
    const { CarteraBancaria } = useContext(CarteraBancariaContext);
    const [indexCartera, setIndexCartera] = useState(0);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [direccion2, setDireccion2] = useState("");
    const [vatNumber, setVatNumber] = useState("");
    const handleIndexChange = (e) => {
      const newIndex = parseInt(e.target.value);
      setIndexCartera(newIndex);
      setPurchase((prevPurchase) => ({
        ...prevPurchase,
        buyer: CarteraBancaria[newIndex],
      }));
    };
    // useEffect para sincronizar los cambios en los inputs con el estado 'seller' y establecer valores iniciales
    useEffect(() => {
      const initialSeller = CarteraBancaria[indexCartera];
      setNombre(initialSeller.nombre);
      setDireccion(initialSeller.direccion);
      setDireccion2(initialSeller.direccion2);
      setVatNumber(initialSeller.vatNumber);
      setPurchase((prevPurchase) => ({
        ...prevPurchase,
        buyer: initialSeller,
      }));
    }, [indexCartera, CarteraBancaria, setPurchase]);
  
    // useEffect para actualizar 'buyer' cuando cambian los inputs
    useEffect(() => {
      setPurchase((prevPurchase) => ({
        ...prevPurchase,
        buyer: {
          ...prevPurchase.seller,
          nombre,
          direccion,
          direccion2,
          vatNumber
        },
      }));
    }, [nombre, direccion, direccion2,vatNumber, setPurchase]);
  return (
    <>
      <Select onChange={handleIndexChange}>
        {CarteraBancaria.map((e,index) => (
          <option value={index} key={index}>
          {e.nombre}
        </option>
        ))}
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
