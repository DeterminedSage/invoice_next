// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { signIn } from "@/lib/api/user/sign-in";
// import { signUp } from "@/lib/api/user/sign-up";
// import { verifyOtp } from "@/lib/api/user/verify-otp";
// import { setToken } from "@/lib/feature/tokenSlice";
// import { setUser } from "@/lib/feature/userSlice";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";

// const AuthPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isPasswordMatched, setIsPasswordMatched] = useState(true);
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [formDataSignUp, setFormDataSignUp] = useState<{
//     name: string;
//     email: string;
//     password: string;
//   }>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [formDataSignIn, setFormDataSignIn] = useState<{
//     email: string;
//     password: string;
//   }>({
//     email: "",
//     password: "",
//   });

//   const handleOtpSent = async () => {
//     if (!isPasswordMatched) return;
//     if (
//       formDataSignUp.email === "" ||
//       formDataSignUp.name === "" ||
//       formDataSignUp.password === ""
//     ) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     setSendingOtp(true);
//     try {
//       const res = await signUp(formDataSignUp);
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent to your email");
//       } else {
//         toast.error("Failed to send OTP");
//       }
//     } catch (error) {
//       toast.error("Error sending OTP");
//     }
//     setSendingOtp(false);
//   };

//   const handleOtpVerify = async () => {
//     if (!otp) {
//       toast.error("Please enter OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await verifyOtp({ email: formDataSignUp.email, otp });
//       if (res.status === 200) {
//         console.log("User verified", res);
        
//         // Store user data in Redux and localStorage
//         dispatch(setUser(res.data.user));
//         dispatch(setToken(res.data.token));
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         localStorage.setItem("token", res.data.token);
        
//         toast.success("User verified successfully!");
//         router.push("/dashboard");
//       } else {
//         toast.error("Invalid OTP");
//       }
//     } catch (error) {
//       toast.error("Error verifying OTP");
//     }
//     setLoading(false);
//   };

//   const handleSignIn = async () => {
//     if (!formDataSignIn.email || !formDataSignIn.password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await signIn({
//         email: formDataSignIn.email,
//         password: formDataSignIn.password,
//       });
      
//       if (res.status === 200) {
//         console.log("User Logged in", res);
        
//         // Store user data in Redux and localStorage
//         dispatch(setUser(res.data.user));
//         dispatch(setToken(res.data.token));
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         localStorage.setItem("token", res.data.token);
        
//         toast.success("User Logged in successfully!");
//         router.push("/dashboard");
//       } else {
//         toast.error("Invalid credentials");
//       }
//     } catch (error) {
//       toast.error("Error logging in");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="bg-foreground text-background flex h-[100vh] w-[100vw] justify-center items-center overflow-hidden">
//       <img
//         src="/auth-bg.jpg"
//         alt=""
//         className="absolute top-0 left-0 w-full h-full object-cover"
//       />
//       <Tabs
//         defaultValue="sign-up"
//         className="static z-10 w-[90%] max-w-md bg-opacity-40 bg-black p-6 rounded-md"
//       >
//         <TabsList className="min-w-300 w-[100%] h-[50px] my-4">
//           <TabsTrigger value="sign-up">
//             <span className="h2">Sign Up</span>
//           </TabsTrigger>
//           <TabsTrigger value="sign-in">
//             <span className="h2">Login</span>
//           </TabsTrigger>
//         </TabsList>
        
//         <TabsContent value="sign-up" className="flex flex-col gap-4">
//           {!otpSent && (
//             <span className="w-full flex flex-col gap-4">
//               <span className="relative">
//                 <input
//                   type="text"
//                   name="name"
//                   className="input peer"
//                   onChange={(e) =>
//                     setFormDataSignUp({
//                       ...formDataSignUp,
//                       name: e.target.value,
//                     })
//                   }
//                   required
//                 />
//                 <label htmlFor="name" className="label">
//                   Name
//                 </label>
//               </span>
//               <span className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   className="input peer"
//                   onChange={(e) =>
//                     setFormDataSignUp({
//                       ...formDataSignUp,
//                       email: e.target.value,
//                     })
//                   }
//                   required
//                 />
//                 <label htmlFor="email" className="label">
//                   Email
//                 </label>
//               </span>
//               <span className="relative">
//                 <input
//                   type="password"
//                   name="password"
//                   className="input peer"
//                   onChange={(e) =>
//                     setFormDataSignUp({
//                       ...formDataSignUp,
//                       password: e.target.value,
//                     })
//                   }
//                   required
//                 />
//                 <label htmlFor="password" className="label">
//                   Password
//                 </label>
//               </span>
//               <span className="relative">
//                 <input
//                   type="password"
//                   name="confirm-password"
//                   className="input peer"
//                   onChange={(e) =>
//                     setIsPasswordMatched(
//                       e.target.value === formDataSignUp.password
//                     )
//                   }
//                   required
//                 />
//                 <label htmlFor="confirm-password" className="label">
//                   Confirm Password
//                 </label>
//                 {!isPasswordMatched && (
//                   <span className="text-red-500 text-sm mt-1">
//                     Password not matched
//                   </span>
//                 )}
//               </span>
//               <button className="btn bg-primary w-full" onClick={handleOtpSent}>
//                 {sendingOtp ? (
//                   <span className="flex gap-2 items-center justify-center">
//                     Sending
//                     <Loader2 className="animate-spin inline-block" />
//                   </span>
//                 ) : (
//                   <span className="w-full">Send OTP</span>
//                 )}
//               </button>
//             </span>
//           )}

//           {otpSent && (
//             <span className="w-full flex flex-col gap-4">
//               <span className="relative">
//                 <input
//                   type="text"
//                   name="otp"
//                   className="input peer"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />
//                 <label htmlFor="otp" className="label">
//                   OTP
//                 </label>
//               </span>
//               <button
//                 className="btn bg-primary w-full"
//                 onClick={handleOtpVerify}
//               >
//                 {loading ? (
//                   <span className="flex gap-2 items-center justify-center">
//                     Verifying
//                     <Loader2 className="animate-spin inline-block" />
//                   </span>
//                 ) : (
//                   <span className="w-full">Verify OTP</span>
//                 )}
//               </button>
//             </span>
//           )}
//         </TabsContent>
        
//         <TabsContent value="sign-in" className="flex flex-col gap-4">
//           <span className="relative">
//             <input
//               type="email"
//               name="email"
//               className="input peer"
//               onChange={(e) =>
//                 setFormDataSignIn({
//                   ...formDataSignIn,
//                   email: e.target.value,
//                 })
//               }
//               required
//             />
//             <label htmlFor="email" className="label">
//               Email
//             </label>
//           </span>
//           <span className="relative">
//             <input
//               type="password"
//               name="password"
//               className="input peer"
//               onChange={(e) =>
//                 setFormDataSignIn({
//                   ...formDataSignIn,
//                   password: e.target.value,
//                 })
//               }
//               required
//             />
//             <label htmlFor="password" className="label">
//               Password
//             </label>
//           </span>

//           <button className="btn bg-primary w-full" onClick={handleSignIn}>
//             {loading ? (
//               <span className="flex gap-2 items-center justify-center">
//                 Signing In
//                 <Loader2 className="animate-spin inline-block" />
//               </span>
//             ) : (
//               <span className="w-full">Sign In</span>
//             )}
//           </button>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AuthPage;

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "@/lib/api/user/sign-in";
import { signUp } from "@/lib/api/user/sign-up";
import { verifyOtp } from "@/lib/api/user/verify-otp";
import { setToken } from "@/lib/feature/tokenSlice";
import { setUser } from "@/lib/feature/userSlice";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AuthPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [formDataSignUp, setFormDataSignUp] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const [formDataSignIn, setFormDataSignIn] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleOtpSent = async () => {
    console.log("🔍 Starting OTP send process...");
    console.log("📋 Form data:", formDataSignUp);
    console.log("🔐 Password matched:", isPasswordMatched);

    if (!isPasswordMatched) {
      console.log("❌ Password mismatch - stopping");
      toast.error("Passwords do not match");
      return;
    }

    if (
      formDataSignUp.email === "" ||
      formDataSignUp.name === "" ||
      formDataSignUp.password === ""
    ) {
      console.log("❌ Missing required fields:", {
        name: formDataSignUp.name === "",
        email: formDataSignUp.email === "",
        password: formDataSignUp.password === ""
      });
      toast.error("Please fill all fields");
      return;
    }

    console.log("📤 Sending OTP request...");
    setSendingOtp(true);
    
    try {
      const res = await signUp(formDataSignUp);
      console.log("📥 Sign-up response:", res);
      console.log("📊 Response status:", res.status);
      console.log("📄 Response data:", res.data);

      if (res.status === 200) {
        console.log("✅ OTP sent successfully");
        setOtpSent(true);
        toast.success("OTP sent to your email");
      } else {
        console.log("❌ Failed to send OTP. Status:", res.status);
        console.log("🔍 Error details:", res.data);
        toast.error(`Failed to send OTP: ${res.data?.message || 'Unknown error'}`);
      }
  } catch (error: any) {
    console.error("💥 Sign-up error:", error);
    console.error("🔍 Error details:", {
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace',
      response: error?.response?.data || 'No response data'
    });
    toast.error(`Error sending OTP: ${error?.message || 'Unknown error'}`);
    }
    setSendingOtp(false);
  };

  const handleOtpVerify = async () => {
    console.log("🔍 Starting OTP verification...");
    console.log("📋 OTP:", otp);
    console.log("📧 Email:", formDataSignUp.email);

    if (!otp) {
      console.log("❌ No OTP entered");
      toast.error("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ email: formDataSignUp.email, otp });
      console.log("📥 OTP verification response:", res);
      
      if (res.status === 200) {
        console.log("✅ User verified successfully");
        console.log("👤 User data:", res.data.body.user);
        console.log("🔑 Token:", res.data.body.token);
        
        // Store user data in Redux and localStorage
        dispatch(setUser(res.data.body.user));
        dispatch(setToken({ value: res.data.body.token }));
        localStorage.setItem("user", JSON.stringify(res.data.body.user));
        localStorage.setItem("token", res.data.body.token);
        
        toast.success("User verified successfully!");
        router.push("/dashboard");
      } else {
        console.log("❌ Invalid OTP. Status:", res.status);
        console.log("📄 Error details:", res.data);
        toast.error("Invalid OTP");
      }
    } catch (error: any) {
      console.error("💥 OTP verification error:", error);
      toast.error("Error verifying OTP");
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    console.log("🔍 Starting sign in...");
    console.log("📋 Sign in data:", formDataSignIn);

    if (!formDataSignIn.email || !formDataSignIn.password) {
      console.log("❌ Missing login fields");
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn({
        email: formDataSignIn.email,
        password: formDataSignIn.password,
      });
      
      console.log("📥 Sign in response:", res);
      
      if (res.status === 200) {
        console.log("✅ User logged in successfully");
        
        // Store user data in Redux and localStorage
        dispatch(setUser(res.data.user));
        dispatch(setToken({ value: res.data.token }));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        
        toast.success("User logged in successfully!");
        router.push("/dashboard");
      } else {
        console.log("❌ Invalid credentials. Status:", res.status);
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("💥 Sign in error:", error);
      toast.error("Error logging in");
    }
    setLoading(false);
  };

  return (
    <div className="bg-foreground text-background flex h-[100vh] w-[100vw] justify-center items-center overflow-hidden">
      <img
        src="/auth-bg.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <Tabs
        defaultValue="sign-up"
        className="static z-10 w-[90%] max-w-md bg-opacity-40 bg-black p-6 rounded-md"
      >
        <TabsList className="min-w-300 w-[100%] h-[50px] my-4">
          <TabsTrigger value="sign-up">
            <span className="h2">Sign Up</span>
          </TabsTrigger>
          <TabsTrigger value="sign-in">
            <span className="h2">Login</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sign-up" className="flex flex-col gap-4">
          {!otpSent && (
            <span className="w-full flex flex-col gap-4">
              <span className="relative">
                <input
                  type="text"
                  name="name"
                  className="input peer"
                  onChange={(e) =>
                    setFormDataSignUp({
                      ...formDataSignUp,
                      name: e.target.value,
                    })
                  }
                  required
                />
                <label htmlFor="name" className="label">
                  Name
                </label>
              </span>
              <span className="relative">
                <input
                  type="email"
                  name="email"
                  className="input peer"
                  onChange={(e) =>
                    setFormDataSignUp({
                      ...formDataSignUp,
                      email: e.target.value,
                    })
                  }
                  required
                />
                <label htmlFor="email" className="label">
                  Email
                </label>
              </span>
              <span className="relative">
                <input
                  type="password"
                  name="password"
                  className="input peer"
                  onChange={(e) =>
                    setFormDataSignUp({
                      ...formDataSignUp,
                      password: e.target.value,
                    })
                  }
                  required
                />
                <label htmlFor="password" className="label">
                  Password
                </label>
              </span>
              <span className="relative">
                <input
                  type="password"
                  name="confirm-password"
                  className="input peer"
                  onChange={(e) =>
                    setIsPasswordMatched(
                      e.target.value === formDataSignUp.password
                    )
                  }
                  required
                />
                <label htmlFor="confirm-password" className="label">
                  Confirm Password
                </label>
                {!isPasswordMatched && (
                  <span className="text-red-500 text-sm mt-1">
                    Password not matched
                  </span>
                )}
              </span>
              <button className="btn bg-primary w-full" onClick={handleOtpSent}>
                {sendingOtp ? (
                  <span className="flex gap-2 items-center justify-center">
                    Sending
                    <Loader2 className="animate-spin inline-block" />
                  </span>
                ) : (
                  <span className="w-full">Send OTP</span>
                )}
              </button>
            </span>
          )}

          {otpSent && (
            <span className="w-full flex flex-col gap-4">
              <span className="relative">
                <input
                  type="text"
                  name="otp"
                  className="input peer"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <label htmlFor="otp" className="label">
                  OTP
                </label>
              </span>
              <button
                className="btn bg-primary w-full"
                onClick={handleOtpVerify}
              >
                {loading ? (
                  <span className="flex gap-2 items-center justify-center">
                    Verifying
                    <Loader2 className="animate-spin inline-block" />
                  </span>
                ) : (
                  <span className="w-full">Verify OTP</span>
                )}
              </button>
            </span>
          )}
        </TabsContent>
        
        <TabsContent value="sign-in" className="flex flex-col gap-4">
          <span className="relative">
            <input
              type="email"
              name="email"
              className="input peer"
              onChange={(e) =>
                setFormDataSignIn({
                  ...formDataSignIn,
                  email: e.target.value,
                })
              }
              required
            />
            <label htmlFor="email" className="label">
              Email
            </label>
          </span>
          <span className="relative">
            <input
              type="password"
              name="password"
              className="input peer"
              onChange={(e) =>
                setFormDataSignIn({
                  ...formDataSignIn,
                  password: e.target.value,
                })
              }
              required
            />
            <label htmlFor="password" className="label">
              Password
            </label>
          </span>

          <button className="btn bg-primary w-full" onClick={handleSignIn}>
            {loading ? (
              <span className="flex gap-2 items-center justify-center">
                Signing In
                <Loader2 className="animate-spin inline-block" />
              </span>
            ) : (
              <span className="w-full">Sign In</span>
            )}
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;