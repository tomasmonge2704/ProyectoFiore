import { ContenedorTablas } from "@/utils/contenedorTablas";
import useFetch from "@/hooks/useFetch";
export const PaymentTerms = () => {
  const params = [{label:"NAME",param:"name"}];
  const [CarteraPaymentTerms] = useFetch(`${process.env.API_URL}/payment-terms`,undefined);

  return (
    <ContenedorTablas
      variant="table"
      data={CarteraPaymentTerms}
      params={params}
      modalTitle="Payment Term"
      url="payment-terms"
    />
  );
};