import bcrypt from "bcryptjs";

import dbConnection from "@/lib/server/mongoose/db-connection";
import User from "@/lib/server/mongoose/models/user-model";
import { NextResponse } from "next/server";
import { otpVerificationTemplate } from "@/lib/templates";
import sendEmail from "@/lib/send-email";
import generateToken from "@/lib/utility/generate-tokens";
import { decodeToken } from "@/lib/utility/decode-token";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "Please provide all the required fields",
      },
    });
  }

  try {
    await dbConnection();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "User already exists",
        },
      });
    }

    const verification_otp: number = Math.floor(
      100000 + Math.random() * 900000
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verification_otp,
    });

    const emailTemplate = otpVerificationTemplate(verification_otp, name);

    const sendEmailResponse = await sendEmail(
      email,
      "Email Verification",
      emailTemplate
    );

    if (!sendEmailResponse.success) {
      return NextResponse.json({
        status: 500,
        body: {
          success: false,
          message: "Error sending email",
        },
      });
    }

    const newUser = await user.save();

    const token: string = generateToken(newUser._id) || " ";

    newUser.tokens = newUser.tokens.concat({ token });

    await newUser.save();

    const response = NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "User registered successfully",
      },
    });

    response.cookies.set("invoice_2k_1r_token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    });

    return response;
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

// login user
export async function PUT(req: Request) {
  const data = await req.json();
  const { email, password } = data;
  if (!email || !password) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "Please provide all the required fields",
      },
    });
  }

  try {
    await dbConnection();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Invalid credentials",
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Invalid credentials",
        },
      });
    }

    const token: string = generateToken(user._id) || " ";

    user.tokens = user.tokens.concat({ token });

    await user.save();

    const response = NextResponse.json({
      status: 200,

      success: true,
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });

    response.cookies.set("invoice_2k_1r_token", token, {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    });

    return response;
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

// logout user
export async function DELETE(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "Please provide token",
      },
    });
  }

  try {
    await dbConnection();

    const id = decodeToken(token);
    const user = await User.findOne({ _id: id, "tokens.token": token });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Invalid token",
        },
      });
    }

    user.tokens = user.tokens.filter(
      (userToken: { token: string }) => userToken.token !== token
    );

    await user.save();

    const res = NextResponse.json({
      status: 200,
      body: {
        success: true,
        message: "User logged out successfully",
      },
    });

    res.cookies.set("invoice_2k_1r_token", "", {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
    });

    return res;
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

// get user
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        message: "Please provide token",
      },
    });
  }

  try {
    await dbConnection();

    const id = decodeToken(token);
    const user = await User.findOne({ _id: id, "tokens.token": token });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: {
          success: false,
          message: "Invalid token",
        },
      });
    }

    return NextResponse.json({
      status: 200,
      body: {
        success: true,
        data: user,
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
