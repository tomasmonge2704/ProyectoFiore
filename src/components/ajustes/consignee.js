import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";

export const AjustesConsignee = () => {
  const [CarteraConsignee] = useFetch(
    `${process.env.API_URL}/consignee`,
    undefined
  );
  const params = [
    { label: "NOMBRE", param: "nombre" },
    { label: "DIRECCION", param: "direccion" },
    { label: "DIRECCION 2", param: "direccion2" },
    { label: "DIRECCION 3", param: "direccion3" },
    { label: "COUNTRY", param: "country" },
    { label: "TAX ID", param: "taxId" },
  ];
  return (
    <ContenedorTablas
      variant="table"
      data={CarteraConsignee}
      params={params}
      url="consignee"
      modalTitle="Consignee"
    />
  );
};
