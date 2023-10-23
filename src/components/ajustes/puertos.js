import { TablePagination } from "@/utils/tablePagination";
import useFetch from "@/hooks/useFetch";
export const Puertos = () => {
  const params = [
    {label:"POD",param:"pod"},
    {label:"PORT",param:"port"},
    {label:"COUNTRY",param:"country"},
    {label:"REGION",param:"region"}
  ];
  const [CarteraPuertos, setCartera] = useFetch(`${process.env.API_URL}/puertos`,undefined);

  return (
    <TablePagination
      data={CarteraPuertos}
      setData={setCartera}
      params={params}
      url="puertos"
      modalTitle="Edit Ports"
    />
  );
};
