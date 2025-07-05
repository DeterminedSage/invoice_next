import axios from "axios";
export const getAllInvoices = async (token: string) => {
  console.log(token);
  
  const response = await axios.get(
    `/api/invoice/all?token=${token}`
  );
  return response.data;
};
