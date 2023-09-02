import { TablePagination } from "@/utils/tablePagination";
export const AjustesEmpleados = ({ CarteraEmpleados }) => {
  const params = [{label:"NOMBRE",param:"nombre"},{label:"APELLIDO",param:"apellido"},{label:"CELULAR",param:"celular"},{label:"MAIL",param:"mail"}];
  return (
    <TablePagination
      data={CarteraEmpleados}
      params={params}
      url="empleados"
    />
  );
};
