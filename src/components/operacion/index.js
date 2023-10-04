import { Comercial } from "./comercial";
import { Contable } from "./contable";
import { Logistica } from "./logistica";
import { Docs } from "./docs";
export const ContenedorOperaciones = ({show}) => {
  return (
    <>
      {show == "Commercial" && <Comercial/>}
      {show == "Finance" && <Contable />}
      {show == "Logistics" && <Logistica />}
      {show == "Docs" && <Docs/>}
    </>
  );
};
