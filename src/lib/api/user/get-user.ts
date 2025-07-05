import axios from "axios";

export const getUser = async (token: string) => {
  console.log("Token => ", token);
  const { data } = await axios.get(`/api/user?token=${token}`);
  return data;
};
