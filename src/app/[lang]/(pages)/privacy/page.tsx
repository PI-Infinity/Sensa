"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/app";
import { Suspense } from "react";

export const privacyContent: any = {
  en: {
    title: "Privacy Policy",
    last_update: "Last Updated",
    overview: "Overview",
    overview_text: `Sensa ("we", "company") respects your privacy and is committed to protecting your personal data. This Privacy Policy describes how we collect, use, and safeguard information through our QR-based feedback platform.`,
    accept_text:
      "By using our services, you agree to the terms described in this Privacy Policy.",
    collect_info: "What Information We Collect",
    personal_info: "📌 Personal Information",
    personal_info_list: [
      "Full Name (optional)",
      "Email Address (optional)",
      "Feedback content (e.g. comments, selected emoji or stars)",
    ],
    general_info: "📌 Non-Personal Information",
    general_info_list: [
      "Device and browser information",
      "IP address and location (if permitted)",
      "QR code scan metadata (timestamp, page, response type)",
    ],
    usage: "How We Use Your Information",
    usage_list: [
      "📌 To deliver feedback functionality",
      "📌 To generate analytics and insights for businesses",
      "📌 To improve platform performance",
      "📌 To ensure security and prevent misuse",
    ],
    share_data: "Data Sharing with Third Parties",
    share_data_text: `We do not sell your personal information. We may share minimal necessary data with third parties under these conditions:`,
    share_data_list: [
      "Service providers (hosting, analytics)",
      "Law enforcement (if legally required)",
      "Business transfers (e.g. acquisition)",
    ],
    rights: "Your Rights & Choices",
    rights_list: [
      "🔹 Request access or deletion of personal data",
      "🔹 Opt out of marketing (if applicable)",
      "🔹 Review and update privacy settings",
    ],
    security: "Security Measures",
    security_text:
      "We use modern technical and organizational security practices. However, no system can be 100% secure.",
    children: "Children's Privacy",
    children_text:
      "Sensa is not intended for children under 13. If we discover data from a minor, we will remove it promptly.",
    links: "Third-Party Links",
    links_text:
      "Some QR pages may link to external websites. We are not responsible for their content or privacy practices.",
    updates: "Policy Updates",
    updates_text:
      "We may update this policy periodically. Continued use of the platform indicates acceptance of changes.",
    contact: "Contact Us",
    email: "Email",
    website: "Website",
  },

  ka: {
    title: "კონფიდენციალურობის პოლიტიკა",
    last_update: "ბოლო განახლება",
    overview: "ზოგადი მიმოხილვა",
    overview_text: `Sensa ("ჩვენ", "კომპანია") აფასებს თქვენს კონფიდენციალურობას და იცავს თქვენს პირად მონაცემებს. ეს პოლიტიკა განმარტავს, როგორ აგროვებს, იყენებს და იცავს სისტემაში მოწოდებულ ინფორმაციას.`,
    accept_text:
      "სერვისის გამოყენებით, თქვენ ეთანხმებით აღნიშნულ კონფიდენციალურობის პოლიტიკას.",
    collect_info: "რა ინფორმაციას ვაგროვებთ",
    personal_info: "📌 პირადი ინფორმაცია",
    personal_info_list: [
      "სრული სახელი (სურვილისამებრ)",
      "ელფოსტის მისამართი (სურვილისამებრ)",
      "უკუკავშირის შინაარსი (კომენტარი, ემოჯი, ვარსკვლავები)",
    ],
    general_info: "📌 ზოგადი ინფორმაცია",
    general_info_list: [
      "მოწყობილობისა და ბრაუზერის ტიპი",
      "IP მისამართი და მდებარეობა (თუ ნებადართულია)",
      "QR სკანის მონაცემები (დრო, გვერდი, უკუკავშირის ტიპი)",
    ],
    usage: "როგორ ვიყენებთ თქვენს მონაცემებს",
    usage_list: [
      "📌 უკუკავშირის ფუნქციონალის უზრუნველსაყოფად",
      "📌 ანალიტიკისა და მონაცემების გენერირებისთვის ბიზნესებისთვის",
      "📌 პლატფორმის ხარისხის გაუმჯობესებისთვის",
      "📌 უსაფრთხოების და ბოროტად გამოყენების პრევენციისთვის",
    ],
    share_data: "მონაცემების გაზიარება მესამე მხარეებთან",
    share_data_text: `ჩვენ არ ვყიდით თქვენს პერსონალურ მონაცემებს. გაზიარება შეიძლება მოხდეს შემდეგ შემთხვევებში:`,
    share_data_list: [
      "სერვისის მომწოდებლები (ჰოსტინგი, ანალიტიკა)",
      "სამართლებრივი მოთხოვნის შემთხვევაში",
      "ბიზნესის გადაცემისას (მაგ. შეძენა)",
    ],
    rights: "თქვენი უფლებები და არჩევანი",
    rights_list: [
      "🔹 პერსონალური მონაცემების წვდომა ან წაშლა",
      "🔹 სარეკლამო შეტყობინებების გაუქმება",
      "🔹 კონფიდენციალურობის პარამეტრების გადახედვა",
    ],
    security: "უსაფრთხოების ზომები",
    security_text:
      "ჩვენ ვიყენებთ თანამედროვე ტექნიკურ და ორგანიზაციულ უსაფრთხოების ზომებს, თუმცა არცერთი სისტემა არაა სრულად დაცული.",
    children: "მიუწვდომელია ბავშვებისთვის",
    children_text:
      "Sensa არ არის განკუთვნილი 13 წლამდე ბავშვებისთვის. აღმოჩენის შემთხვევაში მათი მონაცემები წაიშლება.",
    links: "გარე ბმულები",
    links_text:
      "ზოგიერთ QR გვერდზე შეიძლება იყოს გარე ბმულები. ჩვენ არ ვაგებთ პასუხს მესამე მხარის კონტენტსა და პოლიტიკაზე.",
    updates: "პოლიტიკის განახლება",
    updates_text:
      "პოლიტიკა შეიძლება პერიოდულად განახლდეს. პლატფორმის გამოყენება ითვლება ცვლილებების მიღებად.",
    contact: "კონტაქტი",
    email: "ელფოსტა",
    website: "ვებსაიტი",
  },

  ru: {
    title: "Политика конфиденциальности",
    last_update: "Последнее обновление",
    overview: "Обзор",
    overview_text: `Sensa ("мы", "компания") уважает вашу конфиденциальность и защищает ваши персональные данные. Настоящая политика объясняет, как мы собираем, используем и обрабатываем данные через нашу платформу отзывов на основе QR-кодов.`,
    accept_text:
      "Используя наш сервис, вы соглашаетесь с настоящей политикой конфиденциальности.",
    collect_info: "Какие данные мы собираем",
    personal_info: "📌 Персональные данные",
    personal_info_list: [
      "Полное имя (необязательно)",
      "Электронная почта (необязательно)",
      "Содержание отзыва (комментарии, эмодзи, звезды)",
    ],
    general_info: "📌 Общая информация",
    general_info_list: [
      "Информация об устройстве и браузере",
      "IP-адрес и местоположение (если разрешено)",
      "Метаданные сканирования QR (время, страница, тип отзыва)",
    ],
    usage: "Как мы используем ваши данные",
    usage_list: [
      "📌 Обеспечение функциональности обратной связи",
      "📌 Генерация аналитики для бизнеса",
      "📌 Повышение качества платформы",
      "📌 Обеспечение безопасности и предотвращение злоупотреблений",
    ],
    share_data: "Передача данных третьим лицам",
    share_data_text: `Мы не продаем ваши персональные данные. Возможна передача ограниченной информации при следующих условиях:`,
    share_data_list: [
      "Поставщики услуг (хостинг, аналитика)",
      "Запросы государственных органов",
      "Передача компании или её части",
    ],
    rights: "Ваши права и выбор",
    rights_list: [
      "🔹 Доступ или удаление ваших данных",
      "🔹 Отказ от маркетинга",
      "🔹 Управление настройками конфиденциальности",
    ],
    security: "Меры безопасности",
    security_text:
      "Мы применяем современные меры защиты, но ни одна система не может гарантировать 100% безопасность.",
    children: "Конфиденциальность детей",
    children_text:
      "Sensa не предназначена для детей младше 13 лет. При обнаружении данных — они будут удалены.",
    links: "Ссылки на сторонние ресурсы",
    links_text:
      "Некоторые QR-страницы могут содержать внешние ссылки. Мы не несем ответственности за их политику.",
    updates: "Обновления политики",
    updates_text:
      "Мы можем обновлять эту политику. Использование сервиса означает согласие с изменениями.",
    contact: "Связаться с нами",
    email: "Электронная почта",
    website: "Веб-сайт",
  },
};

