import axios from "axios";

export const deleteOrganization = async (token: string, organization_name: string) => {
  
  console.log("Token => ", token);
  
  const res = await axios.delete(
    `/api/organization?token=${token}&organization_name=${organization_name}`
  );
  return res.data;
};
