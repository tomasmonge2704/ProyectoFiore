import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";

export const AjustesPacking = () => {
  const params = [{label:"NAME",param:"name"}];
  const [CarteraPacking] = useFetch(`${process.env.API_URL}/packing`,undefined);

  return (
    <ContenedorTablas
      variant="table"
      data={CarteraPacking}
      params={params}
      modalTitle="Packing"
      url="packing"
    />
  );
};

