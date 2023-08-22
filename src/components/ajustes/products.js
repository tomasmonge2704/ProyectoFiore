import { TablePagination } from "@/utils/tablePagination";
export const AjustesProductos = ({ CarteraProducts }) => {
  const params = [
    {label:"FAMILY ",param:"family"},
    {label:"FAMILY 2",param:"famili2"},
    {label:"DESCRIPTION",param:"description"},
  ];

  return (
    <TablePagination
      data={CarteraProducts}
      params={params}
      url="products"
    />
  );
};
