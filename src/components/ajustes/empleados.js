import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export const AjustesEmpleados = () => {
  const [CarteraEmpleados] = useFetch(`${process.env.API_URL}/empleados`,undefined);
  const params = [{label:"NOMBRE",param:"nombre"},{label:"APELLIDO",param:"apellido"},{label:"CELULAR",param:"celular"},{label:"MAIL",param:"mail"}];
  return (
    <ContenedorTablas
      variant="table"
      data={CarteraEmpleados}
      params={params}
      modalTitle="Employee"
      url="empleados"
    />
  );
};
