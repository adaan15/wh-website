"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkLoggedIn = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error("Not logged IN!!!");
    return null;
  }
  return session;
};
