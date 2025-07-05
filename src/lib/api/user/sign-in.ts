import axios from "axios";

export const signIn = async (data: { email: string; password: string }) => {
  
  const response = await axios.put(`/api/user`, data, {
    withCredentials: true,
  });
  return response.data;
};
