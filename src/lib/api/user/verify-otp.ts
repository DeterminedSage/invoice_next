import axios from "axios";

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const response = await axios.post(`/api/otp`, data);
  return response.data;
};
