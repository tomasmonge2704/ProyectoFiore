import { TablePagination } from "@/utils/tablePagination";
import useFetch from "@/hooks/useFetch";
export const AjustesProductos = () => {
  const params = [
    {label:"FAMILY ",param:"family"},
    {label:"FAMILY 2",param:"famili2"},
    {label:"DESCRIPTION",param:"description"},
  ];
  const [CarteraProducts, setCartera] = useFetch(`${process.env.API_URL}/products`,undefined);

  return (
    <TablePagination
      data={CarteraProducts}
      setData={setCartera}
      modalTitle="Edit Product"
      params={params}
      url="products"
    />
  );
};
