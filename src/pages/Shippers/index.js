import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export default function Proveedores () {
  const params = [
    {label:"Company Name",param:"nombre"},
    {label:"Address Line 1",param:"direccion"},
    {label:"Address Line 2",param:"direccion2"},
    {label:"Country",param:"country"},
    {label:"Tax ID",param:"taxId"},
    {label:"Plant No.",param:"plantNumber"},
    {label:"Brand",param:"brand"},
  ];
  const [CarteraProveedores, setCarteraProveedores] = useFetch(`${process.env.API_URL}/proveedor`,undefined);

  return (
    <ContenedorTablas hasCountries={true} modalTitle="Shipper" variant="grid" data={CarteraProveedores} setData={setCarteraProveedores} params={params} url="proveedor"  />
  );
};
