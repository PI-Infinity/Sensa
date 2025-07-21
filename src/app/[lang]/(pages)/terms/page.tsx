"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/app";
import { Suspense } from "react";

const termsContent: any = {
  en: {
    title: "Terms of Use",
    last_update: "Last Updated",
    intro: `Welcome to Sensa! These Terms of Use ("Terms") govern your access to and use of our website 
      (www.sensa.ge), services, and related platforms. By using our website and services, you agree to these Terms. 
      If you do not agree, please do not use our services.`,
    sections: [
      {
        title: "1. Acceptance of Terms",
        text: `By accessing and using our website, you confirm that you have read, understood, and agree to these Terms. 
        We reserve the right to modify these Terms at any time. Continued use of our website and services after updates 
        means acceptance of the revised Terms.`,
      },
      {
        title: "2. Services",
        text: `Sensa provides QR-based customer feedback collection services and analytics tools. 
        We reserve the right to modify, suspend, or discontinue any service at our discretion.`,
      },
      {
        title: "3. User Responsibilities",
        text: `When using our website and services, you agree to:
        - Provide accurate and complete information when requested.
        - Not engage in illegal, fraudulent, or harmful activities.
        - Not attempt unauthorized access to our systems or data.
        - Respect Sensa’s and third-party intellectual property rights.`,
      },
      {
        title: "4. Access and Payments",
        text: `- Access to certain services may require registration or payment.
        - Payments are processed securely via third-party systems.
        - Sensa reserves the right to suspend access in case of violations or non-payment.`,
      },
      {
        title: "5. Cancellation and Refunds",
        text: `- You may cancel paid subscriptions as per our refund policy.
        - Requests for refunds must be sent to our support team.
        - We are not responsible for payments made to third-party providers using our service.`,
      },
      {
        title: "6. Intellectual Property",
        text: `All content on our website (text, logos, system design) is owned by or licensed to Sensa.
        Reproducing, modifying, or distributing this content without written permission is prohibited.`,
      },
      {
        title: "7. Limitation of Liability",
        text: `Sensa is not liable for any losses resulting from your use of our website or services.
        We do not guarantee uninterrupted access or that the services will be error-free.`,
      },
      {
        title: "8. Privacy Policy",
        text: `Use of our services is also governed by our Privacy Policy.`,
      },
      {
        title: "9. Third-Party Links",
        text: `Our website may contain links to third-party sites. We are not responsible for their content or practices.`,
      },
      {
        title: "10. Termination",
        text: `We reserve the right to terminate or restrict your access if you violate these Terms.`,
      },
      {
        title: "11. Governing Law",
        text: `These Terms are governed by the laws of Georgia. Disputes will be resolved in the courts of Georgia.`,
      },
      {
        title: "12. Contact",
        text: `If you have questions, contact us at:
        - 📧 support@sensa.ge
        - 🌍 www.sensa.ge`,
      },
    ],
  },

  ka: {
    title: "გამოყენების წესები",
    last_update: "ბოლო განახლება",
    intro: `მოგესალმებით Sensa-ში! აღნიშნული გამოყენების წესები არეგულირებს თქვენს წვდომასა და გამოყენებას ჩვენი ვებსაიტის (www.sensa.ge), სერვისებისა და პლატფორმის ფარგლებში. 
    ჩვენი სერვისების გამოყენებით, თქვენ ეთანხმებით ამ წესებს. თუ არ ეთანხმებით, ნუ გამოიყენებთ სერვისს.`,
    sections: [
      {
        title: "1. წესების მიღება",
        text: `ვებსაიტის გამოყენებით, თქვენ ადასტურებთ, რომ წაიკითხეთ, გაიგეთ და ეთანხმებით წესებს. 
        ჩვენ ვიტოვებთ უფლებას შევცვალოთ წესები ნებისმიერ დროს. განახლებული პირობების შემდეგ სერვისის გაგრძელება ნიშნავს მიღებას.`,
      },
      {
        title: "2. სერვისები",
        text: `Sensa გთავაზობთ QR-ზე დაფუძნებულ უკუკავშირის სისტემასა და ანალიტიკას ბიზნესებისთვის. 
        ჩვენ ვიტოვებთ უფლებას, შევცვალოთ ან შევწყვიტოთ მომსახურება ჩვენი შეხედულებისამებრ.`,
      },
      {
        title: "3. მომხმარებლის ვალდებულებები",
        text: `თქვენ ეთანხმებით:
        - მიაწოდოთ ზუსტი ინფორმაცია მოთხოვნისას.
        - არ გამოიყენოთ სერვისი უკანონო მიზნებისთვის.
        - არ სცადოთ სისტემაში არაუფლებრივი წვდომა.
        - დაიცვათ Sensa-ს ინტელექტუალური საკუთრება.`,
      },
      {
        title: "4. წვდომა და გადახდები",
        text: `- ზოგიერთი ფუნქცია საჭიროებს რეგისტრაციას ან გადახდას.
        - გადახდები ხდება უსაფრთხოდ მესამე მხარის სისტემებით.
        - დარღვევის ან ვალდებულებების შეუსრულებლობის შემთხვევაში წვდომა შეიძლება შეიზღუდოს.`,
      },
      {
        title: "5. გაუქმება და ანაზღაურება",
        text: `- შეგიძლიათ გააუქმოთ გამოწერა ჩვენი ანაზღაურების პოლიტიკის მიხედვით.
        - მოთხოვნა უნდა გაიგზავნოს მხარდაჭერის გუნდში.
        - მესამე მხარის მომსახურებებზე ანაზღაურება ჩვენზე არ ვრცელდება.`,
      },
      {
        title: "6. ინტელექტუალური საკუთრება",
        text: `ვებსაიტის შინაარსი (ტექსტი, ლოგო, დიზაინი) ეკუთვნის ან ლიცენზირებულია Sensa-სთვის. 
        მისი კოპირება, ცვლილება ან გავრცელება დაუშვებელია წინასწარი თანხმობის გარეშე.`,
      },
      {
        title: "7. პასუხისმგებლობის შეზღუდვა",
        text: `Sensa არ არის პასუხისმგებელი ზარალზე, რომელიც შესაძლოა წარმოიშვას სერვისის გამოყენებიდან. 
        ჩვენ არ ვიძლევით გარანტიას უწყვეტ წვდომაზე ან შეცდომების არარსებობაზე.`,
      },
      {
        title: "8. კონფიდენციალურობა",
        text: `სერვისის გამოყენება რეგულირდება ჩვენი კონფიდენციალურობის პოლიტიკით.`,
      },
      {
        title: "9. გარე ბმულები",
        text: `ჩვენი ვებსაიტი შეიძლება შეიცავდეს მესამე მხარის ბმულებს, რომლებზეც პასუხისმგებლობას არ ვიღებთ.`,
      },
      {
        title: "10. წვდომის შეწყვეტა",
        text: `ჩვენ გვაქვს უფლება, შევზღუდოთ ან შევწყვიტოთ წვდომა, თუ დაარღვევთ წესებს.`,
      },
      {
        title: "11. სამართლებრივი რეგულირება",
        text: `წესები რეგულირდება საქართველოს კანონმდებლობით. დავების განხილვა ხდება ქართულ სასამართლოში.`,
      },
      {
        title: "12. კონტაქტი",
        text: `კითხვებისთვის დაგვიკავშირდით:
        - 📧 support@sensa.ge
        - 🌍 www.sensa.ge`,
      },
    ],
  },

  ru: {
    title: "Условия использования",
    last_update: "Последнее обновление",
    intro: `Добро пожаловать в Sensa! Настоящие Условия регулируют ваш доступ и использование нашего сайта (www.sensa.ge), услуг и платформ. 
    Используя сайт, вы соглашаетесь с этими условиями. Если вы не согласны — не используйте наш сервис.`,
    sections: [
      {
        title: "1. Принятие условий",
        text: `Используя сайт, вы подтверждаете согласие с условиями. Мы можем вносить изменения. Продолжение использования означает согласие.`,
      },
      {
        title: "2. Услуги",
        text: `Sensa предоставляет сервис для сбора отзывов через QR и аналитики. Мы можем изменять или прекращать услуги по нашему усмотрению.`,
      },
      {
        title: "3. Обязанности пользователя",
        text: `Вы соглашаетесь:
        - Предоставлять точную информацию.
        - Не совершать незаконных действий.
        - Не пытаться взломать систему.
        - Уважать интеллектуальные права Sensa и третьих лиц.`,
      },
      {
        title: "4. Доступ и платежи",
        text: `- Некоторые функции требуют регистрации или оплаты.
        - Платежи обрабатываются через безопасные сторонние сервисы.
        - Мы можем приостановить доступ при нарушении условий.`,
      },
      {
        title: "5. Отмена и возвраты",
        text: `- Подписку можно отменить в рамках нашей политики.
        - Запрос отправляется в службу поддержки.
        - Мы не несем ответственности за сторонние сервисы.`,
      },
      {
        title: "6. Интеллектуальная собственность",
        text: `Контент сайта принадлежит Sensa или лицензирован. Копирование, модификация или распространение запрещены без разрешения.`,
      },
      {
        title: "7. Ограничение ответственности",
        text: `Sensa не несёт ответственности за убытки при использовании сайта. Мы не гарантируем безошибочную или постоянную работу.`,
      },
      {
        title: "8. Политика конфиденциальности",
        text: `Использование регулируется нашей политикой конфиденциальности.`,
      },
      {
        title: "9. Сторонние ссылки",
        text: `На сайте могут быть сторонние ссылки. Мы не несем за них ответственности.`,
      },
      {
        title: "10. Прекращение доступа",
        text: `Мы можем ограничить доступ при нарушении условий.`,
      },
      {
        title: "11. Закон и споры",
        text: `Условия регулируются законодательством Грузии. Все споры рассматриваются судами Грузии.`,
      },
      {
        title: "12. Контакты",
        text: `Вопросы? Пишите:
        - 📧 support@sensa.ge
        - 🌍 www.sensa.ge`,
      },
    ],
  },
};

export default function Terms() {
  return (
    <Suspense fallback={<div></div>}>
      <Main />
    </Suspense>
  );
}

function Main() {
  const [language, setLanguage] = useState("en");
  const searchParams = useSearchParams();

  const { activeLanguage, loading } = useAppContext();

  useEffect(() => {
    const langFromCookies = Cookies.get("language") || "en";
    setLanguage(searchParams.get("lang") || langFromCookies);
  }, [searchParams]);

  const content: any = termsContent[language] || termsContent.en;

  const [showButton, setshowButton] = useState(false);

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
      className="p-6 text-black desktop:mt-24 mt-20 desktop:px-24 flex-col"
      style={{ display: loading ? "none" : "flex" }}
    >
      <div className="max-w-4xl text-black">
        <h1 className="text-3xl font-bold ">{content.title}</h1>
        <p className=" text-black-600 mb-8">
          {content.last_update}:{" "}
          <span className="font-semibold">[15.03.2025]</span>
        </p>
        <p className="mb-6">{content.intro}</p>
        {content.sections.map((section: any, index: any) => (
          <section key={index} className="mb-6">
            <h2 className="text-2xl font-semibold text-black mb-3">
              {section.title}
            </h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
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
