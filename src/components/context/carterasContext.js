import { createContext, useState,useEffect } from "react";

export const CarteraBancariaContext = createContext();
export const CarteraClientesContext = createContext();
export const CarteraProveedoresContext = createContext();
export const CarteraPaymentTermsContext = createContext();
export const CarteraPuertosContext = createContext();
export const CarteraProductsContext = createContext();
export const CarteraPackingContext = createContext();

export function CarterasProvider({ children }) {
  const [CarteraPaymentTerms, setCarteraPaymentTerms] = useState([]);
  const [CarteraBancaria, setCarteraBancaria] = useState([]);
  const [CarteraClientes, setCarteraClientes] = useState([]);
  const [CarteraProveedores, setProveedores] = useState([]);
  const [CarteraPuertos, setCarteraPuertos] = useState([]);
  const [CarteraPacking, setCarteraPacking] = useState([]);
  const [CarteraProducts, setCarteraProducts] = useState([]);
useEffect(() => {
    fetch(`${process.env.API_URL}/cartera-clientes`)
  .then((response) => response.json())
    .then((data) => {
      setCarteraClientes(data);
    });
    fetch(`${process.env.API_URL}/cartera-bancaria`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraBancaria(data);
      });
    fetch(`${process.env.API_URL}/catalogo-puertos`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraPuertos(data);
      });
    fetch(`${process.env.API_URL}/catalogo-payment-terms`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraPaymentTerms(data);
      });
    fetch(`${process.env.API_URL}/catalogo-packing`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraPacking(data);
      });
    fetch(`${process.env.API_URL}/catalogo-products`)
      .then((response) => response.json())
      .then((data) => {
        setCarteraProducts(data);
      });
      fetch(`${process.env.API_URL}/cartera-proveedores`)
      .then((response) => response.json())
      .then((data) => {
        setProveedores(data);
      });
},[])
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
