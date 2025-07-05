import axios from "axios";

import { invoice_interface } from "@/lib/types";

export const saveInvoice = async (
  invoiceDetails: invoice_interface,
  token: string
) => {
  //   console.log("from saveInvoice invoiceDetails => ", invoiceDetails);
  let tempObject = { ...invoiceDetails };

  tempObject.bill_from = {
    name: invoiceDetails.bill_from.name,
    email: invoiceDetails.bill_from.email,
    addressLine1: invoiceDetails.bill_from.addressLine1,
    addressLine2: invoiceDetails.bill_from.addressLine2,
  };
  const totalAmount = invoiceDetails.descriptions.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  tempObject.total = totalAmount;
  console.log("Token => ", token);

  const response = await axios.post(`/api/invoice?token=${token}`, tempObject);
  console.log(response.data);
  return response.data;
};
