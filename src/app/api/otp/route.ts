import dbConnection from "@/lib/server/mongoose/db-connection";
import User from "@/lib/server/mongoose/models/user-model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { email, otp } = data;
  if (!email || !otp) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "Please provide all the required fields",
      },
    });
  }

  try {

    console.log("data", data);
    await dbConnection();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 404,
        body: {
          success: false,
          message: "User not found",
        },
      });
    }

    if (user.verification_otp !== Number(otp)) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Invalid OTP",
        },
      });
    }

    user.verification_otp = null;
    user.isVerified = true;
    await user.save();

    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "User verified successfully",
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      body: {
        success: false,
        message: error.message,
      },
    });
  }
}
