import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/component/formsubmitbutton";

export const metadata = {
  title: "Add Product - Winter House",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageurl = formData.get("imageUrl")?.toString();
  const category = formData.get("category")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageurl || !price || !category) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageurl, price, category },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <select
          required
          name="category"
          className="select select-bordered w-full  mb-3"
        >
          <option disabled selected>
            Select Category
          </option>
          <option>Hoodie</option>
          <option>Sweatshirt</option>
        </select>
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block btn-accent">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
