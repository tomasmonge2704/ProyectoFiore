import { TablePagination } from "@/utils/tablePagination";
import useFetch from "@/hooks/useFetch";
export const PaymentTerms = () => {
  const params = [{label:"NAME",param:"name"}];
  const [CarteraPaymentTerms,setCartera] = useFetch(`${process.env.API_URL}/payment-terms`,undefined);

  return (
    <TablePagination
      data={CarteraPaymentTerms}
      setData={setCartera}
      params={params}
      modalTitle="Edit Payment Term"
      url="payment-terms"
    />
  );
};