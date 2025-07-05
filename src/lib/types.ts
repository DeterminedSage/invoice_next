export interface nav_link {
  title: string;
  link: string;
  icon: JSX.Element;
  isActive?: boolean;
}

export interface billing_address_interface {
  name: string;
  addressLine1: string;
  addressLine2: string;
  email: string;
}

export interface invoice_interface {
  invoice_number: number;
  invoice_date: string;
  bill_to: billing_address_interface;
  bill_from: billing_address_interface;
  descriptions: {
    description: string;
    price: number;
  }[];
  total: number;
}

export interface user_interface {
  _id: string;
  name: string;
  email: string;
}

// export interface invoice_interface {
//   invoice_number: number;
//   invoice_date: string;
//   bill_to: billing_address_interface;
//   descriptions: {
//     description: string;
//     price: number;
//   }[];
// }

/**
 [
{
 description:chicken,
  price: 200
 },{
 description:milk,
  price: 300},{
  description:egg,
  price: 100
  }
 ]
 

 */
