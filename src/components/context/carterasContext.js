import { createContext, useState } from "react";

export const CarteraBancariaContext = createContext();
export const CarteraClientesContext = createContext();
export const CarteraProveedoresContext = createContext();
export const CarteraPaymentTermsContext = createContext();
export const CarteraPuertosContext = createContext();

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
      empresa:"DPL",
      direccion: "30 North Gould Street, Suit R",
      direccion2: "Sheridan, WY 82801, USA",
      vatNumber: "92-0566625",
      banks:[{
        beneficiaryBank:"INTERNATIONAL FINANCE BANK",
        bankAdress:"777 SW 37th AVE. SUITE 100",
        swiftCode:"MIAMI, FL 33135, USA",
        beneficiaryName:"IFBKUS3M",
        beneficiaryAccountNumber:"1200073959"
      },{
        beneficiaryBank:"INTERNATIONAL FINANCE BANK",
        bankAdress:"777 SW 37th AVE. SUITE 100",
        swiftCode:"MIAMI, FL 33135, USA",
        beneficiaryName:"IFBKUS3M",
        beneficiaryAccountNumber:"1200073959"
      }]
    },
    {
      nombre: "Duplo",
      empresa:"Duplo",
      direccion: "40 North Gould Street, Suit R",
      direccion2: "Sheridan, WY 8000, USA",
      vatNumber: "90-000000",
      banks:[{
        beneficiaryBank:"INTERNATIONAL FINANCE BANK",
        bankAdress:"777 SW 37th AVE. SUITE 100",
        swiftCode:"MIAMI, FL 33135, USA",
        beneficiaryName:"IFBKUS3M",
        beneficiaryAccountNumber:"1200073959"
      },{
        beneficiaryBank:"INTERNATIONAL FINANCE BANK",
        bankAdress:"777 SW 37th AVE. SUITE 100",
        swiftCode:"MIAMI, FL 33135, USA",
        beneficiaryName:"IFBKUS3M",
        beneficiaryAccountNumber:"1200073959"
      }]
    }
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
      origin:"ARGENTINA",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
    {
      nombre: "TEST S.A.",
      direccion: "Test Jesús María KM. 10 1/2",
      direccion2: "(5145) Juárez Celman",
      pais: "Test - Rep. Argentina",
      cuit: "44-50134847-9",
      origin:"ARGENTINA",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
  ]);
  const [CarteraPuertos, setCarteraPuertos] = useState([
    {port:"Destination port 1",
    country:"Buenos aires"
  },
  {port:"Destination port 2",
    country:"uruguay"
  },
  {port:"Destination port 3",
    country:"china"
  },
  ])
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
            <CarteraPuertosContext.Provider value={{CarteraPuertos,setCarteraPuertos }}>
            {children}
            </CarteraPuertosContext.Provider>
          </CarteraPaymentTermsContext.Provider>
        </CarteraProveedoresContext.Provider>
      </CarteraClientesContext.Provider>
    </CarteraBancariaContext.Provider>
  );
}
