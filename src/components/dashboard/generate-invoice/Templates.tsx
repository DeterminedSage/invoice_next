"use client";

import { billing_address_interface, invoice_interface } from "@/lib/types";
import React, { useEffect } from "react";

const Invoice1 = ({
  organization,
  invoiceDetails,
}: {
  organization: billing_address_interface;
  invoiceDetails: invoice_interface;
}) => {
  const [totalPrice, setTotalPrice] = React.useState(0);
  useEffect(() => {
    const total = invoiceDetails.descriptions.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    setTotalPrice(total);
  }, [invoiceDetails.descriptions]);
  return (
    <div
      className="flex flex-col justify-between border-2 border-black"
      id="invoice_1"
    >
      <div className="">
        <p className="inline-block border-b border-black w-full text-center font-bold">
          Invoice{" "}
        </p>
        <span className="my-8 flex flex-col gap-4 px-4">
          <p>Invoice Number : {invoiceDetails.invoice_number || 1}</p>
          <p>Invoice Date : {invoiceDetails.invoice_date || " mm/dd/yyyy"}</p>
        </span>

        <div className="flex px-4">
          <span className="flex-[0.5]">
            <p className="font-bold">Bill To</p>
            <p>{invoiceDetails.bill_to.name || "NA"}</p>
            <p>{invoiceDetails.bill_to.addressLine1 || "NA"} </p>
            <p>{invoiceDetails.bill_to.addressLine2 || ""}</p>
          </span>
          <span className="flex-[0.5]">
            <p className="font-bold">Bill From</p>
            <p>{organization.name || "NA"}</p>
            <p>{organization.addressLine1 || "NA"} </p>
            <p>{organization.addressLine2 || ""}</p>
          </span>
        </div>
      </div>
      <div className="px-4 my-8">
        <p className="inline-block border border-black w-full text-center font-bold">
          Description{" "}
        </p>
        <div className="flex flex-col border-b">
          {invoiceDetails.descriptions.map((description, index) => (
            <span className="flex w-full" key={index}>
              <span className="flex-[0.75] border-r border-l border-black px-4">
                {description.description}
              </span>
              <span className="flex-[0.25] border-r border-l border-black text-center">
                {description.price || 0}
              </span>
            </span>
          ))}
        </div>
        <p className="flex w-full border-b">
          <span className="flex-[0.75] border-r border-l border-black px-4 ">
            Total
          </span>
          <span className="flex-[0.25] border-r border-l border-black text-center">
            {totalPrice}
          </span>
        </p>
      </div>
    </div>
  );
};
const Templates = ({
  selected_template,
  organization,
  invoiceDetails,
}: {
  selected_template: string;
  organization: billing_address_interface;
  invoiceDetails: invoice_interface;
}) => {
  console.log(selected_template);
  // console.log("selected organization => ", organization);
  return (
    <div className="bg-white text-black p-4">
      {selected_template === "invoice_1" && (
        <Invoice1 organization={organization} invoiceDetails={invoiceDetails} />
      )}
    </div>
  );
};

export default Templates;
