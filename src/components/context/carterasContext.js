import { createContext, useState } from "react";

export const CarteraBancariaContext = createContext();
export const CarteraClientesContext = createContext();
export const CarteraProveedoresContext = createContext();
export const CarteraPaymentTermsContext = createContext();
export const CarteraPuertosContext = createContext();
export const CarteraProductsContext = createContext();
export const CarteraPackingContext = createContext();

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
        beneficiaryBank:"INTERNATIONAL FINANCE BANK 2",
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
        beneficiaryBank:"INTERNATIONAL FINANCE BANK 3",
        bankAdress:"777 SW 37th AVE. SUITE 100",
        swiftCode:"MIAMI, FL 33135, USA",
        beneficiaryName:"IFBKUS3M",
        beneficiaryAccountNumber:"1200073959"
      },{
        beneficiaryBank:"INTERNATIONAL FINANCE BANK 4",
        bankAdress:"777 SW 37th AVE. SUITE 100",
        swiftCode:"MIAMI, FL 33135, USA",
        beneficiaryName:"IFBKUS3M",
        beneficiaryAccountNumber:"1200073959"
      }]
    }
  ]);
  const [CarteraClientes, setCarteraClientes] = useState([
    {
      nombre: "test 1",
      direccion: "malagrino",
      direccion2: "1636",
      country: "arg",
      vatNumber: "2141241",
    },
    {
      nombre: "test 2",
      direccion: "malagrino",
      direccion2: "1636",
      country: "arg",
      vatNumber: "2141241",
    },
    {
      nombre: "Persona A",
      direccion: "Calle Principal",
      direccion2: "1234",
      country: "esp",
      vatNumber: "1234567",
    },
    {
      nombre: "Cliente B",
      direccion: "Avenida Central",
      direccion2: "987",
      country: "mex",
      vatNumber: "7654321",
    },
    {
      nombre: "Compañía Z",
      direccion: "Calle Industrial",
      direccion2: "555",
      country: "usa",
      vatNumber: "9876543",
    },
    {
      nombre: "test 3",
      direccion: "malagrino",
      direccion2: "1636",
      country: "arg",
      vatNumber: "2141241",
    },
    {
      nombre: "Persona A",
      direccion: "Calle Principal",
      direccion2: "1234",
      country: "esp",
      vatNumber: "1234567",
    },
    {
      nombre: "Cliente B",
      direccion: "Avenida Central",
      direccion2: "987",
      country: "mex",
      vatNumber: "7654321",
    },
    {
      nombre: "Compañía Y",
      direccion: "Calle Industrial",
      direccion2: "555",
      country: "usa",
      vatNumber: "9876543",
    },{
      nombre: "test 4",
      direccion: "malagrino",
      direccion2: "1636",
      country: "arg",
      vatNumber: "2141241",
    },
    {
      nombre: "Persona H",
      direccion: "Calle Principal",
      direccion2: "1234",
      country: "esp",
      vatNumber: "1234567",
    },
    {
      nombre: "Cliente B",
      direccion: "Avenida Central",
      direccion2: "987",
      country: "mex",
      vatNumber: "7654321",
    },
    {
      nombre: "test 5",
      direccion: "Calle Industrial",
      direccion2: "555",
      country: "usa",
      vatNumber: "9876543",
    }
  ]);
  const [CarteraProveedores, setProveedores] = useState([
    {
      nombre: "REFINERIA DEL CENTRO S.A.",
      direccion: "Cno. a Jesús María KM. 10 1/2",
      direccion2: "(5145) Juárez Celman",
      country: "Prov. de Córdoba - Rep. Argentina",
      cuit: "33-50134847-9",
      origin:"ARGENTINA",
      taxId:"30-64293730-4",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
    {
      nombre: "Bamidal S.A.",
      direccion: "25 de mayo 713, of 512",
      direccion2: "Montevideo",
      country: "Uruguay",
      cuit: "44-50134847-9",
      origin:"ARGENTINA",
      taxId:"216382660012",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
    {
      nombre: "REFINERIA DEL CENTRO S.A.",
      direccion: "Cno. a Jesús María KM. 10 1/2",
      direccion2: "(5145) Juárez Celman",
      country: "Prov. de Córdoba - Rep. Argentina",
      cuit: "33-50134847-9",
      origin:"ARGENTINA",
      taxId:"30-64293730-4",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
    {
      nombre: "Bonnin Hnos S.H.",
      direccion: "25 de mayo 713, of 512",
      direccion2: "Montevideo",
      country: "Uruguay",
      cuit: "44-50134847-9",
      origin:"ARGENTINA",
      taxId:"216382660012",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
    {
      nombre: "Cabritera Ojo De Agua Srl.",
      direccion: "Cno. a Jesús María KM. 10 1/2",
      direccion2: "(5145) Juárez Celman",
      country: "Prov. de Córdoba - Rep. Argentina",
      cuit: "33-50134847-9",
      origin:"ARGENTINA",
      taxId:"30-64293730-4",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    },
    {
      nombre: "Eduardo Stertz Srl",
      direccion: "25 de mayo 713, of 512",
      direccion2: "Montevideo",
      country: "Uruguay",
      cuit: "44-50134847-9",
      origin:"ARGENTINA",
      taxId:"216382660012",
      plantNumber:"4750 - Refineria del centro S.A",
      brand:"BUSTOS BELTRAN"
    }
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
  ]);
  const [CarteraPacking, setCarteraPacking] = useState([
  {nombre:"10 kgs - bulk",weight:10},{nombre:"10 kgs - bulk",weight:10},{nombre:"10 kgs - bulk",weight:10},{nombre:"10 kgs - bulk",weight:10},{nombre:"10 kgs - bulk",weight:10}
  ]);
  const [CarteraProducts, setCarteraProducts] = useState([
    { family: "Meat", famili2: "Beef Offals", description: "Frozen Beef Green Tripes" },
    { family: "Meat", famili2: "Beef Offals", description: "Frozen Beef Kidneys" },
    { family: "Meat", famili2: "Beef Offals", description: "Frozen Beef Lips" },
    { family: "Meat", famili2: "Beef Offals", description: "Frozen Beef Tails" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Breast skinless, boneless, with innerfillet" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Breast skinless, boneless, without innerfillet" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Feet, A grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Feet, AB grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Feet, B grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Gizzards" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Grillers" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Hearts" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Leg Quarters, A grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Leg Quarters, B grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Livers" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken MDM" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Necks" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Paws, A grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Paws, A grade -Jumbo-" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Paws, AB grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Paws, B grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Paws, BC grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Paws, C grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Shanks" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Shawarma" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Wings, A grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Wings, AB grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Chicken Wings, B grade" },
    { family: "Meat", famili2: "Chicken", description: "Frozen Heavy Hen Leg Quarters" },
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
            <CarteraPuertosContext.Provider value={{CarteraPuertos,setCarteraPuertos }}>
              <CarteraPackingContext.Provider value={{CarteraPacking, setCarteraPacking}}>
              <CarteraProductsContext.Provider value={{CarteraProducts, setCarteraProducts}}>
            {children}
            </CarteraProductsContext.Provider>
            </CarteraPackingContext.Provider>
            </CarteraPuertosContext.Provider>
          </CarteraPaymentTermsContext.Provider>
        </CarteraProveedoresContext.Provider>
      </CarteraClientesContext.Provider>
    </CarteraBancariaContext.Provider>
  );
}
