"use client";
import RequestForm from "@/components/request-form";
import { useAppContext } from "@/context/app";
import { useEffect } from "react";
import { FaMobileButton } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
} from "@clerk/nextjs";

const Contact = () => {
  const { loading, isMobile, theme } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{ display: loading ? "none" : "flex" }}
      className="oveflow-hidden w-[100%] h-[100vh] slide-in-top pt-[300px] desktop:pt-[372px] flex-col desktop:flex-row items-center justify-center desktop:items-start px-6 desktop:px-[5%] gap-4 desktop:gap-8 pb-[64px] desktop:pb-[8px]"
    >
      {/* <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
};

export default Contact;
