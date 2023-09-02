import { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";
export const Empresa = ({ fields,setFields,CarteraBancaria }) => {
  const [indexCartera, setIndexCartera] = useState(undefined);
  const [nombre, setNombre] = useState(fields.empresa.nombre || "");
  const [direccion, setDireccion] = useState(fields.empresa.nombre || "");
  const [direccion2, setDireccion2] = useState(fields.empresa.nombre || "");
  const [vatNumber, setVatNumber] = useState(fields.empresa.nombre || "");
  const handleIndexChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setIndexCartera(newIndex);
    setFields({...fields,
      empresa: CarteraBancaria[newIndex],
    });
  };
  useEffect(() => {
    const index = CarteraBancaria.findIndex((elemento) => elemento.nombre === fields.empresa.nombre);
    if(fields.empresa.nombre  && index >= 0){
      setIndexCartera(index);
    }
  }, [fields]);
  // useEffect para sincronizar los cambios en los inputs con el estado 'empresa' y establecer valores iniciales
  useEffect(() => {
    if(indexCartera || indexCartera == 0){
    const initialSeller = CarteraBancaria[indexCartera];
    setNombre(initialSeller.nombre);
    setDireccion(initialSeller.direccion);
    setDireccion2(initialSeller.direccion2);
    setVatNumber(initialSeller.vatNumber);
    setFields((prevPurchase) => ({
      ...prevPurchase,
      empresa: initialSeller,
    }));
  }
  }, [indexCartera, CarteraBancaria, setFields]);

  // useEffect para actualizar 'empresa' cuando cambian los inputs
  useEffect(() => {
    setFields((prevPurchase) => ({
      ...prevPurchase,
      empresa: {
        ...prevPurchase.empresa,
        nombre,
        direccion,
        direccion2,
        vatNumber,
      },
    }));
  }, [nombre, direccion, direccion2, vatNumber, setFields]);
  return (
      <Select value={indexCartera || indexCartera == 0 ? indexCartera : ""} onChange={handleIndexChange}>
      <option value="" disabled>
        Empresa
      </option>
        {CarteraBancaria.map((e, index) => (
          <option value={index} key={index}>
            {e.nombre}
          </option>
        ))}
      </Select>
  );
};