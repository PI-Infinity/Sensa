"use client";
import { useAppContext } from "@/context/app";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  const { loading, theme, language, setLanguage, isMobile, activeLanguage } =
    useAppContext();
  const pathname = usePathname();
  const router = useRouter();
  const changeLanguage = (lang: string) => {
    localStorage.setItem("sarko-events:language", lang);
    Cookies.set("language", lang, { expires: 30, path: "/" }); // 🔥 ქუქიში ვწერთ ენას
    // 2. შეცვალე URL → ჩანაცვლებით
    const segments = pathname.split("/"); // ['', 'ka', 'contact']
    segments[1] = lang; // შეცვალე ენა
    const newPath = segments.join("/");

    // 3. გადამისამართება ახალ ენაზე
    router.push(newPath);
  };
  return (
    <div
      style={{
        display:
          loading || pathname.includes("/dashboard") || pathname.includes("qr")
            ? "none"
            : "flex",
        boxShadow: !isMobile ? "-2px -2px 8px rgba(0, 0, 0, 0.1)" : "none",
        background: "rgba(0, 0, 255, 0.03)",
      }}
      className="z-40 px-8 desktop:px-20 pt-8 pb-6 w-full
      desktop:border-t-[0.5px] desktop:border-t-[rgba(255,255,255,0.1)]
      flex-col"
    >
      <div className="w-full flex flex-col desktop:flex-row desktop:justify-between gap-12">
        <div className="flex-col desktop:gap-8 w-1/6">
          <Link
            href={`/${language}`}
            className="flex items-center gap-4 scale-up cursor-pointer"
          >
            <h3 className="font-mineFont text-4xl font-bold text-[#111]">
              Sensa
            </h3>
          </Link>
          <div className="mt-8 flex flex-col gap-[16px] items-start justify-center">
            <div className="flex items-center desktop:justify-center gap-4 ">
              <a
                // href={
                //   isMobile
                //     ? "fb://profile/61562564296082"
                //     : "https://www.facebook.com/profile.php?id=61562564296082"
                // }
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook color={"#111"} size={isMobile ? 20 : 20} />
              </a>
              <a
                // href={
                //   isMobile
                //     ? "instagram://user?username=sarko_events"
                //     : "https://www.instagram.com/sarko_events"
                // }
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram color={"#111"} size={isMobile ? 20 : 20} />
              </a>
              {/* <a
            href={
              isMobile
                ? "https://www.tiktok.com/@sarko.events"
                : "https://www.tiktok.com/@sarko.events"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok color={"#111"} size={20} />
          </a> */}
              {/* <a
            href={
              isMobile
                ? "vnd.youtube://www.youtube.com/channel/UC0Fwr1O2Imxpc6mf-PhZwyg"
                : "https://www.youtube.com/channel/UC0Fwr1O2Imxpc6mf-PhZwyg"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube color={"#111"} size={20} />
          </a> */}
              <a
                // href={
                //   isMobile ? "tg://resolve?domain=DG3IK" : "https://t.me/DG3IK"
                // }
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram color={"#111"} size={isMobile ? 20 : 20} />
              </a>
              <a
                // href={
                //   isMobile
                //     ? "whatsapp://send?phone=+995597233355"
                //     : "https://wa.me/+995597233355"
                // }
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp color={"#111"} size={isMobile ? 20 : 20} />
              </a>
              {/* <a
            href={
              isMobile
                ? "linkedin://in/sarko-events-21438531a"
                : "https://www.linkedin.com/in/sarko-events-21438531a"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin color={"#111"} size={20} />
          </a> */}
              <a
                // href="mailto:sarko.events@Gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdEmail color={"#111"} size={isMobile ? 22 : 24} />
              </a>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-2">
          <h3 className="text-md font-bold text-[#111] mb-2 text-underline text-decoration-line: underline">
            Products
          </h3>
          <Link href={`/${language}/terms`} key="terms">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer`}
            >
              {activeLanguage?.terms_rules_title}
            </h6>
          </Link>
          <Link href={`/${language}/privacy`} key="privacy">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer hover:opacity-[1] opacity-1 
                `}
            >
              {activeLanguage?.privacy_policy}
            </h6>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-bold text-[#111] mb-2 text-underline text-decoration-line: underline">
            Popular Features
          </h3>
          <Link href={`/${language}/terms`} key="terms">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer`}
            >
              {activeLanguage?.terms_rules_title}
            </h6>
          </Link>
          <Link href={`/${language}/privacy`} key="privacy">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer hover:opacity-[1] opacity-1 
                `}
            >
              {activeLanguage?.privacy_policy}
            </h6>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-bold text-[#111] mb-2 text-underline text-decoration-line: underline">
            Resources
          </h3>
          <Link href={`/${language}/terms`} key="terms">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer`}
            >
              {activeLanguage?.terms_rules_title}
            </h6>
          </Link>
          <Link href={`/${language}/privacy`} key="privacy">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer hover:opacity-[1] opacity-1 
                `}
            >
              {activeLanguage?.privacy_policy}
            </h6>
          </Link>
        </div> */}
        <div className="font-secondFont flex flex-col gap-2">
          <h3 className="text-md font-bold text-[#111] mb-2 text-underline text-decoration-line: underline">
            {activeLanguage.help}
          </h3>
          <Link href={`/${language}/terms`} key="terms">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer`}
            >
              {activeLanguage?.terms_rules_title}
            </h6>
          </Link>
          <Link href={`/${language}/privacy`} key="privacy">
            <h6
              style={{
                color: "#111",
                transition: "ease-in 200ms",

                fontSize: "12px",
              }}
              className={`cursor-pointer hover:opacity-[1] opacity-1 
                `}
            >
              {activeLanguage?.privacy_policy}
            </h6>
          </Link>
        </div>
        <div className="font-secondFont flex flex-col gap-2 desktop:gap-2 mr-24">
          <h3 className="text-md font-bold text-[#111] mb-2 text-underline text-decoration-line: underline">
            {activeLanguage.languages}
          </h3>
          <div
            onClick={() => changeLanguage("en")}
            style={{
              opacity: language === "en" ? 1 : 0.5,
              fontSize: "14px",
              color: "#111",
            }}
            className={` ${
              language !== "en"
                ? "hover:brightness-[0.8] cursor-pointer"
                : "cursor-default"
            }`}
          >
            English
          </div>
          <div
            className={` ${
              language !== "ka"
                ? "hover:brightness-[0.8] cursor-pointer"
                : "cursor-default"
            }`}
            onClick={() => changeLanguage("ka")}
            style={{
              opacity: language === "ka" ? 1 : 0.5,
              fontSize: "14px",
              color: "#111",
            }}
          >
            ქართული
          </div>

          <div
            className={` ${
              language !== "en"
                ? "hover:brightness-[0.8] cursor-pointer"
                : "cursor-default"
            }`}
            onClick={() => changeLanguage("ru")}
            style={{
              opacity: language === "ru" ? 1 : 0.5,
              fontSize: "14px",
              color: "#111",
            }}
          >
            Русский
          </div>
        </div>
      </div>

      <div
        style={{ color: "#111" }}
        className="z-10 flex items-center mt-auto pt-12"
      >
        &copy; Copyright
      </div>
    </div>
  );
};
