import { TablePagination } from "@/utils/tablePagination";
import {Center,Spinner} from "@chakra-ui/react";
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
  const [loadData, setLoadData] = useState(false);
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
        setLoadData(true);
      });
  }, []);
  return (
    <>
      {loadData ? (
        <TablePagination
          data={CarteraProveedores}
          params={params}
          url="proveedor"
        />
      ) : (
        <Center h="80vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
    </>
  );
};
