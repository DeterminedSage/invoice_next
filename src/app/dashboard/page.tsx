"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllInvoices } from "@/lib/api/invoices/all-invoices";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const [invoices, setInvoices] = useState<
    {
      total: number;
      invoice_number: string;
      invoice_date: string;
      owner: string;
      template: string;
      descriptions: {
        description: string;
        price: number;
      }[];
      bill_from: {
        name: string;
        email: string;
        addressLine1: string;
        addressLine2: string;
      };
      bill_to: {
        name: string;
        email: string;
        addressLine1: string;
        addressLine2: string;
      };
    }[]
  >([]);

  useEffect(() => {
    console.log(token);
    if (token !== "") {
      getAllInvoices(token).then((res) => {
        console.log("API Response:", res);
        if (res && res.data && Array.isArray(res.data)) {
          setInvoices(res.data);
        } else {
          console.error("Invalid response structure:", res);
          setInvoices([]);
        }
      }).catch((error) => {
        console.error("Error fetching invoices:", error);
        setInvoices([]);
      });
    }
  }, [token]);
  return (
    <div className="text-3xl w-full h-screen">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices && invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow
                key={invoice.invoice_number}
                onClick={() => {
                  window.open(`/invoice?q=${invoice.invoice_number}`, "_blank");
                }}
              >
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.bill_to.name}</TableCell>
                <TableCell>{invoice.bill_to.email}</TableCell>
                <TableCell className="text-right">${invoice.total}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
