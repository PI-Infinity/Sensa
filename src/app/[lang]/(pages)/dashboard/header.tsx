import { useAppContext } from "@/context/app";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { RiMenuUnfold2Fill } from "react-icons/ri";

const Header = ({ setOpenMenu }: any) => {
  const { language, isMobile } = useAppContext();
  return (
    <div
      style={{
        background: "rgba(0, 0, 255, 0.03)",
      }}
      className="w-[100%] h-[60px] px-6 flex border-b items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {isMobile && (
          <div
            className="desktop:hidden cursor-pointer"
            onClick={() => setOpenMenu(true)}
          >
            <RiMenuUnfold2Fill size={24} />
          </div>
        )}
        <Link
          href={`/${language}`}
          className="font-mineFont text-2xl font-bold z-10 relative"
        >
          Sensa
        </Link>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
