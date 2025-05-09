"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
// import logo from "../assets/logonobg.png";
import { RiShoppingBag4Line } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { HiX, HiMenu } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const session = useSession();
  console.log("Session:", session);

  useEffect(() => {
    console.log("Current route:", pathname);
  }, [pathname]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="w-full h-20 bg-white flex justify-between items-center px-4">
      <div>
        {/* <Image src={logo} width={100} height={100} alt="logo" /> */}
      </div>

      <div className="hidden md:block text-[16px]">
        <ul className="flex gap-8">
          <li className="relative group">
            <Link
              className={`${pathname === "/" ? "font-bold underline underline-offset-" : " "
                }`}
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              href="/dashboard"
              className={`${pathname.includes("dashboard")
                ? "font-bold underline underline-offset-"
                : " "
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="relative group">
            <Link
              className={`${pathname.includes("departments")
                ? "font-bold underline underline-offset-"
                : " "
                }`}
              href="/departments"
              onClick={() => setIsMenuOpen(false)}
            >
              Departments
            </Link>
          </li>
          <li className="relative group">
            <Link
              className={`${pathname.includes("projects")
                ? "font-bold underline underline-offset-"
                : " "
                }`}
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white z-10 py-4 md:hidden">
          <ul className="flex flex-col items-center gap-4">
            <li className="relative group">
              <Link
                className={`${pathname === "/"
                  ? "font-bold underline underline-offset-"
                  : " "
                  }`}
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/dashboard"
                className={`${pathname.includes("dashboard")
                  ? "font-bold underline underline-offset-"
                  : " "
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li className="relative group">
              <Link
                className={`${pathname.includes("departments")
                  ? "font-bold underline underline-offset-"
                  : " "
                  }`}
                href="/departments"
                onClick={() => setIsMenuOpen(false)}
              >
                Departments
              </Link>
            </li>
            <li className="relative group">
              <Link
                className={`${pathname.includes("projects")
                  ? "font-bold underline underline-offset-"
                  : " "
                  }`}
                href="/projects"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="flex gap-4 items-center">
        {session.status !== "authenticated" && <Link
          href={"/login"}
          className=" bg-black text-white px-4  py-2  rounded hover:bg-gray-800 transition-colors "
        >
          Login
        </Link>}
        {session.status === "authenticated" && <button
          onClick={() => handleLogout()}
          className=" bg-black text-white px-4  py-2  rounded hover:bg-gray-800 transition-colors "
        >
          Logout
        </button>}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <HiX size={34} className="font-light" />
          ) : (
            <HiMenu size={34} className="font-light" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
