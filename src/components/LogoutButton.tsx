"use client";

import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

const LogoutButton = () => {
  return (
    <SignOutButton redirectUrl="/sign-in">
      <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight">
        <Image src="/logout.png" alt="" width={20} height={20} />
        <span className="hidden lg:block">Logout</span>
      </div>
    </SignOutButton>
  );
};

export default LogoutButton; 