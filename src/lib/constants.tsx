import { Building2, Home, SquarePen } from "lucide-react";
import { billing_address_interface, nav_link } from "./types";
export const sidebar_nav: nav_link[] = [
  {
    title: "Home",
    icon: <Home />,
    link: "/dashboard",
    isActive: true,
  },
  {
    title: "Generate Invoice",
    icon: <SquarePen />,
    link: "/dashboard/generate-invoice",
    isActive: false,
  },
  {
    title: "Register Organization",
    icon: <Building2 />,
    link: "/dashboard/register-organization",
    isActive: false,
  },
];

// examples
export const organizations: billing_address_interface[] = [
  {
    name: "Organization 1",
    addressLine1: "123 Main St",
    addressLine2: "Suite 100",
    email: "abc@gmail.com",
  },
  {
    name: "Organization 2",
    addressLine1: "456 Elm St",
    addressLine2: "Suite 200",
    email: "xyz@org.com",
  },
];
