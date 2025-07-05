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
    if (!isPasswordMatched) return;
    if (
      formDataSignUp.email === "" ||
      formDataSignUp.name === "" ||
      formDataSignUp.password === ""
    )
      return;
    setSendingOtp(true);
    const res = await signUp(formDataSignUp);
    // console.log(res);
    if (res.status === 200) {
      setOtpSent(true);
      toast.success("Otp sent to your email");
    }
    setSendingOtp(false);
  };

  const handleOtpVerify = async () => {
    const res = await verifyOtp({ email: formDataSignUp.email, otp });
    if (res.status === 200) {
      console.log("User verified");
      toast.success("User verified");
    }
    router.push("/dashboard");
    console.log(res);
  };

  const handleSignIn = async () => {
    setLoading(true);
    const res = await signIn({
      email: formDataSignIn.email,
      password: formDataSignIn.password,
    });
    if (res.status === 200) {
      console.log("User Logged in", res);
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.token));
      toast.success("User Logged in");
      setLoading(false);
      console.log("User Logged in", res);
      router.push("/dashboard");

    }
    console.log(res);
  };

  return (
    <div className="bg-foreground text-background flex h-[100vh] w-[100vw] justify-center items-center overflow-hidden">
      <img
        src="/auth-bg.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-full"
      />
      <Tabs
        defaultValue="sign-up"
        className="static z-10 w-[40%] bg-opacity-40 bg-black p-4 rounded-md"
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
                  type="text"
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
                  type="confirm-password"
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
                  Confirem Password
                </label>

                {!isPasswordMatched && (
                  <span className="text-red-500">Password not matched</span>
                )}
              </span>
              <button className="btn bg-primary w-full" onClick={handleOtpSent}>
                {sendingOtp ? (
                  <span className="flex gap-2 items-center justify-center">
                    Sending
                    <Loader2 className="animate-spin inline-block" />
                  </span>
                ) : (
                  <span className="w-full">Send Otp</span>
                )}
              </button>
            </span>
          )}

          {otpSent && (
            <span className="w-full">
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
                  <span className="w-full">Verify</span>
                )}
              </button>
            </span>
          )}
        </TabsContent>
        <TabsContent value="sign-in" className="flex flex-col gap-4">
          <span className="relative">
            <input
              type="text"
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
                Singing In
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
