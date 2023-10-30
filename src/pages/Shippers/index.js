import { GridCards } from "@/utils/gridCards";
import { useState,useEffect } from "react";
export default function Proveedores () {
  const params = [
    {label:"Company Name",param:"nombre"},
    {label:"Address Line 1",param:"direccion"},
    {label:"Address Line 2",param:"direccion2"},
    {label:"Country",param:"country"},
    {label:"Tax ID",param:"taxId"},
    {label:"Plant No.",param:"plantNumber"},
    {label:"Brand",param:"brand"},
  ];
  const [CarteraProveedores, setCarteraProveedores] = useState(undefined);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/proveedor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraProveedores(data);
      });
  }, []);
  return (
    <GridCards data={CarteraProveedores} params={params} url="proveedor"  />
  );
};
