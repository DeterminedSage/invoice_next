import dbConnection from "@/lib/server/mongoose/db-connection";
import User from "@/lib/server/mongoose/models/user-model";
import { NextResponse } from "next/server";
import generateToken from "@/lib/utility/generate-tokens";

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
    console.log("🔍 OTP verification data:", data);
    await dbConnection();

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return NextResponse.json({
        status: 404,
        body: {
          success: false,
          message: "User not found",
        },
      });
    }

    console.log("🔍 Stored OTP:", user.verification_otp);
    console.log("🔍 Provided OTP:", Number(otp));

    if (user.verification_otp !== Number(otp)) {
      console.log("❌ Invalid OTP");
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Invalid OTP",
        },
      });
    }

    console.log("✅ OTP verified, updating user...");
    user.verification_otp = null;
    user.isVerified = true;
    await user.save();

    // Generate token for the user
    const token: string = generateToken(user._id) || " ";
    user.tokens = user.tokens.concat({ token });
    await user.save();

    console.log("✅ User verification completed successfully");

    const response = NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "User verified successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
        },
        token: token,
      },
    });

    response.cookies.set("invoice_2k_1r_token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    });

    return response;
  } catch (error: any) {
    console.error("💥 OTP verification error:", error);
    return NextResponse.json({
      status: 500,
      body: {
        success: false,
        message: error.message,
      },
    });
  }
}
