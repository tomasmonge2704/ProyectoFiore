import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export default function Proveedores() {
  const params = [
    {label:"Company Name",param:"nombre"},
    {label:"Address Line 1",param:"direccion"},
    {label:"Address Line 2",param:"direccion2"},
    {label:"Country",param:"country"},
    {label:"Tax ID",param:"vatNumber"},
  ];
  const [CarteraClientes, setCarteraClientes] = useFetch(`${process.env.API_URL}/client`,undefined);

  return (
    <ContenedorTablas modalTitle="Buyer" variant="grid" data={CarteraClientes} setData={setCarteraClientes} params={params} url="client" />
  );
}
