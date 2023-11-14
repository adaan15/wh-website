"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface productcardprops {
  product: Product;
}

export default function ProductCard({ product }: productcardprops) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={"/products/" + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.imageurl}
          alt={product.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name + "  "}
          {isNew && <div className="badge badge-secondary">NEW!</div>}
        </h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
}
