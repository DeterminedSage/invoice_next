import axios from "axios";

export const verifyOtp = async (data: { email: string; otp: string }) => {
  try {
    console.log("🚀 Making OTP verification request with data:", data);
    
    const response = await axios.post("/api/otp", data);
    
    console.log("✅ OTP verification success:", response.data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error("❌ OTP verification API error:", error);
    console.error("📊 Error response:", error.response?.data);
    
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: error.message || "Unknown error" },
    };
  }
};
