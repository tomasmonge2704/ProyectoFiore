import { TablePagination } from "@/utils/tablePagination";
export const AjustesConsignee = ({ CarteraConsignee }) => {
  const params = [
    { label: "NOMBRE", param: "nombre" },
    { label: "DIRECCION", param: "direccion" },
    { label: "DIRECCION 2", param: "direccion2" },
    { label: "DIRECCION 3", param: "direccion3" },
    { label: "COUNTRY", param: "country" },
    { label: "TAX ID", param: "taxId" },
  ];
  return (
    <TablePagination data={CarteraConsignee} params={params} url="consignee" />
  );
};
