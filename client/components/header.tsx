"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import Profile from "./profile";

const Header = () => {
  const pathname = usePathname();
  const {isAuthenticated} = useGlobalContext();

  return (
    <header className="px-10 py-6 bg-[#D7DEDC] text-gray-500 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className="font-bold text-3xl text-[#7263f3]">HireHaven</h1>
      </Link>
      <Image src="/logo.svg" width={50} height={50} alt="logo" />
      <ul className="flex items-center gap-4">
        <li>
          <Link
            href={"/findwork"}
            className={`py-2 px-4 rounded-md text-xl transition-all duration-200 ease-in-out ${
              pathname === "/findwork"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : "hover:text-[#7263F3] hover:border-[#7263F3] hover:border hover:bg-[#7263F3]/10"
            }`}
          >
            Find Work
          </Link>
        </li>
        <li>
          <Link
            href={"/myjobs"}
            className={`py-2 px-4 text-xl rounded-md transition-all duration-200 ease-in-out ${
              pathname === "/myjobs"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : "hover:text-[#7263F3] hover:border-[#7263F3] hover:border hover:bg-[#7263F3]/10"
            }`}
          >
            My Jobs
          </Link>
        </li>
        <li>
          <Link
            href={"/post"}
            className={`py-2 px-4 text-xl rounded-md transition-all duration-200 ease-in-out ${
              pathname === "/post"
                ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                : "hover:text-[#7263F3] hover:border-[#7263F3] hover:border hover:bg-[#7263F3]/10"
            }`}
          >
            Post a Job
          </Link>
        </li>
        <li>
    <Link
      href={"/review"}
      className={`py-2 px-4 rounded-md text-xl transition-all duration-200 ease-in-out ${
        pathname === "/review"
          ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
          : "hover:text-[#7263F3] hover:border-[#7263F3] hover:border hover:bg-[#7263F3]/10"
      }`}
    >
      Reviews
    </Link>
    <Link
      href={"/test"}
      className={`py-2 px-4 rounded-md text-xl transition-all duration-200 ease-in-out ${
        pathname === "/test"
          ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
          : "hover:text-[#7263F3] hover:border-[#7263F3] hover:border hover:bg-[#7263F3]/10"
      }`}
    >
      Test
    </Link>
  </li>
      </ul>
      <div className="flex items-center gap-4">
      {isAuthenticated ? (
        
      <Profile/>
  ) : (
          <div className="flex items-center gap-6">
            <Link
              href={"http://localhost:7895/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href={"http://localhost:7895/login"}
              className="py-2 px-6 rounded-md border flex items-center gap-4 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
