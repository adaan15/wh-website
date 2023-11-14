"use client";

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId: string;
  setProductQuantity: (productId: string, size: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  setProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [size, setSize] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div>
      <select
        required
        onChange={(e) => setSize(e.target.value)}
        className="select select-bordered w-full max-w-xs mb-3"
      >
        <option disabled selected>
          Choose Your Size.
        </option>
        <option value="M">{`M (W-40, L-27.5) `}</option>
        <option value="L">{`L (W-42, L-28.5) `}</option>
        <option value="XL">{`XL (W-44, L-29.5) `}</option>
      </select>
      <div className="flex items-center gap-2">
        <button
          className="btn-primary btn"
          onClick={() => {
            setSuccess(false);
            startTransition(async () => {
              await setProductQuantity(productId, size);
              setSuccess(true);
            });
          }}
        >
          Add to Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
        {isPending && <span className="loading loading-spinner loading-md" />}
        {!isPending && success && (
          <span className="text-success">Added to Cart.</span>
        )}
      </div>
    </div>
  );
}
