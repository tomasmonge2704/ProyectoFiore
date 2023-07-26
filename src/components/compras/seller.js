import InputPersonalizado from "@/utils/inputPersonalizado";
import { Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Seller = ({ purchase,setPurchase, CarteraProveedores, detailView }) => {
  const [indexCartera, setIndexCartera] = useState(0);
  const [nombre, setNombre] = useState(purchase.seller.nombre || "");
  const [direccion, setDireccion] = useState(purchase.seller.direccion || "");
  const [direccion2, setDireccion2] = useState(purchase.seller.direccion2 || "");
  const [pais, setPais] = useState(purchase.seller.pais || "");
  const [cuit, setCuit] = useState(purchase.seller.cuit || "");

  const handleIndexChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setIndexCartera(newIndex);
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      seller: CarteraProveedores[newIndex],
    }));
  };
  useEffect(() => {
    if(purchase.seller.nombre){
      setIndexCartera(CarteraProveedores.findIndex((elemento) => elemento.nombre === purchase.seller.nombre));
    }
  }, [purchase]);
  
  // useEffect para sincronizar los cambios en los inputs con el estado 'seller' y establecer valores iniciales
  useEffect(() => {
    const initialSeller = CarteraProveedores[indexCartera];
    setNombre(initialSeller.nombre);
    setDireccion(initialSeller.direccion);
    setDireccion2(initialSeller.direccion2);
    setPais(initialSeller.pais);
    setCuit(initialSeller.cuit);
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      seller: initialSeller,
    }));
  }, [indexCartera, CarteraProveedores, setPurchase]);

  // useEffect para actualizar 'seller' cuando cambian los inputs
  useEffect(() => {
    setPurchase((prevPurchase) => ({
      ...prevPurchase,
      seller: {
        ...prevPurchase.seller,
        nombre,
        direccion,
        direccion2,
        pais,
        cuit,
      },
    }));
  }, [nombre, direccion, direccion2, pais, cuit, setPurchase]);

  return (
    <>
      <Select value={indexCartera} onChange={handleIndexChange}>
        {CarteraProveedores.map((e, index) => (
            <option value={index} key={index}>
              {e.nombre}
            </option>
        ))}
      </Select>
      {detailView && (
        <>
          <InputPersonalizado
            type="text"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <InputPersonalizado
            type="text"
            label="Direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <InputPersonalizado
            type="text"
            label="Direccion 2"
            value={direccion2}
            onChange={(e) => setDireccion2(e.target.value)}
          />
          <InputPersonalizado
            type="text"
            label="Pais"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
          <InputPersonalizado
            type="text"
            label="Cuit"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
          />
        </>
      )}
    </>
  );
};
