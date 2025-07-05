import axios from "axios";

export const getAllOrganization = async (token: string) => {
  
  console.log("Token => ", token);
  
  const { data } = await axios.get(
    `/api/organization/all?token=${token}`
  );

  // console.log("From get all organization => ", data);

  return data;
};
