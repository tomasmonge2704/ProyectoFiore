import { TablePagination } from "@/utils/tablePagination";
export const AjustesPacking = ({ CarteraPacking }) => {
  const params = [{label:"NAME",param:"name"}];
  return (
    <TablePagination
      data={CarteraPacking}
      params={params}
      url="packing"
    />
  );
};

