"use client";
import Button from "@/components/button";
import RequestForm from "@/components/request-form";
import { useAppContext } from "@/context/app";
import { useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMobile,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaMobileButton } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { usePathname } from "next/navigation";

const Contact = () => {
  const { loading, isMobile, theme } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{ display: loading ? "none" : "flex" }}
      className="oveflow-hidden w-[100%] slide-in-top pt-[100px] desktop:pt-[72px] flex-col desktop:flex-row items-center desktop:items-start px-6 desktop:px-[5%] gap-4 desktop:gap-8 pb-[64px] desktop:pb-[8px]"
    >
      <div className="w-full desktop:w-1/3 flex justify-center">
        <RequestForm />
      </div>
      <div className="flex flex-col gap-4 w-full desktop:w-1/3 relative desktop:top-24 desktop:left-24">
        <a
          href="mailto:sarko.events@Gmail.com"
          className="cursor-pointer flex items-center gap-2"
          style={{ textDecoration: "underline", color: theme.text }}
        >
          <MdEmail size={isMobile ? 24 : 32} color={theme.active} />{" "}
          <span
            className="text-md desktop:text-xl"
            style={{ color: theme.text }}
          >
            Sarko.events@gmail.com
          </span>
        </a>
        <div
          className="cursor-pointer flex items center gap-2"
          style={{ textDecoration: "underline", color: theme.text }}
        >
          <FaMobileButton size={isMobile ? 24 : 32} color={theme.active} />
          <div
            className="text-md desktop:text-xl"
            style={{ color: theme.text }}
          >
            <a
              href="tel:+995597233355"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              +995597233355
            </a>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Contact;
