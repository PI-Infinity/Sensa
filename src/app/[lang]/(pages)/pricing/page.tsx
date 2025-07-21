"use client";
import Button from "@/components/button";
import Img from "@/components/image";
import { useAppContext } from "@/context/app";
import Link from "next/link";
import { MdCalendarMonth } from "react-icons/md";
import { NextSeo } from "next-seo";
import Head from "next/head";

const Pricing = () => {
  const { theme, language, loading, activeLanguage } = useAppContext();
  return (
    <>
      <div
        className="flex-1"
        style={{ color: theme.text, display: loading ? "none" : "flex" }}
      >
        <div className="w-full h-full px-4 py-4 pt-[100px] slide-in-top flex flex-col items-center"></div>
      </div>
    </>
  );
};

export default Pricing;
