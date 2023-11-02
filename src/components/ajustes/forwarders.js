import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export const Forwarders = () => {
  const params = [{label:"NAME",param:"name"}];
  const [CarteraForwarder] = useFetch(`${process.env.API_URL}/forwarder`,undefined);

  return (
    <ContenedorTablas
      variant="table"
      data={CarteraForwarder}
      params={params}
      modalTitle="Forwarder"
      url="forwarder"
    />
  );
};