import axios from "axios";
export const getInvoice = async (invoiceNumber: number) => {
  const response = await axios.get(
    `/api/invoice?invoice_number=${invoiceNumber}`
  );
  return response.data;
};
