import { checkLoggedIn } from "./infoActions";
import { getCart } from "@/lib/db/cart";
import { redirect } from "next/navigation";
import Cartlist from "./cartitem";
import { formatPriceBDT } from "@/lib/format";
import { PrismaClient } from "@prisma/client";
import FormSubmitButton from "@/component/formsubmitbutton";
// import CheckoutCreateArgs from "@prisma/client";

async function Checked() {
  const sess = await checkLoggedIn();
  if (!sess) {
    return null;
  } else {
    return sess;
  }
}

const prisma = new PrismaClient();

export default async function CheckoutPage() {
  const delCharge = 50;

  const session = await Checked();
  if (!session) {
    redirect("/Unauthorized");
  }

  const cart = await getCart();

  const subtotal = cart?.subtotal;
  const u_id = cart?.userId || "";

  // console.log(cart?.items);
  // console.log(cart);

  async function orderProduct(formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const district = formData.get("district")?.toString();
    const subdistrict = formData.get("sub-district")?.toString();
    const fullAddress = formData.get("fulladdress")?.toString();
    const transID = formData.get("transid")?.toString();
    const postcode = formData.get("zipcode")?.toString();
    const price = Number(subtotal);

    const Pitems = cart?.items;
    const newItems: any[] = [];
    if (Pitems) {
      Pitems.forEach((cartItem) => {
        newItems.push({
          name: cartItem.product?.name,
          quantity: cartItem.quantity,
          size: cartItem.size,
        });
      });
    }
    if (
      !email ||
      !phone ||
      !district ||
      !subdistrict ||
      !fullAddress ||
      !transID ||
      !postcode ||
      !price
    ) {
      throw Error("Missing required fields");
    }

    await prisma.checkout.create({
      data: {
        user: { connect: { id: u_id } },
        items: newItems,
        email,
        phone,
        district,
        subdistrict,
        fullAddress,
        transID,
        postcode,
        price,
      },
    });
    const deleteCart = async () => {
      const cart = await getCart();
      if (cart) {
        await prisma.cart.delete({
          where: { id: cart.id },
        });
      }
    };

    deleteCart();

    redirect("/OrderSuccessful");
  }

  return (
    <div className="grid sm:px-10 lg:grid-cols-2 ">
      <div className="px-4 pt-8">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {cart?.items.map((cartItem) => (
            <Cartlist cartItem={cartItem} key={cartItem.id}></Cartlist>
          ))}
        </div>

        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
        <div className="mt-5 grid gap-6">
          <div className="relative">
            <div className="ml-5">
              <span className="mt-2 font-semibold">
                Pathao Delivery Services
              </span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery in every 10 Days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* payment detailes */}
      <div className=" w-full mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        <form className="w-full" action={orderProduct}>
          <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
          <div className="relative">
            <input
              required
              name="email"
              type="email"
              placeholder="Type Your email here"
              className="input input-bordered w-full "
            />
          </div>
          <label className="mt-4 mb-2 block text-sm font-medium">
            Phone Number
          </label>
          <div className="relative">
            <input
              required
              name="phone"
              type="tel"
              placeholder="Type Your Number Here"
              className="input input-bordered w-full"
            />
          </div>
          <label className="mt-4 mb-2 block text-sm font-medium">
            District
          </label>
          <div className="relative ">
            <input
              required
              name="district"
              type="text"
              placeholder="Type your district here"
              className="input input-bordered w-full "
            />
          </div>

          <label className="mt-4 mb-2 block text-sm font-medium">
            Sub-District
          </label>
          <div className="relative ">
            <input
              required
              name="sub-district"
              type="text"
              placeholder="Type your district here"
              className="input input-bordered w-full "
            />
          </div>
          <label className="mt-4 mb-2 block text-sm font-medium">
            Detailed Address
          </label>
          <div className="relative ">
            <textarea
              required
              name="fulladdress"
              className="textarea textarea-bordered w-full"
              placeholder="Type your full address.Road number and House name"
            ></textarea>
          </div>
          <label className="mt-4 mb-2 block text-sm font-medium">
            Bkash Trans ID
          </label>
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-2/3">
              <input
                required
                type="text"
                name="transid"
                className="w-full input input-bordered"
                placeholder="Bkash Trans ID"
              />
            </div>
            <input
              required
              type="text"
              name="zipcode"
              className=" sm:w-1/3 input input-bordered"
              placeholder="POST-CODE"
            />
          </div>

          {/* <!-- Total --> */}
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">
                {formatPriceBDT(Number(cart?.subtotal))}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">
                {formatPriceBDT(delCharge)}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatPriceBDT(Number(cart?.subtotal) + delCharge)}
            </p>
          </div>

          <FormSubmitButton
            className="btn btn-accent relative mb-4
          "
          >
            Place Order
          </FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
