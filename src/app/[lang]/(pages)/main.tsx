"use client";
import { useAppContext } from "@/context/app";
import { useEffect, useRef, useState } from "react";
import { ClerkLoading, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { MdQrCodeScanner } from "react-icons/md";

const Main = () => {
  // app context
  const { theme, loading, gallery, activeLanguage, language, isMobile } =
    useAppContext();
  const { user } = useUserStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRefMob = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("canplaythrough", () =>
        setIsLoaded(true)
      );
    }
  }, [videoRef]);

  return (
    <div className="desktop:p-20 p-8 w-full h-[100vh] flex flex-col gap-16">
      {!isMobile && (
        <div
          className="desktop:w-[1500px] desktop:h-[800px] bg-[blue] absolute top-[-200px] left-[-600px] opacity-[0.03]"
          style={{ transform: "rotate(-50deg)" }}
        />
      )}
      {!isMobile && (
        <div className="absolute top-32 w-[600px] h-[700px] top-32 right-24 rounded-xl flex items-center">
          <Image src={"/main.png"} alt="img" width={600} height={700} />
        </div>
      )}
      <div
        style={{ color: theme.text }}
        className="w-full h-full slide-in-right flex flex-row gap-16 relative overflow-hidden desktop:mt-20 desktop:py-24"
      >
        <div className="relative bottom-8 w-full desktop:w-2/5 desktop:ml-16 flex flex-col justify-center items-center gap-8">
          <div
            style={{
              boxShadow: isMobile
                ? "4px 4px 4px rgba(0, 0, 0, 0.2)"
                : "8px 8px 8px rgba(0, 0, 0, 0.2)",
            }}
            className="relative overflow-hidden rounded-xl w-[150px] desktop:w-[100px] h-[150px] desktop:h-[100px] flex items-center"
          >
            <Image
              src={"/qr.jpg"}
              alt="img"
              width={isMobile ? 150 : 100}
              height={isMobile ? 150 : 100}
            />
          </div>
          <h1 className="font-secondFont text-3xl text-[#111] text-center font-bold">
            {activeLanguage.coverTitle}
          </h1>
          <h3 className="font-secondFont text-md text-[#111] text-center">
            {activeLanguage?.coverDesc}
          </h3>
          {!user ? (
            <SignInButton
              forceRedirectUrl={`/${language}/dashboard
            `}
            >
              <button
                className="w-full h-12 desktop:h-14 flex items-center justify-center text-white font-semibold rounded-full shadow-md"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)",
                }}
              >
                {activeLanguage.dashboard}
              </button>
            </SignInButton>
          ) : (
            <Link
              href={`/${language}/dashboard`}
              className="w-full h-12 desktop:h-14 flex items-center justify-center text-white font-semibold rounded-full shadow-md"
              style={{
                background:
                  "linear-gradient(45deg, rgba(0, 183, 255, 1) 0%, rgba(180, 87, 199, 1) 50%, rgba(237, 209, 83, 1) 100%)",
              }}
            >
              {activeLanguage.dashboard}
            </Link>
          )}
        </div>
      </div>

      {/* <div className="w-full flex flex-col justify-center gap-8">
        <h1 className="text-3xl text-[#111] font-bold">300+ Partners</h1>
        <div
          className="flex flex-wrap opacity-[0.3] mt-8 w-2/3"
          style={{ rowGap: "20px", columnGap: "32px" }}
        >
          {partners?.map((p: any, x: number) => {
            return (
              <div
                className="text-[32px] font-[800] bg-[rgba(0,0,0,0.05)] px-4 py-2 rounded-xl"
                key={p.id}
              >
                {p.label}
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default Main;

const partners = [
  {
    id: "coca_cola",
    label: "Coca Cola",
  },
  {
    id: "adjara_group",
    label: "Adjara Group",
  },
  {
    id: "alta",
    label: "Alta",
  },
  {
    id: "askaneli",
    label: "Askaneli",
  },
  {
    id: "tbilvino",
    label: "Tbilvino",
  },
  {
    id: "bernard",
    label: "Bernard",
  },
  {
    id: "carrfour",
    label: "Carrfour",
  },
  {
    id: "city_mall",
    label: "City Mall",
  },
  {
    id: "georgian_railway",
    label: "Georgian Railway",
  },
];
