import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export const Puertos = () => {
  const params = [
    {label:"POD",param:"pod"},
    {label:"PORT",param:"port"},
    {label:"COUNTRY",param:"country"},
    {label:"REGION",param:"region"}
  ];
  const [CarteraPuertos] = useFetch(`${process.env.API_URL}/puertos`,undefined);

  return (
    <ContenedorTablas
      variant="table"
      data={CarteraPuertos}
      params={params}
      url="puertos"
      modalTitle="Ports"
    />
  );
};
