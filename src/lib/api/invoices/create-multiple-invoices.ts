import axios from "axios";
import { billing_address_interface, invoice_interface } from "@/lib/types";

export const createMultipleInvoices = async (
  invoices: invoice_interface[],
  token: string,
  selectedOrganization: billing_address_interface
) => {

  
  console.log("Token => ", token);
  
  let tempInvoices = invoices.map((invoice) => {
    return {
      ...invoice,
      bill_from: {
        name: selectedOrganization.name,
        addressLine1: selectedOrganization.addressLine1,
        addressLine2: selectedOrganization.addressLine2,
        email: selectedOrganization.email,
      },
    };
  });
  console.log("from createMultipleInvoices invoices => ", invoices);
  
  const response = await axios.post(
    `/api/invoice/all?token=${token}`,
    tempInvoices
  );
  return response.data;
};
