"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

interface SIbuttonProps {
  session: Session | null;
}

export default function SIbutton({ session }: SIbuttonProps) {
  const user = session?.user;
  if (user) {
    redirect("/");
  }

  return (
    <button className="m-3 btn btn-accent" onClick={() => signIn()}>
      Sign In
    </button>
  );
}
