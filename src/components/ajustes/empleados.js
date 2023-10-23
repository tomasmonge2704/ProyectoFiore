import { TablePagination } from "@/utils/tablePagination";
import useFetch from "@/hooks/useFetch";
export const AjustesEmpleados = () => {
  const [CarteraEmpleados,setCartera] = useFetch(`${process.env.API_URL}/empleados`,undefined);
  const params = [{label:"NOMBRE",param:"nombre"},{label:"APELLIDO",param:"apellido"},{label:"CELULAR",param:"celular"},{label:"MAIL",param:"mail"}];
  return (
    <TablePagination
      data={CarteraEmpleados}
      params={params}
      setData={setCartera}
      modalTitle="Edit Employee"
      url="empleados"
    />
  );
};
