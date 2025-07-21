"use client";
import Main from "@/app/[lang]/(pages)/main";
import AcceptPopup from "@/components/accept-popup";
import { useAppContext } from "@/context/app";

export default function Home() {
  const { loading } = useAppContext();

  return (
    <main
      style={{ display: loading ? "none" : "flex" }}
      className="w-full flex-col items-center"
    >
      <Main />
      <AcceptPopup />
    </main>
  );
}
