"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "../../public/images/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { loginUser, logoutUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginUser({
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || null,
          })
        );
      } else {
        dispatch(logoutUser());
        router.push("/");
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAdmin = () => {
    toast("Admin is not configured yet", {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      toast("ℹ️ Log out successful", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast("Something went wrong", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <header
      className={`py-4 border-b border-[#adadad] mb-5 transition-all duration-300 ${
        visible
          ? "fixed top-0 left-0 translate-y-0 w-full bg-white px-4 sm:px-[10%] shadow-md z-50 "
          : "relative"
      }`}
    >
      <nav className="flex justify-between items-center ">
        <div>
          <Link href={"/"}>
            <Image
              className="w-44"
              src={assets?.logo}
              alt="logo"
              width={200}
              height={100}
            />
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-medium">
            {[
              { href: "/", label: "HOME" },
              { href: "/doctors", label: "ALL DOCTORS" },
              { href: "/about", label: "ABOUT" },
              { href: "/contact", label: "CONTACT" },
              { href: "/my-appointments", label: "APPOINTMENTS" },
            ].map(({ href, label }) => (
              <li
                key={href}
                className={`${
                  (href === "/" && pathname === "/") ||
                  (href !== "/" && pathname.startsWith(href))
                    ? "border-[#5f6fff] border-b-2 border-dashed font-medium"
                    : "hover:text-[#5f6fff]"
                }`}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
            <li
              onClick={handleAdmin}
              className="text-xs cursor-pointer text-indigo-500 border border-indigo-500 rounded-full px-3 py-1"
            >
              <span>Admin Panel</span>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          {user === null ? (
            <Link href={"/login"}>
              <button className="text-white bg-primary hover:bg-indigo-600 rounded-full px-4 py-2 text-sm">
                Create Account
              </button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex capitalize items-center gap-1 outline-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
                {user?.displayName} <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/edit-profile"}>Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"https://github.com/aadarshs12"}>
                    {" "}
                    View Developer Github Profile
                  </Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    target="_blank"
                    href={
                      "https://www.linkedin.com/in/aadarsh-singh-60a1a5229/"
                    }
                  >
                    View Developer Linkedin Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="lg:hidden block w-6">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Image
                src={assets?.menu_icon}
                alt="menu icon"
                width={50}
                height={50}
              />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-5 text-sm font-medium mt-4">
                {[
                  { href: "/", label: "HOME" },
                  { href: "/doctors", label: "ALL DOCTORS" },
                  { href: "/about", label: "ABOUT" },
                  { href: "/contact", label: "CONTACT" },
                  { href: "/my-appointments", label: "APPOINTMENTS"},
                ].map(({ href, label }) => (
                  <li
                    key={href}
                    className={`${
                      (href === "/" && pathname === "/") ||
                      (href !== "/" && pathname.startsWith(href))
                        ? "border-[#5f6fff] border-b-2 border-dashed font-medium w-fit"
                        : "hover:text-[#5f6fff]"
                    }`}
                  >
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
                <li
                  onClick={handleAdmin}
                  className="text-xs cursor-pointer w-fit text-indigo-500 border border-indigo-500 rounded-full px-3 py-1"
                >
                  <span>Admin Panel</span>
                </li>
                <li>
                  {user === null ? (
                    <Link href={"/login"}>
                      <button className="text-white bg-primary hover:bg-indigo-600 rounded-full px-4 py-1 text-sm">
                        Create Account
                      </button>
                    </Link>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex capitalize items-center gap-1 outline-none">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        {user?.displayName} <ChevronDown />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                         <DropdownMenuItem>
                  <Link href={"/edit-profile"}>Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"https://github.com/aadarshs12"}>
                    {" "}
                    View Developer Github Profile
                  </Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    target="_blank"
                    href={
                      "https://www.linkedin.com/in/aadarsh-singh-60a1a5229/"
                    }
                  >
                    View Developer Linkedin Profile
                  </Link>
                </DropdownMenuItem>

                        <DropdownMenuItem onClick={handleLogout}>
                          Log Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
