"use client";
import { useAppContext } from "@/context/app";
import { useUserStore } from "@/store/userStore";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import HeadRoom from "react-headroom";
import { RiMenuUnfold2Fill } from "react-icons/ri";

const Header = () => {
  // theme
  const { theme, loading, language, activeLanguage, isMobile, setMobileMenu } =
    useAppContext();

  const { user } = useUserStore();
  const pathname = usePathname();

  return (
    <HeadRoom
      downTolerance={20}
      upTolerance={20}
      className="fixed w-full z-10"
      style={{
        display:
          loading || pathname.includes("/dashboard") || pathname.includes("qr")
            ? "none"
            : "flex",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <NextTopLoader showSpinner={false} height={4} />
      <header
        className="w-full h-full
      flex items-center justify-between 
      py-2 desktop:py-[12px] px-6 desktop:px-16 shadow-sm desktop:shadow-md desktop:border-b-[4px] desktop:border-b-[rgba(255,255,255,0.2)]"
      >
        <Link
          href={`/${language}`}
          className="flex items-center gap-4 cursor-pointer"
        >
          <h1 className="font-mineFont text-[48px] font-bold text-[black]">
            Sensa
          </h1>
        </Link>

        <div className="w-full font-secondFont hidden slide-in-left desktop:flex items-center justify-end gap-[48px] text-textlight text-[16px] font-custom font-[500] ">
          <Link
            href={`/${language}`}
            style={{ borderRadius: 8, padding: "8px" }}
          >
            <h4
              style={{
                color: pathname === "/" ? theme.active : theme.text,
                borderColor: theme.text,
                transition: "ease-in 200ms",
              }}
              className={`cursor-pointer hover:opacity-[1] tracking-wider ${
                pathname === "/" ? "opacity-1" : "opacity-[0.5]"
              }`}
            >
              {activeLanguage.main}
            </h4>
          </Link>
          {/* <Link href={`/${language}/pricing`}>
            <h4
              style={{
                color: pathname?.includes("/pricing")
                  ? theme.active
                  : theme.text,
                borderColor: theme.text,
                transition: "ease-in 200ms",
              }}
              className={`cursor-pointer hover:opacity-[1] tracking-wider ${
                pathname?.includes("/pricing") ? "opacity-1" : "opacity-[0.5]"
              }`}
            >
              {activeLanguage.pricing}
            </h4>
          </Link> */}
          <Link
            href={`/${language}/about`}
            style={{ borderRadius: 8, padding: "8px" }}
          >
            <h4
              style={{
                color: pathname?.includes("/about") ? theme.active : theme.text,
                borderColor: theme.text,
                transition: "ease-in 200ms",
              }}
              className={`cursor-pointer hover:opacity-[1] tracking-wider ${
                pathname?.includes("/about") ? "opacity-1" : "opacity-[0.5]"
              }`}
            >
              {activeLanguage.about}
            </h4>
          </Link>
          <Link
            href={`/${language}/contact`}
            style={{ borderRadius: 8, padding: "8px" }}
          >
            <h4
              style={{
                color: pathname?.includes("/about") ? theme.active : theme.text,
                borderColor: theme.text,
                transition: "ease-in 200ms",
              }}
              className={`cursor-pointer hover:opacity-[1] tracking-wider ${
                pathname?.includes("/about") ? "opacity-1" : "opacity-[0.5]"
              }`}
            >
              {activeLanguage.contact}
            </h4>
          </Link>

          {user ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <SignInButton>
              <button
                style={{
                  background:
                    "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)",
                  border: "none",
                  borderRadius: 8,
                  color: "white",
                  padding: "8px 24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {activeLanguage.login}
              </button>
            </SignInButton>
          )}
        </div>
        <div className="flex items-center gap-8 justify-end">
          {isMobile && (
            <>
              {user ? (
                <SignedIn>
                  <UserButton />
                </SignedIn>
              ) : (
                <SignInButton>
                  <button
                    style={{
                      background:
                        "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                      padding: "6px 18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {activeLanguage.login}
                  </button>
                </SignInButton>
              )}
            </>
          )}

          <div
            className="desktop:hidden cursor-pointer"
            onClick={() => setMobileMenu(true)}
          >
            <RiMenuUnfold2Fill size={32} />
          </div>
        </div>
      </header>
    </HeadRoom>
  );
};

export default Header;
