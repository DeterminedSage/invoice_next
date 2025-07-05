import axios from "axios";

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `/api/user/`,
    data,
    { withCredentials: true }
  );
  return response.data;
};
