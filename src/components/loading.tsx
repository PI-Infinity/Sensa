"use client";
import { useAppContext } from "@/context/app";
import { MdQrCode2 } from "react-icons/md";

export const Loading = () => {
  const { loading, theme } = useAppContext();

  return (
    <div
      style={{ display: loading ? "flex" : "none" }}
      className="fixed bg-white w-full z-40 h-full flex-col items-center justify-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl flex items-center gap-1">
        <MdQrCode2 size={56} color="#111" />
      </div>
    </div>
  );
};
