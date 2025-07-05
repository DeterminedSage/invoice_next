import { auth } from "@/lib/server/middleware/auth";
import dbConnection from "@/lib/server/mongoose/db-connection";
import Organization from "@/lib/server/mongoose/models/organization-model";
import { NextResponse } from "next/server";

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

  try {
    await dbConnection();

    const organizations = await Organization.find({
      owner: user_id,
    });

    return NextResponse.json({
      data: organizations,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
