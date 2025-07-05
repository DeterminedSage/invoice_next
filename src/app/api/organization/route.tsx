import { auth } from "@/lib/server/middleware/auth";
import dbConnection from "@/lib/server/mongoose/db-connection";
import Organization from "@/lib/server/mongoose/models/organization-model";
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

  console.log("authData => ", authData.success);
  if (authData.success === false) {
    return NextResponse.json({
      message: authData.message,
      status: 401,
    });
  }

  const user_id: string = authData.data || "";
  const { name, email, addressLine1, addressLine2 } = data;

  if (!name || !email || !addressLine1) {
    return NextResponse.json({
      message: "All fields are required",
      status: 400,
    });
  }

  const organization = new Organization({
    name,
    email,
    addressLine1,
    addressLine2,
    owner: user_id,
  });

  console.log("organization => ", organization);

  try {
    await dbConnection();

    await organization.save();

    return NextResponse.json({
      message: "Organization created",
      data: organization,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}

//delete organization
export async function DELETE(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  const organization_name = new URL(req.url).searchParams.get(
    "organization_name"
  );

  console.log("organization_name => ", organization_name);
  console.log("token => ", token);

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

  console.log("user_id => ", user_id);

  try {
    await dbConnection();

    await Organization.findOneAndDelete({
      name: organization_name,
      owner: user_id,
    });

    const organizations = await Organization.find({ owner: user_id });

    return NextResponse.json({
      message: "Organization deleted",
      status: 200,
      data: organizations,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
