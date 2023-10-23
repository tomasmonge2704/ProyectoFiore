import { TablePagination } from "@/utils/tablePagination";
import useFetch from "@/hooks/useFetch";

export const AjustesPacking = () => {
  const params = [{label:"NAME",param:"name"}];
  const [CarteraPacking,setCartera] = useFetch(`${process.env.API_URL}/packing`,undefined);

  return (
    <TablePagination
      data={CarteraPacking}
      setData={setCartera}
      params={params}
      modalTitle="Edit Packing"
      url="packing"
    />
  );
};

