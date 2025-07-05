import sendEmail from "@/lib/send-email";
import { auth } from "@/lib/server/middleware/auth";
import Invoice from "@/lib/server/mongoose/models/invoice-model";
import { invoiceDownloadTemplate } from "@/lib/templates";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const data = await req.json();

  if (!token) {
    return NextResponse.json({
      message: "Token is required",
      status: 400,
    });
  }

  const authData = await auth(token);

  // console.log("authData => ", authData);
  if (authData.success === false) {
    return NextResponse.json({
      message: authData.message,
      status: 401,
    });
  }

  const user_id: string = authData.data || "";

  console.log("data => ", data);
  const invoices = data.map((invoice: any) => {
    return new Invoice({
      ...invoice,
      owner: user_id,
    });
  });


  try {
    await Invoice.insertMany(invoices);

    for (let i = 0; i < invoices.length; i++) {
      console.log("Sending email to", invoices[i].invoice_number);
      const email_template = invoiceDownloadTemplate(
        invoices[i].bill_to.name,
        invoices[i].invoice_number
      );
      const sendEmailRes = await sendEmail(
        invoices[i].bill_to.email,
        `Your Invoice ${invoices[i].invoiceNumber}`,
        email_template
      );

      if (!sendEmailRes.success) {
        return NextResponse.json({
          message: sendEmailRes.message,
          status: 500,
        });
      }

      console.log(
        "Email sent to",
        invoices[i].bill_to.name,
        "  & ",
        invoices[i].bill_to.email
      );
    }

    return NextResponse.json({
      message: "Invoice created successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating invoice",
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({
      message: "Token is required",
      status: 400,
    });
  }

  const authData = await auth(token);

  if (authData.success === false) {
    return NextResponse.json({
      message: authData.message,
      status: 401,
    });
  }

  const user_id: string = authData.data || "";

  const invoices = await Invoice.find({ owner: user_id });

  return NextResponse.json({
    data: invoices,
    status: 200,
  });
}
