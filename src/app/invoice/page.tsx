"use client"

import { getInvoice } from "@/lib/api/invoices/get-invoice";
import React, { useEffect } from "react";
import Templates from "@/components/dashboard/generate-invoice/Templates";

const InvoiceToBePrinted = () => {
  const [invoiceDetails, setInvoiceDetails] = React.useState<{
    invoice_number: number;
    invoice_date: string;
    bill_to: {
      name: string;
      addressLine1: string;
      addressLine2: string;
      email: string;
    };
    bill_from: {
      name: string;
      addressLine1: string;
      addressLine2: string;
      email: string;
    };
    descriptions: {
      description: string;
      price: number;
    }[];
    total: number;
    template: string;
  }>({
    invoice_number: 0,
    invoice_date: "",
    bill_to: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      email: "",
    },
    bill_from: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      email: "",
    },
    descriptions: [
      {
        description: "",
        price: 0,
      },
    ],
    total: 0,
    template: "",
  });
  useEffect(() => {
    // read query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const invoiceNumber = urlParams.get("q") || "0";

    console.log("from InvoiceToBePrinted.tsx => ", invoiceNumber);
    // console.log("from InvoiceToBePrinted.tsx => ", invoiceNumber);
    getInvoice(Number(invoiceNumber)).then((res) => {
      // console.log("from InvoiceToBePrinted.tsx => ", res.data);
      console.log("from InvoiceToBePrinted.tsx => ", res);
      setInvoiceDetails(res.data);
    });

    // print only the invoice
  }, []);

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
    <div className="flex flex-col h-full justify-center items-center">
      <span className="btn bg-primary" onClick={printInvoice}>
        Print Invoice
      </span>
      <span className="w-[197mm] ">
        <Templates
          selected_template={invoiceDetails?.template}
          organization={invoiceDetails?.bill_from}
          invoiceDetails={invoiceDetails}
        />
      </span>
    </div>
  );
};

export default InvoiceToBePrinted;
