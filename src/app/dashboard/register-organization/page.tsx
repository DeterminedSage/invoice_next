"use client";
import AddOrganization from "@/components/dashboard/AddOrganization";
import { deleteOrganization } from "@/lib/api/organization/delete-organization";
import { setOrganization } from "@/lib/feature/organizationSlice";

import { RootState } from "@/lib/store";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const RegisterOrganization = () => {
  const organizations = useSelector((state: RootState) => state.organizations);
  const token = useSelector((state: RootState) => state.token.value);

  const dispatch = useDispatch();

  const deleteOrganizationHandler = (organization_name: string) => {
    deleteOrganization(token, organization_name).then((res) => {
      if (res.status !== 200) {
        return;
      }

      toast.success("Organization deleted successfully");

      dispatch(setOrganization(res.data));
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-[90svh] ">
      <h2 className=" flex items-center justify-between">
        <span className="h2">Organization details</span>
        <AddOrganization />
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {organizations.length === 0 && (
            <span className="text-center">No organizations registered</span>
          )}
          {organizations.map((organization, index: number) => (
            <div
              key={index}
              className="relative flex flex-col gap-2 border p-4 rounded-md"
            >
              <TrashIcon
                className="absolute top-2 right-2 w-6 h-6 cursor-pointer text-red-500 active:scale-90 transition-all duration-150"
                onClick={() => deleteOrganizationHandler(organization.name)}
              />
              <span className="font-semibold">{organization.name}</span>
              <span>{organization.addressLine1}</span>
              <span>{organization.addressLine2}</span>
              <span>{organization.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterOrganization;
