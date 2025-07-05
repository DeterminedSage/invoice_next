"use client";
import { getAllOrganization } from "@/lib/api/organization/get-all-organization";
import { getUser } from "@/lib/api/user/get-user";
import { sidebar_nav } from "@/lib/constants";
import { setOrganization } from "@/lib/feature/organizationSlice";
import { setToken } from "@/lib/feature/tokenSlice";
import { setUser } from "@/lib/feature/userSlice";
import { RootState } from "@/lib/store";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const pathName = usePathname();
  const dispatch = useDispatch();
  // console.log("Pathname => ", pathName);
  const [activePathName, setActivePathName] = useState("");
  const user = useSelector((state: RootState) => state.user);

  const router = useRouter();

  //   const dispatch = useDispatch();
  useEffect(() => {
    if (pathName.includes("/invoice")) {
      return;
    }

    // console.log("Cookies => ", document.cookie);

    const token = document.cookie
      .split(";")
      .filter((item) => {
        return item.includes("invoice_2k_1r_token");
      })[0]
      ?.split("=")[1];

    if (token) {
      dispatch(
        setToken({
          value: token,
        })
      );

      console.log("Token from siderbar => ", token);

      getUser(token).then((res) => {
        if (res.status === 200) {
          console.log("User from sidebar => ", res);
          dispatch(setUser(res.body.data));

          getAllOrganization(token).then((res) => {
            console.log("Organizations from sid => ", res);
            dispatch(setOrganization(res.data));
          });
          return;
        }
      });

      return;
    } else if (pathName.includes("/invoice?q=")) {
      // console.log("from sidebar.tsx => ", pathName);
      return;
    } else {
      setTimeout(() => {
        // let frontEndUrl = import.meta.env.VITE_FRONTEND_URL;
        router.push("/auth");
      }, 1000);
    }
  }, [pathName]);

  useEffect(() => {
    setActivePathName(pathName);
  }, [pathName]);

  return (
    <div className="fixed flex flex-col gap-4 w-80 border-r-2 border-r-primary h-screen p-4 ">
      <img src="/logo.svg" alt="website_logo" />

      <span className="border border-primary rounded-md p-2">
        <p className="font-bold">{user.name}</p>
        <p className="text-gray-200">{user.email}</p>
      </span>
      <div className="mt-8 flex flex-col gap-4 ">
        {sidebar_nav.map((item, index) => (
          <Link
            key={index}
            className={
              " flex gap-4 items-center  text-xl  p-4 rounded-md active:scale-90 transition-all duration-100 cursor-pointer hover:bg-primary "
            }
            href={item.link}
            style={{
              backgroundColor: item.link === activePathName ? "#6d28d9" : "",
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
