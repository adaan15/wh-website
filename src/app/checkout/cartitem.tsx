"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPriceBDT } from "@/lib/format";
import Image from "next/image";

interface CartListProps {
  cartItem: CartItemWithProduct;
}

export default function Cartlist({
  cartItem: { product, quantity, size },
}: CartListProps) {
  return (
    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
      <Image
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={product.imageurl}
        alt={product.name}
        width={200}
        height={200}
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{product.name}</span>
        <span className="float-right text-gray-400"> Quantity: {quantity}</span>
        <span className="float-right text-gray-400"> Quantity: {size}</span>
        <p className="text-lg font-bold">
          Total: {formatPriceBDT(product.price * quantity)}
        </p>
      </div>
    </div>
  );
}
