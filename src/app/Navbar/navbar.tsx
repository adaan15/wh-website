import Image from "next/image";
import logo from "./WH(LOGO).png";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./userMenuButto";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1 pl-3">
        <Link href={`/`} className="btn btn-ghost normal-case text-xl ">
          <Image src={logo} height={50} width={55} alt="logo" />
          Winter House
        </Link>
      </div>
      <div className="flex-none gap-2 pr-3">
        <ShoppingCartButton cart={cart} />
        <form action={searchProducts}>
          <div className="tabs tabs-boxed">
            <a className="tab">Hoodie</a>
            <a className="tab tab-active">Sweatshirt</a>
          </div>
        </form>
        <UserMenuButton session={session}></UserMenuButton>
      </div>
    </div>
  );
}
