import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
  return decoded;
};
