import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SIbutton from "./SIbutton";

export default async function UnAuth() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen mockup-browser border bg-base-300">
      <div className="mockup-browser-toolbar">
        <div className="input">https://Winter-House.com</div>
      </div>
      <div className="h-screen flex justify-center items-center  px-4 py-16 bg-base-200">
        You must Logging To continue...
        <SIbutton session={session}></SIbutton>
      </div>
    </div>
  );
}
