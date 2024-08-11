import { FC, useEffect, useState } from "react";
import { Photo } from "./Photo";
import axios from "axios";
import { CustomerInfo } from "../types/CustomerInfo";
import { CUSTOMER_API } from "../config/apiConfig";

export const Customer: FC = () => {
  const [customersData, setCustomersData] = useState<CustomerInfo[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInfo | null>(
    null
  );

  useEffect(() => {
    axios
      .get(CUSTOMER_API)
      .then((res) => {
        setCustomersData(res.data.users);
        setSelectedCustomer(res.data.users[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex">
      <div className="w-1/3">
        <div className="sticky top-0 h-screen overflow-y-auto bg-gray-100 p-4">
          {customersData.length > 0 ? (
            customersData.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 border-b last:border-none cursor-pointer ${
                  selectedCustomer && selectedCustomer.id === customer.id
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <h2 className="text-lg font-semibold">
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className="text-gray-500">{customer.company.title}</p>
              </div>
            ))
          ) : (
            <div className="flex justify-center">Loading customers...</div>
          )}
        </div>
      </div>
      {selectedCustomer ? (
        <div className="w-2/3 p-8 sticky top-0 h-screen overflow-y-auto bg-white">
          <h2 className="text-center text-2xl font-semibold">
            {selectedCustomer.firstName} {selectedCustomer.lastName}
          </h2>
          <p className="text-gray-600 mt-4 text-center">
            {selectedCustomer.company.title}
          </p>
          <p className="text-gray-600 mt-4 text-center">
            {selectedCustomer.address.address}
            {", "} {selectedCustomer.address.city}
            {", "}
            {selectedCustomer.address.country}
          </p>
          <Photo customerId={selectedCustomer.id} />
        </div>
      ) : (
        <div className="mx-auto">Loading customer details...</div>
      )}
    </div>
  );
};
