import { billing_address_interface } from "@/lib/types";
import axios from "axios";

export const createOrganization = async (
  token: string,
  data: billing_address_interface
) => {
  
  console.log("Token => ", token);
  
  const res = await axios.post(
    `/api/organization?token=${token}`,
    data
  );
  return res.data;
};