export default function PrivacyPolice() {
  return (
    <Suspense fallback={<div></div>}>
      <Main />
    </Suspense>
  );
}

function Main() {
  const [language, setLanguage] = useState("en");
  const searchParams = useSearchParams();

  useEffect(() => {
    const langFromCookies = Cookies.get("language") || "en";
    setLanguage(searchParams.get("lang") || langFromCookies);
  }, [searchParams?.toString()]);

  const content: any = privacyContent[language] || privacyContent.en;

  const [showButton, setshowButton] = useState(false);

  const { activeLanguage, loading } = useAppContext();

  useEffect(() => {
    const hasAccepted = Cookies.get("termsAccepted");
    // const hasAccepted = false;
    if (!hasAccepted) {
      setTimeout(() => setshowButton(true), 500); // 1 წამში გამოჩნდება
    }
  }, []);

  const acceptTerms = () => {
    Cookies.set("termsAccepted", "true", { expires: 365 }); // 1 წელი იმახსოვრებს
    setshowButton(false);
  };

  return (
    <div
      className="p-6 text-black desktop:mt-24 mt-24 desktop:px-24 flex-col"
      style={{ display: loading ? "none" : "flex" }}
    >
      <h1 className="text-2xl font-bold">{content.title}</h1>
      <p className=" text-black mb-4 mt-2">
        {content.last_update}: [15.03.2025]
      </p>
      <section>
        <h2 className="text-xl font-semibold">{content.overview}</h2>
        <p className="mt-2">{content.overview_text}</p>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold">{content.collect_info}</h2>
        <h3 className="font-semibold mt-2 mb-2">{content.personal_info}</h3>
        <ul className="list-disc list-inside">
          {content.personal_info_list.map((item: any) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6 mt-4">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.share_data}
        </h2>
        <p>{content.share_data_text}</p>
        <ul className="list-disc list-inside mt-2">
          {content.share_data_list.map((item: any) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.rights}
        </h2>
        <ul className="list-disc list-inside">
          {content.rights_list.map((item: any) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.security}
        </h2>
        <p>{content.security_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.children}
        </h2>
        <p>{content.children_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.links}
        </h2>
        <p>{content.links_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.updates}
        </h2>
        <p>{content.updates_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-black mb-3">
          {content.contact}
        </h2>
        <p>
          {activeLanguage.phone}:{" "}
          <a href="tel:+995599484604" className="text-gray-400">
            +995599484604
          </a>
        </p>

        <p>
          {content.email}:{" "}
          <a href="mailto:sensa.retain@gmail.com" className="text-gray-400">
            sensa.retain@gmail.com
          </a>
        </p>
        <p>
          {content.website}:{" "}
          <a href="https://www.sarkoevents.com" className="text-gray-400">
            www.sensa.ge
          </a>
        </p>
      </section>
      {showButton && (
        <button
          onClick={acceptTerms}
          className="w-48 mt-4 bg-white text-black px-12 py-1 rounded-lg hover:bg-gray-300 transition text-sm font-[600]"
        >
          {activeLanguage?.i_accept}
        </button>
      )}
    </div>
  );
}
