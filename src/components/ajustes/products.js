import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export const AjustesProductos = () => {
  const params = [
    {label:"DESCRIPTION",param:"description"},
    {label:"FAMILY ",param:"family"},
    {label:"FAMILY 2",param:"famili2"},
  ];
  const [CarteraProducts] = useFetch(`${process.env.API_URL}/products`,undefined);

  return (
    <ContenedorTablas
      variant="table"
      data={CarteraProducts}
      modalTitle="Product"
      params={params}
      url="products"
    />
  );
};
