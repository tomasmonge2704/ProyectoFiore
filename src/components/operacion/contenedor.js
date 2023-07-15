import { Comercial } from "./comercial";
import { Contable } from "./contableFinanciera";
import { Logistica } from "./logistica";
import { Docs } from "./docs";
export const ContenedorOperaciones = ({show}) => {

    return (
    <>
    {show == "Comercial" && <Comercial/>}
    {show == "Contable financiera" && <Contable/>}
    {show == "Logistica" && <Logistica/>}
    {show == "Docs" && <Docs/>}
    </>
    )
}