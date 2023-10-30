import { useEffect, useState } from "react";
import { GridCards } from "@/utils/gridCards";
export default function Proveedores() {
  const params = [
    {label:"Company Name",param:"nombre"},
    {label:"Address Line 1",param:"direccion"},
    {label:"Address Line 2",param:"direccion2"},
    {label:"Country",param:"country"},
    {label:"Tax ID",param:"vatNumber"},
  ];
  const [CarteraClientes, setCarteraClientes] = useState(undefined);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.API_URL}/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarteraClientes(data);
      });
  }, []);

  return (
    <GridCards data={CarteraClientes} params={params} url="client" />
  );
}
