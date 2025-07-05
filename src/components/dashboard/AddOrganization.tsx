import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createOrganization } from "@/lib/api/organization/create-organization";
import { getAllOrganization } from "@/lib/api/organization/get-all-organization";
import { setOrganization } from "@/lib/feature/organizationSlice";
import { billing_address_interface } from "@/lib/types";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export const AddOrganization = () => {
  const organanizations = useSelector(
    (state: RootState) => state.organizations
  );
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.token.value);
  const [formData, setFormData] = useState<billing_address_interface>({
    name: "",
    addressLine1: "",
    addressLine2: "",
    email: "",
  });

  const handleAddOrganization = async () => {
    // console.log("formData => ", formData);
    const res = await createOrganization(token, formData);

    console.log("res => ", res);
    if (res.status !== 200) {
      return;
    }

    toast.success("Organization added successfully");

    const fetchedOrganizations = await getAllOrganization(token);
    // console.log("fetchedOrganizations => ", fetchedOrganizations);
    const tempOrganizations = [...organanizations];
    tempOrganizations.push(formData);
    dispatch(setOrganization(fetchedOrganizations.data));
  };
  return (
    <span>
      <Sheet>
        <SheetTrigger>
          <span className="btn bg-primary cursor-pointer font-bold">
            Add Organization
          </span>
        </SheetTrigger>
        <SheetContent className="bg-foreground">
          <SheetHeader>
            <SheetTitle className="h2 text-primary">
              Adding Organization
            </SheetTitle>
            <SheetDescription>
              <span className="mt-8 min-w-[300px] w-[40%] flex flex-col gap-4">
                <span className="relative ">
                  <input
                    type="text"
                    name="customerName"
                    className="input peer"
                    required
                    onChange={(e) => {
                      console.log(formData);
                      setFormData({ ...formData, name: e.target.value });
                    }}
                  />
                  <label htmlFor="customerName" className="label">
                    Customer Name
                  </label>
                </span>
                <span className="relative ">
                  <input
                    type="text"
                    name="addressLine1"
                    className="input peer"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        addressLine1: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="streetAddress" className="label">
                    Street Address
                  </label>
                </span>
                <span className="relative ">
                  <input
                    type="text"
                    name="addressLine2"
                    className="input peer"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        addressLine2: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="city_state_zip" className="label">
                    City, State, Zip
                  </label>
                </span>
                <span className="relative ">
                  <input
                    type="email"
                    name="email"
                    className="input peer"
                    required
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                  />
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                </span>

                <button
                  className="btn bg-primary text-background font-bold "
                  onClick={() => {
                    handleAddOrganization();
                  }}
                >
                  Submit
                </button>
              </span>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </span>
  );
};

export default AddOrganization;
