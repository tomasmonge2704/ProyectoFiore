import { createContext, useState } from "react";

export const CarteraBancariaContext = createContext();
export const CarteraClientesContext = createContext();
export const CarteraProveedoresContext = createContext();

export function CarterasProvider({ children }) {
  const [CarteraBancaria, setCarteraBancaria] = useState([
    { empresa: "DPL",cuit:"312312312",direccion:"sdasdasda", vatNumber:4124124},
    { empresa: "Duplo",cuit:"23124342423",direccion:"asfgsdg", vatNumber:52342 },
  ]);
  const [CarteraClientes, setCarteraClientes] = useState([
    { empresa: "DPL" },
    { empresa: "Duplo" },
  ]);
  const [CarteraProveedores, setProveedores] = useState([
    { empresa: "DPL" },
    { empresa: "Duplo" },
  ]);
  return (
    <CarteraBancariaContext.Provider
      value={{ CarteraBancaria, setCarteraBancaria }}
    >
      <CarteraClientesContext.Provider
        value={{ CarteraClientes, setCarteraClientes }}
      >
        <CarteraProveedoresContext.Provider
          value={{ CarteraProveedores, setProveedores }}
        >
          {children}
        </CarteraProveedoresContext.Provider>
      </CarteraClientesContext.Provider>
    </CarteraBancariaContext.Provider>
  );
}
