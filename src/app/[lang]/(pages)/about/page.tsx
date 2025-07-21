"use client";
import Button from "@/components/button";
import Img from "@/components/image";
import { useAppContext } from "@/context/app";
import Link from "next/link";
import { MdCalendarMonth } from "react-icons/md";
import { NextSeo } from "next-seo";
import Head from "next/head";

const AboutUs = () => {
  const { theme, language, loading, activeLanguage } = useAppContext();
  return (
    <>
      <div
        className="desktop:py-16"
        style={{ color: theme.text, display: loading ? "none" : "flex" }}
      >
        <div className="w-full h-full px-8 py-4 pt-[90px] slide-in-top flex flex-col items-center">
          {texts.map((item: any, index: number) => {
            return (
              <div className="w-full desktop:max-w-[50%] mx-auto" key={index}>
                <div className="mt-4">
                  <h2 className="text-xl mb-2 font-semibold">
                    {item.title[language]}
                  </h2>
                  {item?.list[language] && (
                    <ul className="list-disc pl-5 text-md">
                      {item?.list[language].map((i: any, index: number) => {
                        return (
                          <li key={index} className="italic">
                            {i}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-md italic">{item.description[language]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AboutUs;

const texts = [
  {
    title: {
      en: "Smart Feedback System",
      ru: "Умная система отзывов",
      ka: "ჭკვიანი უკუკავშირის სისტემა",
    },
    description: {
      en: "Sensa transforms how businesses collect feedback by using QR codes placed on-location. It’s fast, seamless, and effective.",
      ru: "Sensa меняет способ сбора отзывов с помощью QR-кодов, размещенных в заведениях. Это быстро, удобно и эффективно.",
      ka: "Sensa ცვლის უკუკავშირის მიღების მიდგომას QR კოდების საშუალებით, რომლებიც განთავსებულია ობიექტში. ეს არის სწრაფი, მარტივი და ეფექტური.",
    },
    list: [],
  },
  {
    title: {
      en: "Real-Time Insights",
      ru: "Аналитика в реальном времени",
      ka: "რეალურ დროში ანალიზი",
    },
    description: {
      en: "Instantly access customer feedback and monitor satisfaction levels to improve service quality on the go.",
      ru: "Мгновенный доступ к отзывам клиентов и уровню удовлетворенности для улучшения качества обслуживания.",
      ka: "მყისიერი წვდომა მომხმარებლის უკუკავშირთან და კმაყოფილების დონესთან — მომსახურების გასაუმჯობესებლად.",
    },
    list: [],
  },
  {
    title: {
      en: "Customizable Feedback Types",
      ru: "Настраиваемые типы отзывов",
      ka: "მორგებადი უკუკავშირის ტიპები",
    },
    description: {
      en: "Sensa lets you define what kind of feedback you want: stars, emojis, comments, or all together. You’re in control.",
      ru: "Вы сами выбираете, какой формат отзывов вам подходит — звезды, эмодзи, комментарии или всё вместе.",
      ka: "თქვენ განსაზღვრავთ უკუკავშირის ფორმატს: ვარსკვლავები, ემოჯები, კომენტარები — ან ყველა ერთად.",
    },
    list: [],
  },
  {
    title: {
      en: "Multilingual & Accessible",
      ru: "Мультиязычный и доступный",
      ka: "მრავალენოვანი და ხელმისაწვდომი",
    },
    description: {
      en: "Designed for diverse businesses and audiences, Sensa supports multiple languages to ensure inclusivity and clarity.",
      ru: "Sensa поддерживает несколько языков, обеспечивая комфортное использование для всех клиентов.",
      ka: "Sensa მრავალენოვანია და უზრუნველყოფს კომფორტს ყველა მომხმარებლისთვის.",
    },
    list: [],
  },
  {
    title: {
      en: "Why Businesses Choose Sensa",
      ru: "Почему выбирают Sensa",
      ka: "რატომ ირჩევენ Sensa-ს",
    },
    description: {
      en: "Sensa is built to help businesses grow through better customer understanding. Join us and modernize your feedback process.",
      ru: "Sensa помогает бизнесу расти за счет лучшего понимания клиентов. Присоединяйтесь и обновите процесс получения отзывов.",
      ka: "Sensa ეხმარება ბიზნესებს მომხმარებლის უკეთ გაგებაში და განვითარებაში. შემოგვიერთდით და გააუმჯობესეთ უკუკავშირის სისტემა.",
    },
    list: {
      en: [
        "QR-based instant feedback collection",
        "Dashboard with powerful analytics",
        "Custom branding and color schemes",
        "Seamless setup and support",
      ],
      ka: [
        "QR-ზე დაფუძნებული უკუკავშირის შეგროვება",
        "მძლავრი ანალიტიკა სამართავ პანელში",
        "მორგებადი ბრენდინგი და ფერის სქემები",
        "მარტივი ინსტალაცია და მხარდაჭერა",
      ],
      ru: [
        "Сбор отзывов через QR-коды",
        "Мощная аналитика в панели управления",
        "Индивидуальный брендинг и цветовые схемы",
        "Простая настройка и поддержка",
      ],
    },
  },
];
