import { TablePagination } from "@/utils/tablePagination";
export const PaymentTerms = ({ CarteraPaymentTerms }) => {
  const params = [{label:"NAME",param:"name"}];
  return (
    <TablePagination
      data={CarteraPaymentTerms}
      params={params}
      url="payment-terms"
    />
  );
};