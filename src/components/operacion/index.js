import { Comercial } from "./comercial";
import { Contable } from "./contable";
import { Logistica } from "./logistica";
import { Docs } from "./docs";
export const ContenedorOperaciones = ({
  show,
  operation,
  fields,
  setFields,
  productos,
  setProductos,
}) => {
  return (
    <>
      {show == "Comercial" && (
        <Comercial
          operation={operation}
          fields={fields}
          setFields={setFields}
          productos={productos}
          setProductos={setProductos}
        />
      )}
      {show == "Contable financiera" && <Contable />}
      {show == "Logistica" && <Logistica />}
      {show == "Docs" && <Docs />}
    </>
  );
};
