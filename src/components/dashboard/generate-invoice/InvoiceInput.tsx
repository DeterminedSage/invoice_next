"use client";

import { billing_address_interface, invoice_interface } from "@/lib/types";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import CustomerTable from "../CustomerTable";
import { createMultipleInvoices } from "@/lib/api/invoices/create-multiple-invoices";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ManualInput = ({
  setInvoiceDetails,
  invoiceDetails,
}: {
  invoiceDetails: invoice_interface;
  setInvoiceDetails: React.Dispatch<React.SetStateAction<invoice_interface>>;
}) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <h2 className="h2">Customer details</h2>
      <span className="relative ">
        <input
          type="text"
          name="customerName"
          className="input peer"
          required
          onChange={(e) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              bill_to: { ...prev.bill_to, name: e.target.value },
            }))
          }
        />
        <label htmlFor="customerName" className="label">
          Customer Name
        </label>
      </span>
      <span className="relative ">
        <input
          type="text"
          name="streetAddress"
          className="input peer"
          required
          onChange={(e) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              bill_to: { ...prev.bill_to, addressLine1: e.target.value },
            }))
          }
        />
        <label htmlFor="streetAddress" className="label">
          Street Address
        </label>
      </span>
      <span className="relative ">
        <input
          type="text"
          name="city_state_zip"
          className="input peer"
          required
          onChange={(e) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              bill_to: { ...prev.bill_to, addressLine2: e.target.value },
            }))
          }
        />
        <label htmlFor="city_state_zip" className="label">
          City, State, Zip
        </label>
      </span>
      <span className="relative ">
        <input
          type="email"
          name="city_state_zip"
          className="input peer"
          required
          onChange={(e) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              bill_to: { ...prev.bill_to, email: e.target.value },
            }))
          }
        />
        <label htmlFor="email" className="label">
          Email
        </label>
      </span>
      <h2 className="h2">Invoice Details</h2>
      <span className="relative ">
        <input
          type="text"
          name="invoiceNumber"
          className="input peer"
          required
          onChange={(e) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              invoice_number: parseInt(e.target.value),
            }))
          }
        />
        <label htmlFor="invoiceNumber" className="label">
          Invoice Number
        </label>
      </span>
      <span className="flex justify-between items-center border border-gray-400 px-4 py-2 rounded-md">
        <span>Select Invoice Date</span>
        <input
          type="date"
          name="invoiceDate"
          className="text-primary px-4 py-2 rounded-md"
          placeholder=""
          required
          onChange={(e) =>
            setInvoiceDetails((prev) => ({
              ...prev,
              invoice_date: e.target.value,
            }))
          }
        />
      </span>
      <div className="descriptions">
        {invoiceDetails.descriptions.map((item, index) => (
          <span className=" flex gap-2 w-full" key={index}>
            <span className="relative flex-[0.5]">
              <input
                type="text"
                name="description"
                className="input peer"
                required
                onChange={(e) => {
                  const tempDescriptions = [...invoiceDetails.descriptions];
                  tempDescriptions[index].description = e.target.value;
                  setInvoiceDetails((prev) => ({
                    ...prev,
                    descriptions: tempDescriptions,
                  }));
                }}
              />
              <label htmlFor="description" className="label">
                Description
              </label>
            </span>
            <span className="relative flex-[0.5]">
              <input
                type="text"
                name="price"
                className="input peer"
                required
                onChange={(e) =>
                  setInvoiceDetails((prev) => ({
                    ...prev,
                    descriptions: prev.descriptions.map((desc, i) =>
                      i === index
                        ? { ...desc, price: parseInt(e.target.value) }
                        : desc
                    ),
                  }))
                }
              />
              <label htmlFor="price" className="label">
                Price
              </label>
            </span>
          </span>
        ))}

        <span
          className="inline-block bg-primary btn w-full mt-8 text-center"
          onClick={() => {
            setInvoiceDetails((prev) => ({
              ...prev,
              descriptions: [
                ...prev.descriptions,
                { description: "", price: 0 },
              ],
            }));
          }}
        >
          Add Description
        </span>
      </div>
    </div>
  );
};

const InvoiceInput = ({
  setInvoiceDetails,
  invoiceDetails,
  selectedOrganization,
}: {
  setInvoiceDetails: React.Dispatch<React.SetStateAction<invoice_interface>>;
  invoiceDetails: invoice_interface;
  selectedOrganization: billing_address_interface;
}) => {
  const token = useSelector((state: RootState) => state.token.value);
  const [invoicesFromExcel, setInvoicesFromExcel] = useState<
    invoice_interface[]
  >([
    {
      invoice_number: -1,
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
    },
  ]);

  const [isInputFromExcel, setIsInputFromExcel] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target?.result) return;
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        // Process data into the desired JSON structure
        const processedData = rawData.map((row: any) => {
          const descriptions = row["descriptions"].split(",");
          const prices = row["prices"].split(",");
          const descriptionsArray = descriptions.map(
            (desc: string, index: number) => ({
              description: desc.trim(),
              price: parseFloat(prices[index]?.trim()),
            })
          );

          return {
            invoice_number: row["invoice_number"] as number,
            invoice_date: row["invoice_date"] as string,
            bill_to: {
              name: row["name"] as string,
              addressLine1: row["addressLine1"] as string,
              addressLine2: row["addressLine2"] as string,
              email: row["email"] as string,
            },
            descriptions: descriptionsArray as {
              description: string;
              price: number;
            }[],
            bill_from: {
              name: "",
              addressLine1: "",
              addressLine2: "",
              email: "",
            },
            total: 0,
          };
        });

        const tempObject = processedData.map((invoice) => {
          const totalAmount = invoice.descriptions.reduce(
            (acc, curr) => acc + curr.price,
            0
          );
          invoice.total = totalAmount;
          invoice.bill_from = selectedOrganization;
          return invoice;
        });

        setInvoicesFromExcel(tempObject);
        setIsInputFromExcel(true); // Set the processed data to the state
        // console.log(processedData); // Log the JSON data to the console
      };

      toast.success("Excel sheet uploaded successfully");
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSaveMultipleInvoices = () => {
    setLoading(true);
    // Save all the invoices to the database

    createMultipleInvoices(invoicesFromExcel, token, selectedOrganization).then(
      (res) => {
        console.log("from handleSaveMultipleInvoices => ", res);
        setLoading(false);
        toast.success("Invoices saved successfully");
      }
    );
  };
  return (
    <div>
      <p>If uploading excel sheet then it must contain </p>
      <div className=" flex justify-between items-center py-2 px-4 bg-white  text-primary font-bold rounded-md">
        <span>Upload Excel Sheet</span>
        <span className="flex justify-around items-center ">
          <input
            type="file"
            accept=".xlsx, .xls"
            className="w-60"
            onChange={handleFileUpload}
          />
        </span>
      </div>

      {isInputFromExcel && (
        <div className="mt-8 flex flex-col">
          <span
            className="btn bg-primary w-full text-center"
            onClick={handleSaveMultipleInvoices}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                Saving
                <Loader2 className="animate-spin w-6 h-6" />
              </span>
            ) : (
              <span>Save All & send mail</span>
            )}
          </span>
          <CustomerTable
            data={invoicesFromExcel}
            setInvoiceDetails={setInvoiceDetails}
          />
        </div>
      )}
      {!isInputFromExcel && (
        <ManualInput
          setInvoiceDetails={setInvoiceDetails}
          invoiceDetails={invoiceDetails}
        />
      )}
    </div>
  );
};

export default InvoiceInput;
