"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/app";
import { Suspense } from "react";

const privacyContent: any = {
  en: {
    title: "Privacy Policy",
    last_update: "Last Updated",
    overview: "Overview",
    overview_text: `Sarko Events ("we", "company") takes your privacy seriously. 
      This Privacy Policy explains how we collect, use, and protect your 
      information when using our website and services.`,
    accept_text:
      "By using our services, you agree to the terms described in this Privacy Policy.",
    collect_info: "What Information We Collect",
    personal_info: "📌 Personal Information",
    personal_info_list: [
      "Full Name",
      "Phone Number",
      "Email Address",
      "Postal Address",
      "Payment details (processed through secure third-party payment systems)",
    ],
    general_info: "📌 Non-Personal Information",
    general_info_list: [
      "Device information (IP address, browser type, OS)",
      "Website activity and usage statistics",
      "Cookies and other tracking technologies",
    ],
    usage: "How We Use Your Information",
    usage_list: [
      "📌 Providing and improving our services",
      "📌 Customer support",
      "📌 Order processing",
      "📌 Compliance with legal obligations",
      "📌 Marketing communications (with your consent)",
      "📌 Fraud prevention and security risk management",
    ],
    share_data: "Data Sharing with Third Parties",
    share_data_text: `We do not sell or rent your personal data to third parties. 
      However, data sharing may occur under the following conditions:`,
    share_data_list: [
      "Service providers (payments, hosting, customer support)",
      "Law enforcement or legal requests",
      "Business transactions (e.g., mergers or acquisitions)",
    ],
    rights: "Your Rights & Choices",
    rights_list: [
      "🔹 Access or delete your data",
      "🔹 Manage privacy settings",
      "🔹 Opt-out of marketing communications",
    ],
    security: "Security Measures",
    security_text:
      "We use appropriate security measures, but no system can guarantee 100% protection.",
    children: "Children's Privacy",
    children_text:
      "Our services are not intended for children under 18. If we discover data from minors, we will delete it.",
    links: "Third-Party Links",
    links_text:
      "Our site may contain links to external websites. Please review their privacy policies separately.",
    updates: "Policy Updates",
    updates_text:
      "We may update this policy. Check back periodically for changes.",
    contact: "Contact Us",
    email: "Email",
    website: "Website",
  },
  ka: {
    title: "კონფიდენციალურობის პოლიტიკა",
    last_update: "ბოლო განახლება",
    overview: "ზოგადი მიმოხილვა",
    overview_text: `Sarko Events ("ჩვენ", "კომპანია") სერიოზულად ეკიდება თქვენს პირად მონაცემთა დაცვას. 
      ეს კონფიდენციალურობის პოლიტიკა განმარტავს, როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს ინფორმაციას.`,
    accept_text:
      "თქვენი მომსახურების გამოყენებით, თქვენ ეთანხმებით ამ კონფიდენციალურობის პოლიტიკას.",
    collect_info: "რა ინფორმაციას ვაგროვებთ",
    personal_info: "📌 პირადი ინფორმაცია",
    personal_info_list: [
      "სახელი და გვარი",
      "ტელეფონის ნომერი",
      "ელფოსტის მისამართი",
      "საფოსტო მისამართი",
      "გადახდის დეტალები (უსაფრთხო გადახდის სისტემის გამოყენებით)",
    ],
    general_info: "📌 არასპეციფიკური ინფორმაცია",
    general_info_list: [
      "მოწყობილობის ინფორმაცია (IP მისამართი, ბრაუზერის ტიპი, ოპერაციული სისტემა)",
      "ვებსაიტზე განხორციელებული ქმედებები და გამოყენების სტატისტიკა",
      "Cookies და სხვა ტექნოლოგიები",
    ],
    usage: "როგორ ვიყენებთ თქვენს ინფორმაციას",
    usage_list: [
      "📌 ჩვენი მომსახურების მიწოდება და გაუმჯობესება",
      "📌 მომხმარებელთა მხარდაჭერის გაწევა",
      "📌 შეკვეთების დამუშავება",
      "📌 სამართლებრივი ვალდებულებების დაცვა",
      "📌 მარკეტინგული კომუნიკაციების გაგზავნა (თქვენი თანხმობით)",
      "📌 თაღლითობის და უსაფრთხოების რისკების მართვა",
    ],
    share_data: "მონაცემთა გაზიარება მესამე მხარეებთან",
    share_data_text: `ჩვენ არ ვყიდით თქვენს მონაცემებს, მაგრამ ზოგიერთ შემთხვევაში გაზიარება შეიძლება:`,
    share_data_list: [
      "მომსახურების მომწოდებლები (გადახდა, ჰოსტინგი, მხარდაჭერა)",
      "სამართალდამცავი ორგანოები, კანონით მოთხოვნილი მხარეები",
      "ბიზნეს ტრანზაქციები (შერწყმა ან შეძენა)",
    ],
    rights: "თქვენი უფლებები და არჩევანი",
    rights_list: [
      "🔹 მონაცემების მიღება ან წაშლა",
      "🔹 კონფიდენციალურობის პარამეტრების მართვა",
      "🔹 სარეკლამო შეტყობინებების გაუქმება",
    ],
    security: "უსაფრთხოების ზომები",
    security_text:
      "ჩვენ ვიყენებთ შესაბამის უსაფრთხოების ზომებს, მაგრამ არანაირი სისტემა 100%-ით დაცული არ არის.",
    children: "ბავშვთა კონფიდენციალურობა",
    children_text:
      "ჩვენი სერვისი 18 წლამდე პირებისთვის არ არის განკუთვნილი. თუ აღმოვაჩენთ, რომ არასრულწლოვანის მონაცემებია, წავშლით.",
    links: "მესამე მხარის ბმულები",
    links_text:
      "ჩვენი ვებსაიტი შეიძლება შეიცავდეს გარე ბმულებს. გთხოვთ, გაეცნოთ მათ კონფიდენციალურობის პოლიტიკას.",
    updates: "პოლიტიკის განახლება",
    updates_text:
      "ჩვენ პერიოდულად განვაახლებთ კონფიდენციალურობის პოლიტიკას. გირჩევთ, გადაამოწმოთ.",
    contact: "კონტაქტი",
    email: "ელფოსტა",
    website: "ვებსაიტი",
  },
  ru: {
    title: "Политика конфиденциальности",
    last_update: "Последнее обновление",
    overview: "Обзор",
    overview_text: `Sarko Events ("мы", "компания") серьезно относится к вашей конфиденциальности. 
      Настоящая Политика конфиденциальности объясняет, как мы собираем, используем и защищаем 
      вашу информацию при использовании нашего веб-сайта и услуг.`,
    accept_text:
      "Используя наши услуги, вы соглашаетесь с условиями, описанными в данной Политике конфиденциальности.",
    collect_info: "Какие данные мы собираем",
    personal_info: "📌 Личная информация",
    personal_info_list: [
      "Полное имя",
      "Номер телефона",
      "Адрес электронной почты",
      "Почтовый адрес",
      "Платежные данные (обрабатываются через безопасные сторонние платежные системы)",
    ],
    general_info: "📌 Неличная информация",
    general_info_list: [
      "Информация об устройстве (IP-адрес, тип браузера, операционная система)",
      "Активность на сайте и статистика использования",
      "Файлы cookie и другие технологии отслеживания",
    ],
    usage: "Как мы используем вашу информацию",
    usage_list: [
      "📌 Предоставление и улучшение наших услуг",
      "📌 Обслуживание клиентов",
      "📌 Обработка заказов",
      "📌 Соблюдение юридических обязательств",
      "📌 Маркетинговые рассылки (с вашего согласия)",
      "📌 Предотвращение мошенничества и управление рисками безопасности",
    ],
    share_data: "Передача данных третьим сторонам",
    share_data_text: `Мы не продаем и не сдаем в аренду ваши персональные данные третьим сторонам. 
      Однако передача данных может осуществляться в следующих случаях:`,
    share_data_list: [
      "Поставщики услуг (платежи, хостинг, поддержка клиентов)",
      "Запросы правоохранительных органов или юридические требования",
      "Бизнес-сделки (например, слияния или поглощения)",
    ],
    rights: "Ваши права и выбор",
    rights_list: [
      "🔹 Доступ или удаление ваших данных",
      "🔹 Управление настройками конфиденциальности",
      "🔹 Отказ от маркетинговых рассылок",
    ],
    security: "Меры безопасности",
    security_text:
      "Мы применяем соответствующие меры безопасности, но ни одна система не может гарантировать 100% защиту.",
    children: "Конфиденциальность детей",
    children_text:
      "Наши услуги не предназначены для детей младше 18 лет. Если мы обнаружим данные несовершеннолетних, мы их удалим.",
    links: "Сторонние ссылки",
    links_text:
      "Наш сайт может содержать ссылки на внешние ресурсы. Ознакомьтесь с их политиками конфиденциальности отдельно.",
    updates: "Обновления политики",
    updates_text:
      "Мы можем обновлять данную политику. Проверяйте периодически наличие изменений.",
    contact: "Свяжитесь с нами",
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
      className="p-6 text-white desktop:mt-24 mt-24 desktop:px-24 flex-col"
      style={{ display: loading ? "none" : "flex" }}
    >
      <h1 className="text-2xl font-bold">{content.title}</h1>
      <p className=" text-white mb-4 mt-2">
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
        <h2 className="text-xl font-semibold text-white mb-3">
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
        <h2 className="text-xl font-semibold text-white mb-3">
          {content.rights}
        </h2>
        <ul className="list-disc list-inside">
          {content.rights_list.map((item: any) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">
          {content.security}
        </h2>
        <p>{content.security_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">
          {content.children}
        </h2>
        <p>{content.children_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">
          {content.links}
        </h2>
        <p>{content.links_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">
          {content.updates}
        </h2>
        <p>{content.updates_text}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-3">
          {content.contact}
        </h2>
        <p>
          {activeLanguage.phone}:{" "}
          <a href="tel:+995597233355" className="text-gray-400">
            +995597233355
          </a>
        </p>

        <p>
          {content.email}:{" "}
          <a href="mailto:sarko.events@gmail.com" className="text-gray-400">
            sarko.events@gmail.com
          </a>
        </p>
        <p>
          {content.website}:{" "}
          <a href="https://www.sarkoevents.com" className="text-gray-400">
            www.sarkoevents.com
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
