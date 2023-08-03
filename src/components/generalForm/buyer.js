import { CarteraClientesContext } from "../context/carterasContext";
import { useContext, useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
import InputPersonalizado from "@/utils/inputPersonalizado";
export const Buyer = ({ fields,setFields, detailView }) => {
  const { CarteraClientes } = useContext(CarteraClientesContext);
  const [indexCartera, setIndexCartera] = useState(undefined);
  const [nombre, setNombre] = useState(fields.buyer.nombre || "");
  const [direccion, setDireccion] = useState(fields.buyer.nombre || "");
  const [direccion2, setDireccion2] = useState(fields.buyer.nombre || "");
  const [vatNumber, setVatNumber] = useState(fields.buyer.nombre || "");
  const handleIndexChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setIndexCartera(newIndex);
    setFields((prevPurchase) => ({
      ...prevPurchase,
      buyer: CarteraClientes[newIndex],
    }));
  };
  useEffect(() => {
    const index = CarteraClientes.findIndex((elemento) => elemento.nombre === fields.buyer.nombre);
    if(fields.buyer.nombre  && index >= 0){
      setIndexCartera(index);
    }
  }, [fields]);
  // useEffect para sincronizar los cambios en los inputs con el estado 'buyer' y establecer valores iniciales
  useEffect(() => {
    if(indexCartera || indexCartera == 0){
    const initialSeller = CarteraClientes[indexCartera];
    setNombre(initialSeller.nombre);
    setDireccion(initialSeller.direccion);
    setDireccion2(initialSeller.direccion2);
    setVatNumber(initialSeller.vatNumber);
    setFields((prevPurchase) => ({
      ...prevPurchase,
      buyer: initialSeller,
    }));
  }
  }, [indexCartera, CarteraClientes, setFields]);

  // useEffect para actualizar 'buyer' cuando cambian los inputs
  useEffect(() => {
    setFields((prevPurchase) => ({
      ...prevPurchase,
      buyer: {
        ...prevPurchase.buyer,
        nombre,
        direccion,
        direccion2,
        vatNumber,
      },
    }));
  }, [nombre, direccion, direccion2, vatNumber, setFields]);
  return (
    <>
      <Select value={indexCartera || indexCartera == 0 ? indexCartera : ""} onChange={handleIndexChange}>
      <option value="" disabled>
        Buyer
      </option>
        {CarteraClientes.map((e, index) => (
          <option value={index} key={index}>
            {e.nombre}
          </option>
        ))}
      </Select>
      {detailView && (
        <>
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
      )}
    </>
  );
};
