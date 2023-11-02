import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export const ShippingLine = () => {
  const params = [{label:"NAME",param:"name"}];
  const [CarteraForwarder] = useFetch(`${process.env.API_URL}/shipping-line`,undefined);

  return (
    <ContenedorTablas
      variant="table"
      data={CarteraForwarder}
      params={params}
      modalTitle="Shipping Line"
      url="shipping-line"
    />
  );
};