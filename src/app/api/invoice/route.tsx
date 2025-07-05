import sendEmail from "@/lib/send-email";
import { auth } from "@/lib/server/middleware/auth";
import dbConnection from "@/lib/server/mongoose/db-connection";
import Invoice from "@/lib/server/mongoose/models/invoice-model";
import Organization from "@/lib/server/mongoose/models/organization-model";
import { invoiceDownloadTemplate } from "@/lib/templates";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const data = await req.json();

  console.log("data => ", data);

  if (!token) {
    return NextResponse.json({
      message: "Token is required",
      status: 400,
    });
  }

  const authData = await auth(token);

  console.log("authData => ", authData);
  if (authData.success === false) {
    return NextResponse.json({
      message: authData.message,
      status: 401,
    });
  }

  const user_id: string = authData.data || "";

  const invoice = new Invoice({
    ...data,
    owner: user_id,
  });

  const email_template = invoiceDownloadTemplate(
    invoice.bill_to.name,
    invoice.invoice_number
  );

  const sendEmailRes = await sendEmail(
    invoice.bill_to.email,
    `Your Invoice ${invoice.invoice_number}`,
    email_template
  );

  if (sendEmailRes.success === false) {
    return NextResponse.json({
      message: sendEmailRes.message,
      status: 500,
    });
  }

  try {
    await invoice.save();
    return NextResponse.json({
      message: "Invoice created successfully",
      status: 200,
    });
  } catch (error: any) {
    console.log("Error => ", error.message);
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const invoice_number = new URL(req.url).searchParams.get("invoice_number");

  if (!invoice_number) {
    return NextResponse.json({
      message: "Invoice number is required",
      status: 400,
    });
  }

  try {
    await dbConnection();
    const invoice = await Invoice.findOne({ invoice_number: invoice_number });

    if (!invoice) {
      return NextResponse.json({
        message: "Invoice not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Invoice found",
      data: invoice,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
