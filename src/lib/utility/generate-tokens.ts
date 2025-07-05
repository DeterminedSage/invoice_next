import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const secret: string = process.env.JWT_SECRET || "";
  try {
    const token = jwt.sign(
      {
        _id: id,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    // console.log("Error occurred while generating token", error.message);
    return;
  }
};

export default generateToken;
