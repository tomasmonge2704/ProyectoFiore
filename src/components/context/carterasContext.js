import { createContext, useState } from "react";

export const CarteraBancariaContext = createContext();
export const CarteraClientesContext = createContext();
export const CarteraProveedoresContext = createContext();
export const CarteraPaymentTermsContext = createContext();

export function CarterasProvider({ children }) {
  const [CarteraPaymentTerms, setCarteraPaymentTerms] = useState([
    {
      title:"60/40",
      items: [
        {
          porcentaje: 40,
          descripcion: "IN ADVANCE",
        },
        {
          porcentaje: 60,
          descripcion: "TT AGAINST COPY OF ORIGINAL DOCS BY EMAIL ",
        },
      ],
    },
    {
      title:"70/30",
      items: [
        {
          porcentaje: 70,
          descripcion: "IN ADVANCE",
        },
        {
          porcentaje: 30,
          descripcion: "TT AGAINST COPY OF ORIGINAL DOCS BY EMAIL ",
        },
      ],
    }
  ]);
  const [CarteraBancaria, setCarteraBancaria] = useState([
    {
      nombre: "DPL Trading LLC",
      direccion: "30 North Gould Street, Suit R",
      direccion2: "Sheridan, WY 82801, USA",
      vatNumber: "92-0566625",
    },
    {
      nombre: "Duplo",
      direccion: "40 North Gould Street, Suit R",
      direccion2: "Sheridan, WY 8000, USA",
      vatNumber: "90-000000",
    },
  ]);
  const [CarteraClientes, setCarteraClientes] = useState([
    {
      cliente: "Test 1",
      nombre: "test 1",
      direccion: "malagrino",
      codigoPostal: "1636",
      pais: "arg",
      cuit: "2141241",
    },
    {
      cliente: "Test 2",
      nombre: "test 2",
      direccion: "malagrino",
      codigoPostal: "1636",
      pais: "arg",
      cuit: "5346534",
    },
  ]);
  const [CarteraProveedores, setProveedores] = useState([
    {
      nombre: "REFINERIA DEL CENTRO S.A.",
      direccion: "Cno. a Jesús María KM. 10 1/2",
      direccion2: "(5145) Juárez Celman",
      pais: "Prov. de Córdoba - Rep. Argentina",
      cuit: "33-50134847-9",
    },
    {
      nombre: "TEST S.A.",
      direccion: "Test Jesús María KM. 10 1/2",
      direccion2: "(5145) Juárez Celman",
      pais: "Test - Rep. Argentina",
      cuit: "44-50134847-9",
    },
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
          <CarteraPaymentTermsContext.Provider
            value={{ CarteraPaymentTerms, setCarteraPaymentTerms }}
          >
            {children}
          </CarteraPaymentTermsContext.Provider>
        </CarteraProveedoresContext.Provider>
      </CarteraClientesContext.Provider>
    </CarteraBancariaContext.Provider>
  );
}
