// import axios from "axios";

// export const signUp = async (data: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   const response = await axios.post(
//     `/api/user/`,
//     data,
//     { withCredentials: true }
//   );
//   return response.data;
// };

import axios from "axios";

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    console.log("🚀 Making sign-up request with data:", data);
    
    const response = await axios.post("/api/user", data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log("✅ Sign-up success:", response.data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("❌ Sign-up API error:", error);
    console.error("📊 Error response:", error.response?.data);
    console.error("📊 Error status:", error.response?.status);
    console.error("📊 Error message:", error.message);
    
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: error.message || "Unknown error" },
    };
  }
};
