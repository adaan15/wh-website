"use client";
import React, { useState } from "react";
import { formatPriceBDT } from "@/lib/format";

interface shippingprops {
  subtotal: string;
}

const ShippingCharge = ({ subtotal }: shippingprops) => {
  const [shippingOption, setShippingOption] = useState("60"); // Default value for Inside Dhaka

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.target.value;
    setShippingOption(selectedOption);
  };

  return (
    <>
      <div className="border-b">
        <div className="form-control ">
          <label className="label cursor-pointer">
            <span className="label-text">Inside Dhaka</span>
            <input
              required
              type="radio"
              name="radio-10"
              className="radio checked:bg-red-500"
              value="60"
              checked={shippingOption === "60"}
              onChange={handleShippingChange}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Outside Dhaka </span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              value="100"
              checked={shippingOption === "100"}
              onChange={handleShippingChange}
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">
            {formatPriceBDT(Number(shippingOption))}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          {formatPriceBDT(Number(subtotal) + Number(shippingOption))}
        </p>
      </div>
    </>
  );
};

export default ShippingCharge;
