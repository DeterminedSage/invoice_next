"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InvoiceInput from "@/components/dashboard/generate-invoice/InvoiceInput";
import InvoiceOutput from "@/components/dashboard/generate-invoice/InvoiceOutput";
// import { organizations } from "@/lib/constants";
import { useState } from "react";
import { billing_address_interface, invoice_interface } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const GenerateInvoice = () => {
  const organizations = useSelector((state: RootState) => state.organizations);
  const [selectedOrganization, setSelectedOrganization] =
    useState<billing_address_interface>({
      name: "",
      addressLine1: "",
      addressLine2: "",
      email: "",
    });

  const [invoiceDetails, setInvoiceDetails] = useState<invoice_interface>({
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
  });

  const handleOrganizationChange = (value: string) => {
    // console.log(value);
    const tempOrganization = organizations.find(
      (organization) => organization.name === value
    );

    if (tempOrganization) {
      setSelectedOrganization(tempOrganization);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center">
        <span className="h1 text-primary">Generate Invoice</span>
        <span className="flex gap-2 items-center">
          <span>
            <Select
              onValueChange={(value) => {
                handleOrganizationChange(value);
              }}
            >
              <SelectTrigger className="w-[180px] bg-transparent text-primary text-center">
                <SelectValue placeholder="Choose Organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((organization, index) => (
                  <SelectItem value={organization.name} key={index}>
                    {organization.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>
          <span>
            <Select>
              <SelectTrigger className="w-[180px] bg-transparent text-primary text-center">
                <SelectValue placeholder="Template 1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Template 1</SelectItem>
              </SelectContent>
            </Select>
          </span>
        </span>
      </div>

      <div className="flex gap-4 mt-8">
        <span className="flex-[0.5]">
          <InvoiceInput
            selectedOrganization={selectedOrganization}
            setInvoiceDetails={setInvoiceDetails}
            invoiceDetails={invoiceDetails}
          />
        </span>
        <span className="flex-[0.5]">
          <InvoiceOutput
            organization={selectedOrganization}
            invoiceDetails={invoiceDetails}
          />
        </span>
      </div>
    </div>
  );
};

export default GenerateInvoice;
