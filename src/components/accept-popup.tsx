"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/app";

export default function AcceptPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const { activeLanguage } = useAppContext();

  useEffect(() => {
    const hasAccepted = Cookies.get("termsAccepted");
    // const hasAccepted = false;
    if (!hasAccepted) {
      setTimeout(() => setShowPopup(true), 500); // 1 წამში გამოჩნდება
    }
  }, []);

  const acceptTerms = () => {
    Cookies.set("termsAccepted", "true", { expires: 365 }); // 1 წელი იმახსოვრებს
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-70 animate-fadeIn">
      <div
        style={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)", // ✅ Webkit-prefixed სწორი ფორმა
        }}
        className="p-6 rounded-lg shadow-lg w-full  text-center animate-slideUp absolute bottom-0"
      >
        <h2 className="text-lg font-semibold text-white">
          {activeLanguage?.accept}
        </h2>
        <p className="text-sm text-white mt-2">
          {activeLanguage?.read_and_accept}{" "}
          <a href="/terms" className="text-orange-600 underline">
            {activeLanguage?.terms_rules}
          </a>{" "}
          {activeLanguage?.and}{" "}
          <a href="/privacy" className="text-orange-600 underline">
            {activeLanguage?.privacy}
          </a>
          .
        </p>
        <button
          onClick={acceptTerms}
          className="mt-4 bg-white text-black px-12 py-1 rounded-lg hover:bg-gray-300 transition text-sm font-[600]"
        >
          {activeLanguage?.i_accept}
        </button>
      </div>
    </div>
  );
}
