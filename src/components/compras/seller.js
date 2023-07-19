import InputPersonalizado from "@/utils/inputPersonalizado";
import { Select } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { CarteraProveedoresContext } from "../context/carterasContext";
export const Seller = ({
  nombre,
  setNombre,
  direccion,
  setDireccion,
  codigoPostal,
  setCodigoPostal,
  pais,
  setPais,
  cuit,
  setCuit,
}) => {
  const { CarteraProveedores } = useContext(CarteraProveedoresContext);
  const [indexCartera, setIndexCartera] = useState(0);
  const handleIndexChange = (e) => {
    setIndexCartera(parseInt(e.target.value));
  };
  useEffect(() => {
    setNombre(CarteraProveedores[indexCartera]?.empresa || "");
    setDireccion(CarteraProveedores[indexCartera]?.direccion || "");
    setCodigoPostal(CarteraProveedores[indexCartera]?.direccion2 || "");
    setPais(CarteraProveedores[indexCartera]?.pais || "");
    setCuit(CarteraProveedores[indexCartera]?.cuit || "");
  }, [indexCartera, CarteraProveedores]);
  return (
    <>
      <Select onChange={handleIndexChange}>
        {CarteraProveedores.map((e, index) => (
          <option value={index} key={index}>
            {e.empresa}
          </option>
        ))}
      </Select>
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
        label="Codigo postal"
        value={codigoPostal}
        onChange={(e) => setCodigoPostal(e.target.value)}
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
  );
};
