"use client";
import { RootState } from "@/lib/store";
import { billing_address_interface, invoice_interface } from "@/lib/types";

import { useSelector } from "react-redux";
import Templates from "./Templates";
import { saveInvoice } from "@/lib/api/invoices/create-invoice";
import toast from "react-hot-toast";

const InvoiceOutput = ({
  organization,
  invoiceDetails,
}: {
  organization: billing_address_interface;
  invoiceDetails: invoice_interface;
}) => {
  const token = useSelector((state: RootState) => state.token.value);

  const handleSaveInvoice = () => {
    const tempObject = {
      ...invoiceDetails,
      bill_from: organization,
    };

    saveInvoice(tempObject, token).then((response) => {
      console.log(response);
      if (response.status === 200) {
        toast.success("Invoice saved successfully");
      }
    });
  };

  const printInvoice = () => {
    const printContents = document.getElementById("invoice_1")?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore the original state
    }
  };
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex w-full justify-around">
        <span className="btn bg-primary" onClick={handleSaveInvoice}>
          Save & Email
        </span>
        <span
          className="btn bg-primary"
          onClick={() => {
            printInvoice();
          }}
        >
          Save & Print
        </span>
      </div>
      <Templates
        selected_template="invoice_1"
        organization={organization}
        invoiceDetails={invoiceDetails}
      />
    </div>
  );
};

export default InvoiceOutput;
