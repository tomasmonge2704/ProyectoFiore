import { TablePagination } from "@/utils/tablePagination";
export const Puertos = ({ CarteraPuertos }) => {
  const params = [
    {label:"POD",param:"pod"},
    {label:"PORT",param:"port"},
    {label:"COUNTRY",param:"country"},
    {label:"REGION",param:"region"}
  ];

  return (
    <TablePagination
      data={CarteraPuertos}
      params={params}
      url="puertos"
    />
  );
};
