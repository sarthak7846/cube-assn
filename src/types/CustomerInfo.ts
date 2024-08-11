export interface CustomerInfo {
  id: string;
  firstName: string;
  lastName: string;
  company: {
    title: string;
  };
  address: {
    address: string;
    city: string;
    country: string;
  };
}
