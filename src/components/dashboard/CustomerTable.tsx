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

import { invoice_interface } from "@/lib/types";

const CustomerTable = ({
  data,
  setInvoiceDetails,
}: {
  data: invoice_interface[];
  setInvoiceDetails: React.Dispatch<React.SetStateAction<invoice_interface>>;
}) => {
  return (
    <div>
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
          {data?.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => {
                setInvoiceDetails(item);
              }}
            >
              <TableCell className="font-medium">
                {item.invoice_number}
              </TableCell>
              <TableCell>{item.bill_to.name}</TableCell>
              <TableCell>{item.bill_to.email}</TableCell>
              <TableCell className="text-right">
                {item.descriptions.reduce(
                  (acc, current) => acc + current.price,
                  0
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
