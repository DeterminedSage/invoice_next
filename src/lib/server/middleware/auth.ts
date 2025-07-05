import jwt from "jsonwebtoken";

import User from "../mongoose/models/user-model";

export const auth = async (token: string) => {
  if (!token) {
    return {
      message: "Please authenticate",
      success: false,
    };
  }

  try {
    const secret: string = process.env.JWT_SECRET || "";
    const decoded: any = jwt.verify(token, secret);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return {
        message: "Please authenticate",
        success: false,
      };
    }

    return {
      data: user._id,
      success: true,
      message: "Authenticated",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Please authenticate",
      success: false,
    };
  }
};
