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
    intro: `Welcome to Sarko Events! These Terms of Use ("Terms") govern your access to and use of our website 
      (www.sarkoevents.com), services, and related platforms. By using our website and services, you agree to these Terms. 
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
        text: `Sarko Events provides event planning and management services, including but not limited to:
        - Pre-wedding events
        - Corporate events
        - Private ceremonies
        - Other customized events
        
        We reserve the right to modify, suspend, or discontinue any service at our discretion.`,
      },
      {
        title: "3. User Responsibilities",
        text: `When using our website and services, you agree to:
        - Provide accurate and complete information when requested.
        - Not engage in illegal, fraudulent, or harmful activities.
        - Not attempt unauthorized access to our systems or data.
        - Respect Sarko Events' and third-party intellectual property rights.`,
      },
      {
        title: "4. Booking and Payments",
        text: `- Booking is subject to availability and confirmation.
        - Payments must be made according to agreed terms and are processed through secure third-party systems.
        - Sarko Events reserves the right to cancel bookings due to unforeseen circumstances, with refunds processed 
        according to our cancellation policy.`,
      },
      {
        title: "5. Cancellation and Refunds",
        text: `- Cancellations within the agreed timeframe may be eligible for a refund as per individual contract terms.
        - Refund requests must be submitted in writing to our support team.
        - Sarko Events is not responsible for third-party service provider refunds.`,
      },
      {
        title: "6. Intellectual Property",
        text: `- All content on our website, including text, images, logos, and designs, is owned by or licensed to Sarko Events.
        - Reproduction, distribution, or modification of our content without prior written consent is prohibited.`,
      },
      {
        title: "7. Liability Limitation",
        text: `- Sarko Events is not responsible for losses, damages, or claims resulting from the use of our website or services.
        - We do not guarantee uninterrupted website access or error-free services.
        - We disclaim responsibility for services provided by third-party vendors.`,
      },
      {
        title: "8. Privacy Policy",
        text: `Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your data.`,
      },
      {
        title: "9. Third-Party Links",
        text: `Our website may contain links to third-party websites. We are not responsible for their content, privacy policies, or practices.`,
      },
      {
        title: "10. Violation and Account Termination",
        text: `We reserve the right to suspend or terminate access to our services if you violate these Terms, engage in illegal activities, 
        or pose a threat to Sarko Events or its users.`,
      },
      {
        title: "11. Legal Matters and Dispute Resolution",
        text: `- These Terms are governed by the laws of Georgia.
        - Disputes must first be resolved through negotiation. If unresolved, disputes will be settled in the courts of Georgia.`,
      },
      {
        title: "12. Contact Information",
        text: `If you have questions about these Terms, you can contact us:
        - 📧 sarko.events@gmail.com
        - 🌍 www.sarkoevents.com`,
      },
    ],
  },
  ka: {
    title: "გამოყენების წესები",
    last_update: "ბოლო განახლება",
    intro: `კეთილი იყოს თქვენი მობრძანება Sarko Events-ში! აღნიშნული გამოყენების წესები ("წესები") არეგულირებს 
      თქვენს წვდომას და გამოყენებას ჩვენი ვებსაიტის (www.sarkoevents.com), სერვისებისა და დაკავშირებული პლატფორმების ფარგლებში. 
      ჩვენი სერვისების გამოყენებით, თქვენ ეთანხმებით ამ წესებს. თუ არ ეთანხმებით, გთხოვთ, ნუ გამოიყენებთ ჩვენს სერვისებს.`,
    sections: [
      {
        title: "1. წესების მიღება",
        text: `ვებსაიტზე შესვლით და მისი გამოყენებით, თქვენ ადასტურებთ, რომ წაიკითხეთ, გაიგეთ და ეთანხმებით აღნიშნულ წესებს. 
        ჩვენ ვიტოვებთ უფლებას, შევცვალოთ ეს წესები ნებისმიერ დროს. ვებსაიტის გამოყენება განახლებული პირობების გამოქვეყნების შემდეგ ნიშნავს მათ მიღებას.`,
      },
      {
        title: "2. სერვისები",
        text: `Sarko Events უზრუნველყოფს ღონისძიებების ორგანიზებისა და მართვის სერვისებს, რომლებიც მოიცავს, მაგრამ არ შემოიფარგლება შემდეგით:
        - წინასაქორწილო ღონისძიებები
        - კორპორატიული ღონისძიებები
        - კერძო ცერემონიები
        - სხვა სახის ინდივიდუალურად მორგებული ღონისძიებები
        
        ჩვენ ვიტოვებთ უფლებას, შევცვალოთ, შევაჩეროთ ან შევწყვიტოთ ნებისმიერი სერვისი ჩვენი შეხედულებისამებრ.`,
      },
      {
        title: "3. მომხმარებლის ვალდებულებები",
        text: `თქვენ ვალდებული ხართ:
        - მიაწოდოთ ზუსტი და სრული ინფორმაცია მოთხოვნის შემთხვევაში.
        - არ გამოიყენოთ ვებსაიტი არამართლზომიერი, თაღლითური ან ზიანის მომტანი ქმედებებისთვის.
        - არ სცადოთ ჩვენი სისტემების ან მონაცემების არაკანონიერი ხელმისაწვდომობა.
        - დაიცვათ Sarko Events-ისა და მესამე პირების ინტელექტუალური საკუთრების უფლებები.`,
      },
      {
        title: "4. დაჯავშნა და გადახდები",
        text: `ჩვენი სერვისების დაჯავშნა დამოკიდებულია ხელმისაწვდომობასა და დადასტურებაზე.
        გადახდები უნდა განხორციელდეს შეთანხმებული პირობების შესაბამისად. გადახდების დამუშავება ხდება მესამე მხარის სანდო გადახდის სისტემებით.
        Sarko Events იტოვებს უფლებას, გააუქმოს დაჯავშნა გაუთვალისწინებელი გარემოებების გამო. ასეთ შემთხვევაში, ანაზღაურება მოხდება ჩვენი გაუქმებისა და ანაზღაურების პოლიტიკის შესაბამისად.`,
      },
      {
        title: "5. გაუქმებისა და ანაზღაურების პოლიტიკა",
        text: `თუ გაუქმება ხდება შეთანხმებულ ვადებში, მომხმარებელს შესაძლოა ჰქონდეს ანაზღაურების მოთხოვნის უფლება, გამომდინარე ინდივიდუალური კონტრაქტის პირობებიდან.
        ანაზღაურების მოთხოვნები უნდა გაიგზავნოს წერილობით ჩვენი მომხმარებელთა მხარდაჭერის გუნდისთვის.
        Sarko Events არ აგებს პასუხს მესამე მხარის მომწოდებლების მიერ გაწეული სერვისების ანაზღაურებაზე.`,
      },
      {
        title: "6. ინტელექტუალური საკუთრება",
        text: `ვებსაიტზე არსებული ყველა მასალა, მათ შორის ტექსტი, სურათები, ლოგოები და დიზაინი, ეკუთვნის Sarko Events-ს ან ლიცენზირებულია მისთვის და დაცულია საავტორო და სავაჭრო ნიშნების კანონებით.
        ჩვენი კონტენტის ასლის გაკეთება, გავრცელება, შეცვლა ან რეპროდუცირება ნებადართული არ არის წინასწარი წერილობითი თანხმობის გარეშე.`,
      },
      {
        title: "7. პასუხისმგებლობის შეზღუდვა",
        text: `Sarko Events არ აგებს პასუხს ზარალზე, დანაკარგზე ან პრეტენზიებზე, რომლებიც წარმოიშვება ჩვენი ვებსაიტის ან სერვისების გამოყენების შედეგად.
        ჩვენ არ ვიძლევით გარანტიას, რომ ვებსაიტზე წვდომა უწყვეტი იქნება ან რომ ჩვენი სერვისები შეცდომებისგან თავისუფალი იქნება.
        კანონით დაშვებულ მაქსიმალურ ზღვრამდე, ვაცხადებთ, რომ პასუხისმგებლობას არ ვიღებთ მესამე მხარეების მიერ გაწეული სერვისებისთვის.`,
      },
      {
        title: "8. კონფიდენციალურობის პოლიტიკა",
        text: `თქვენი სერვისების გამოყენება ასევე რეგულირდება ჩვენი კონფიდენციალურობის პოლიტიკით, რომელიც განმარტავს, თუ როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ მონაცემებს.`,
      },
      {
        title: "9. მესამე მხარის ბმულები",
        text: `ჩვენი ვებსაიტი შეიძლება შეიცავდეს ბმულებს მესამე მხარის ვებსაიტებზე. ჩვენ არ ვაგებთ პასუხს მათი კონტენტის, კონფიდენციალურობის პოლიტიკის ან პრაქტიკისთვის. მესამე მხარის ბმულებზე გადასვლა ხდება თქვენი პასუხისმგებლობით.`,
      },
      {
        title: "10. წესების დარღვევა და ანგარიშის შეწყვეტა",
        text: `ჩვენ ვიტოვებთ უფლებას, შევწყვიტოთ ან შევზღუდოთ თქვენი წვდომა ჩვენს სერვისებზე, თუ დაარღვევთ ამ წესებს, მონაწილეობთ უკანონო ქმედებებში ან საფრთხეს შეუქმნით Sarko Events-ს ან მის მომხმარებლებს.`,
      },
      {
        title: "11. სამართლებრივი საკითხები და დავების გადაწყვეტა",
        text: `აღნიშნული წესები რეგულირდება საქართველოს კანონმდებლობით.
        ყველა დავა უნდა გადაწყდეს მოლაპარაკების გზით. თუ შეთანხმება ვერ მიიღწევა, დავა გადაეცემა საქართველოს სასამართლოებს განსახილველად.`,
      },
      {
        title: "12. საკონტაქტო ინფორმაცია",
        text: `თუ გაქვთ შეკითხვები ამ წესებთან დაკავშირებით, შეგიძლიათ დაგვიკავშირდეთ:
        Sarko Events
        - 📧 sarko.events@gmail.com
        - 🌍 www.sarkoevents.com`,
      },
    ],
  },
  ru: {
    title: "Условия использования",
    last_update: "Последнее обновление",
    intro: `Добро пожаловать в Sarko Events! Настоящие Условия использования ("Условия") регулируют ваш доступ и использование 
      нашего веб-сайта (www.sarkoevents.com), услуг и связанных платформ. Используя наш веб-сайт и услуги, вы соглашаетесь с этими Условиями. 
      Если вы не согласны, пожалуйста, не используйте наши услуги.`,
    sections: [
      {
        title: "1. Принятие условий",
        text: `Доступ и использование нашего веб-сайта означает, что вы прочли, поняли и согласны с этими Условиями. 
        Мы оставляем за собой право изменять настоящие Условия в любое время. Дальнейшее использование нашего сайта 
        после обновлений означает принятие измененных условий.`,
      },
      {
        title: "2. Услуги",
        text: `Sarko Events предоставляет услуги по организации и управлению мероприятиями, включая, но не ограничиваясь:
        - Предсвадебные мероприятия
        - Корпоративные события
        - Частные церемонии
        - Другие индивидуальные мероприятия
        
        Мы оставляем за собой право изменять, приостанавливать или прекращать любую услугу по нашему усмотрению.`,
      },
      {
        title: "3. Обязанности пользователя",
        text: `Используя наш веб-сайт и услуги, вы соглашаетесь:
        - Предоставлять точную и полную информацию по запросу.
        - Не участвовать в незаконных, мошеннических или вредоносных действиях.
        - Не пытаться получить несанкционированный доступ к нашим системам или данным.
        - Уважать интеллектуальную собственность Sarko Events и третьих лиц.`,
      },
      {
        title: "4. Бронирование и платежи",
        text: `- Бронирование зависит от доступности и подтверждения.
        - Платежи должны производиться в соответствии с согласованными условиями и обрабатываться через защищенные сторонние системы.
        - Sarko Events оставляет за собой право отменить бронирование из-за непредвиденных обстоятельств, а возвраты обрабатываются 
        в соответствии с нашей политикой отмены.`,
      },
      {
        title: "5. Отмена и возврат",
        text: `- Отмена в согласованные сроки может подлежать возврату в соответствии с условиями индивидуального контракта.
        - Запросы на возврат должны быть отправлены в письменной форме в нашу службу поддержки.
        - Sarko Events не несет ответственности за возвраты, связанные с услугами сторонних поставщиков.`,
      },
      {
        title: "6. Интеллектуальная собственность",
        text: `Все материалы, размещенные на веб-сайте, включая тексты, изображения, логотипы и дизайн, принадлежат Sarko Events или лицензированы для использования и защищены законами об авторском праве и товарных знаках.
        Копирование, распространение, изменение или воспроизведение контента запрещено без предварительного письменного согласия.`,
      },
      {
        title: "7. Ограничение ответственности",
        text: `Sarko Events не несет ответственности за убытки, потери или претензии, возникающие в результате использования нашего веб-сайта или услуг.
        Мы не гарантируем, что доступ к сайту будет бесперебойным или что услуги не будут содержать ошибок.
        В максимально допустимой законом мере мы не несем ответственности за услуги, предоставляемые третьими сторонами.`,
      },
      {
        title: "8. Политика конфиденциальности",
        text: `Использование наших услуг также регулируется нашей Политикой конфиденциальности, которая объясняет, как мы собираем, используем и защищаем ваши персональные данные.`,
      },
      {
        title: "9. Ссылки на сторонние ресурсы",
        text: `Наш веб-сайт может содержать ссылки на сторонние сайты. Мы не несем ответственности за их контент, политику конфиденциальности или практику. Переход по сторонним ссылкам осуществляется на ваш страх и риск.`,
      },
      {
        title: "10. Нарушение условий и блокировка аккаунта",
        text: `Мы оставляем за собой право прекратить или ограничить ваш доступ к нашим услугам, если вы нарушите эти Условия, участвуете в незаконных действиях или создаете угрозу для Sarko Events или его пользователей.`,
      },
      {
        title: "11. Законодательство и разрешение споров",
        text: `Настоящие Условия регулируются законодательством Грузии.
        Все споры должны разрешаться путем переговоров. Если соглашение не будет достигнуто, спор передается в суд Грузии.`,
      },
      {
        title: "12. Контактная информация",
        text: `Если у вас есть вопросы по данным Условиям, вы можете связаться с нами:
        Sarko Events
        - 📧 sarko.events@gmail.com
        - 🌍 www.sarkoevents.com`,
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
      className="p-6 text-white desktop:mt-24 mt-24 desktop:px-24 flex-col"
      style={{ display: loading ? "none" : "flex" }}
    >
      <div className="max-w-4xl text-white">
        <h1 className="text-3xl font-bold ">{content.title}</h1>
        <p className=" text-white-600 mb-8">
          {content.last_update}:{" "}
          <span className="font-semibold">[15.03.2025]</span>
        </p>
        <p className="mb-6">{content.intro}</p>
        {content.sections.map((section: any, index: any) => (
          <section key={index} className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-3">
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
