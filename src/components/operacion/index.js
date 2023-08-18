import { Comercial } from "./comercial";
import { Contable } from "./contable";
import { Logistica } from "./logistica";
import { Docs } from "./docs";
export const ContenedorOperaciones = ({
  show,
  operation,
  setOperation
}) => {
  return (
    <>
      {show == "Comercial" && (
        <Comercial
          operation={operation}
          setOperation={setOperation}
        />
      )}
      {show == "Contable financiera" && <Contable />}
      {show == "Logistica" && <Logistica />}
      {show == "Docs" && <Docs />}
    </>
  );
};
