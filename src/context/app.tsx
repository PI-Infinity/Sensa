"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { en, ka, ru } from "../languages/list";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

/**
 * App state context
 */

const AppContext = createContext<any>(null);

export const useAppContext = () => useContext(AppContext);

interface contextProps {
  children: ReactNode;
}

export const AppContextWrapper: React.FC<contextProps> = ({ children }) => {
  // loading app
  const [loading, setLoading] = useState(true);

  //** theme */
  const [theme, setTheme] = useState({
    id: "blue",
    gradient: "linear-gradient(#001429, #007aff)",
    main: "#007aff",
    background: "#007aff",
    background2: "rgba(255,255,255,0.02)",
    text: "#f7fbff",
    secondaryText: "",
  });

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem("sensa:theme");
    if (localTheme) {
      let parseObject = JSON.parse(localTheme);
      document.body.style.background = parseObject.gradient;
      document.documentElement.style.background = parseObject.background;
      setTheme(parseObject);
    } else {
      document.body.style.background = colors[1].gradient;
      document.documentElement.style.background = colors[1].background;
      setTheme(colors[1]);
    }
  }, []);

  // define device type
  const [isMobile, setIsMobile] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => {
      // Assuming a width less than 768px is a mobile device
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call the function to set the initial state
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * languages
   */
  const [language, setLanguage] = useState("en");
  const [activeLanguage, setActiveLanguage] = useState<any>("");
  const pathname = usePathname();
  useEffect(() => {
    let appLang = localStorage.getItem("sensa:language") || "en";
    let pathLang = pathname.split("/")[1];
    const lang = pathLang ? pathLang : appLang;
    setLanguage(lang);
    Cookies.set("language", lang, {
      expires: 30,
      path: "/",
    }); // 🔥 ქუქიში ვწერთ ენას
  }, [pathname]);

  useEffect(() => {
    if (language) {
      localStorage.setItem("sensa:language", language);

      if (language === "en") {
        setActiveLanguage(en);
      } else if (language === "ka") {
        setActiveLanguage(ka);
      } else {
        setActiveLanguage(ru);
      }
    }
  }, [language]);

  // nav items
  const menuItems = [
    { path: `/${language}`, label: activeLanguage.main },
    { path: `/${language}/about`, label: activeLanguage.about },
    // { path: `/${language}/pricing`, label: activeLanguage.pricing },
    { path: `/${language}/contact`, label: activeLanguage.contact },
  ];
  // mobile menu state
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    // Ensure the body has the transition set
    document.body.style.transition = "right 200ms ease-in";

    if (mobileMenu) {
      document.body.style.position = "relative";
      document.body.style.right = "100px";
    } else {
      document.body.style.position = "relative";
      document.body.style.right = "0px";
    }

    // Cleanup function to reset styles when component unmounts
    return () => {
      document.body.style.position = "";
      document.body.style.right = "";
      document.body.style.transition = "";
    };
  }, [mobileMenu]);

  // open request form
  const [active, setActive] = useState(false);

  /**
   * Alerts
   */
  const [alert, setAlert] = useState({ active: false, type: "", text: "" });

  return (
    <>
      <AppContext.Provider
        value={{
          theme,
          setTheme,
          loading,
          activeLanguage,
          language,
          setLanguage,
          menuItems,
          mobileMenu,
          setMobileMenu,
          isMobile,
          colors,
          active,
          setActive,
          alert,
          setAlert,
          setLoading,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const colors = [
  {
    id: "black",
    gradient: "linear-gradient(#080808, #151515, #080808)",
    main: "#151515",
    background: "#080808",
    background2: "rgba(255,255,255,0.02)",
    active: "#f7fbff",
    btn: "#f7fbff",
    text: "#f7fbff",
    secondaryText: "#001429",
  },

  {
    id: "light",
    gradient: "linear-gradient(#f8f8f8, #fff, #f1f1f1)",
    main: "#f1f1f1",
    background: "#f1f1f1",
    background2: "rgba(255,255,255,1)",
    active: "#111",
    btn: "#111",
    text: "#111",
    secondaryText: "#f1f1f1",
  },
];

export const offers = [
  {
    value: "/minimum_care",
    img: "/iusticia.webp",
    label: {
      en: "MINIMUM CARE",
      ka: "მინიმალური საზრუნავი",
      ru: "МИНИМУМ ЗАБОТ",
    },
    description: {
      en: "VENUE OF THE CEREMONY - TBILISI HOUSE OF JUSTICE",
      ka: "ცერემონიის ჩატარების ადგილი - თბილისის იუსტიციის სახლი",
      ru: "МЕСТО ПРОВЕДЕНИЯ ЦЕРЕМОНИИ - ДОМ ЮСТИЦИИ ТБИЛИСИ",
    },
    price: 400,
    details: {
      en: [
        "Simple choice for those who value efficiency and minimalism.",
        "Ideal for official registration without extra hassle.",
        "Package includes:",
        "• Assistance with marriage registration or notarized power of attorney.",
        "• Ceremony at the House of Justice.",
        "• Marriage certificate on the same day.",
        "• Translation of the certificate with an apostille within 2 working days.",
        "• Transfer: Hotel - House of Justice - Hotel.",
        "• 24/7 agency support and personal curator.",
        "• Government fees and witnesses included.",
      ],
      ka: [
        "მარტივი არჩევანი მათთვის, ვინც აფასებს ეფექტურობას და მინიმალიზმს.",
        "იდეალური ვარიანტი ოფიციალური რეგისტრაციისთვის ზედმეტი სირთულეების გარეშე.",
        "პაკეტი მოიცავს:",
        "• ქორწინების რეგისტრაციის ან ნოტარიული მინდობილობის ორგანიზება.",
        "• ცერემონია იუსტიციის სახლში.",
        "• ქორწინების მოწმობა იმავე დღესვე.",
        "• მოწმობის თარგმანი აპოსტილით 2 სამუშაო დღეში.",
        "• ტრანსფერი: სასტუმრო - იუსტიციის სახლი - სასტუმრო.",
        "• 24/7 სააგენტოს მხარდაჭერა და პირადი კურატორი.",
        "• სახელმწიფო მოსაკრებლები და მოწმეები.",
      ],
      ru: [
        "Простой выбор для тех, кто ценит эффективность и минимализм.",
        "Идеально подходит для официальной регистрации без лишних хлопот.",
        "Пакет включает:",
        "• Сопровождение при подаче заявления или оформление доверенности.",
        "• Церемония в Доме Юстиции.",
        "• Свидетельство о браке в тот же день.",
        "• Перевод свидетельства с апостилем в течение 2 рабочих дней.",
        "• Трансфер: Отель - Дом Юстиции - Отель.",
        "• 24/7 поддержка агентства и персональный куратор.",
        "• Включены государственные пошлины и свидетели.",
      ],
    },
  },
  // {
  //   value: "/elegant_ceremony",
  //   img: "/wedding_palace.webp",
  //   label: {
  //     en: "Elegant Ceremony",
  //     ka: "ელეგანტური ცერემონია",
  //     ru: "ЭЛЕГАНТНАЯ ЦЕРЕМОНИЯ",
  //   },
  //   description: {
  //     en: "VENUE OF THE CEREMONY - WEDDING PALACE",
  //     ka: "ცერემონიის ჩატარების ადგილი - ქორწილის სასახლე",
  //     ru: "МЕСТО ПРОВЕДЕНИЯ ЦЕРЕМОНИИ - ДВОРЕЦ БРАКОСОЧЕТАНИЙ",
  //   },
  //   price: 600,
  //   details: {
  //     en: [
  //       "For those who want an elegant and cozy ceremony.",
  //       "Package includes:",
  //       "• Assistance with marriage registration or notarized power of attorney.",
  //       "• Ceremony at the Wedding Palace.",
  //       "• Marriage certificate on the same day.",
  //       "• Translation of the certificate with an apostille within 2 working days.",
  //       "• Transfer: Hotel - Wedding Palace - Hotel.",
  //       "• Interpreter service during the ceremony (English/Russian).",
  //       "• Bride's bouquet and groom's boutonniere.",
  //       "• Bottle of sparkling wine and traditional sweets.",
  //       "• Musical accompaniment (without live music).",
  //       "• SIM card with unlimited internet for 7 days.",
  //       "• 24/7 agency support and personal curator.",
  //       "• Government fees and witnesses included.",
  //     ],
  //   },
  // },
  {
    value: "/at_the_peak_of_love",
    img: "/mtatsimnda.webp",
    label: {
      en: "AT THE PEAK OF LOVE",
      ka: "სიყვარულის პიკზე",
      ru: "НА ВЕРШИНЕ ЛЮБВИ",
    },
    description: {
      en: "VENUE OF THE CEREMONY - MTATSMINDA PARK",
      ka: "ცერემონიის ჩატარების ადგილი - მთაწმინდის პარკი",
      ru: "МЕСТО ПРОВЕДЕНИЯ ЦЕРЕМОНИИ - ПАРК МТАЦМИНДА",
    },
    price: 900,
    details: {
      en: [
        "For those dreaming of a wedding with breathtaking views of Tbilisi and a romantic atmosphere.",
        "Package includes:",
        "• Assistance with marriage registration or notarized power of attorney.",
        "• Ceremony in the Wedding Hall of Mtatsminda Park.",
        "• Marriage certificate on the same day.",
        "• Translation of the certificate with an apostille within 2 working days.",
        "• Transfer: Hotel - Mtatsminda - Hotel.",
        "• Interpreter service during the ceremony (English/Russian).",
        "• Wedding decorations (arch and swings with artificial flowers, decorated table).",
        "• Bride's bouquet and groom's boutonniere.",
        "• 2 bottles of sparkling wine, traditional sweets, and waiter service.",
        "• Musical accompaniment (without live music).",
        "• SIM card with unlimited internet for 7 days.",
        "• Transfer: Airport - Hotel - Airport.",
        "• 24/7 agency support and personal curator.",
        "• Government fees and witnesses included.",
      ],
      ka: [
        "მათთვის, ვისაც სურს ქორწილი დაუვიწყარი ხედებითა და რომანტიკული ატმოსფეროთი.",
        "პაკეტი მოიცავს:",
        "• ქორწინების რეგისტრაციის ან ნოტარიული მინდობილობის ორგანიზება.",
        "• ცერემონია მთაწმინდის პარკის საქორწილო დარბაზში.",
        "• ქორწინების მოწმობა იმავე დღესვე.",
        "• მოწმობის თარგმანი აპოსტილით 2 სამუშაო დღეში.",
        "• ტრანსფერი: სასტუმრო - მთაწმინდა - სასტუმრო.",
        "• თარჯიმანის მომსახურება ცერემონიის დროს (ინგლისური/რუსული).",
        "• სადღესასწაულო დეკორაციები (თაღი და საქანელები ხელოვნური ყვავილებით, მორთული მაგიდა).",
        "• პატარძლის თაიგული და სიძის ბუტონიერა.",
        "• 2 ბოთლი შუშხუნა ღვინო, ტრადიციული ტკბილეულობა და ოფიციანტის მომსახურება.",
        "• მუსიკალური გაფორმება (ცოცხალი მუსიკის გარეშე).",
        "• SIM ბარათი 7-დღიანი შეუზღუდავი ინტერნეტით.",
        "• ტრანსფერი: აეროპორტი - სასტუმრო - აეროპორტი.",
        "• 24/7 სააგენტოს მხარდაჭერა და პირადი კურატორი.",
        "• სახელმწიფო მოსაკრებლები და მოწმეები.",
      ],
      ru: [
        "Для тех, кто мечтает о свадьбе с потрясающим видом на Тбилиси и романтической атмосферой.",
        "Пакет включает:",
        "• Сопровождение при подаче заявления или оформление доверенности.",
        "• Церемония в свадебном зале парка Мтацминда.",
        "• Свидетельство о браке в тот же день.",
        "• Перевод свидетельства с апостилем в течение 2 рабочих дней.",
        "• Трансфер: Отель - Мтацминда - Отель.",
        "• Услуги переводчика во время церемонии (английский/русский).",
        "• Свадебные декорации (арка и качели с искусственными цветами, украшенный стол).",
        "• Букет невесты и бутоньерка для жениха.",
        "• 2 бутылки игристого вина, традиционные сладости и обслуживание официантом.",
        "• Музыкальное сопровождение (без живой музыки).",
        "• SIM-карта с безлимитным интернетом на 7 дней.",
        "• Трансфер: Аэропорт - Отель - Аэропорт.",
        "• 24/7 поддержка агентства и персональный куратор.",
        "• Включены государственные пошлины и свидетели.",
      ],
    },
  },
  {
    value: "/fairy_tale_garden",
    img: "/botanical.webp",
    label: {
      en: "FAIRY TALE GARDEN",
      ka: "ზღაპრული ბაღი",
      ru: "СКАЗОЧНЫЙ САД",
    },
    description: {
      en: "VENUE OF THE CEREMONY - TBILISI BOTANICAL GARDEN",
      ka: "ცერემონიის ჩატარების ადგილი - თბილისის ბოტანიკური ბაღი",
      ru: "МЕСТО ПРОВЕДЕНИЯ ЦЕРЕМОНИИ - БОТАНИЧЕСКИЙ САД",
    },
    price: 1000,
    details: {
      en: [
        "For those who dream of a magical wedding among nature.",
        "Package includes:",
        "• Assistance with marriage registration or notarized power of attorney.",
        "• Ceremony in the Botanical Garden.",
        "• Marriage certificate on the same day.",
        "• Translation of the certificate with an apostille within 2 working days.",
        "• Transfer: Hotel - Botanical Garden - Hotel.",
        "• Wedding decorations (arch, decorated chairs, decorated table).",
        "• Interpreter service during the ceremony (English/Russian).",
        "• 2 bottles of sparkling wine, traditional sweets, and waiter service.",
        "• Musical accompaniment (without live music).",
        "• SIM card with unlimited internet for 7 days.",
        "• 24/7 agency support and personal curator.",
        "• Government fees and witnesses included.",
      ],
      ka: [
        "მათთვის, ვისაც სურს ჯადოსნური ქორწილი ბუნებაში.",
        "პაკეტი მოიცავს:",
        "• დახმარება ქორწინების რეგისტრაციაში ან ნოტარიული მინდობილობის მომზადებაში.",
        "• ცერემონია ბოტანიკურ ბაღში.",
        "• ქორწინების მოწმობა იმავე დღესვე.",
        "• მოწმობის თარგმანი აპოსტილით 2 სამუშაო დღეში.",
        "• ტრანსფერი: სასტუმრო - ბოტანიკური ბაღი - სასტუმრო.",
        "• სადღესასწაულო დეკორაციები (თაღი, მორთული სკამები, მორთული მაგიდა).",
        "• თარჯიმანის მომსახურება ცერემონიის დროს (ინგლისური/რუსული).",
        "• 2 ბოთლი შუშხუნა ღვინო, ტრადიციული ტკბილეულობა და ოფიციანტის მომსახურება.",
        "• მუსიკალური გაფორმება (ცოცხალი მუსიკის გარეშე).",
        "• SIM ბარათი 7-დღიანი შეუზღუდავი ინტერნეტით.",
        "• 24/7 სააგენტოს მხარდაჭერა და პირადი კურატორი.",
        "• სახელმწიფო მოსაკრებლები და მოწმეები.",
      ],
      ru: [
        "Для тех, кто мечтает о волшебной свадьбе среди природы.",
        "Пакет включает:",
        "• Помощь в регистрации брака или оформление нотариальной доверенности.",
        "• Церемония в Ботаническом саду.",
        "• Свидетельство о браке в тот же день.",
        "• Перевод свидетельства с апостилем в течение 2 рабочих дней.",
        "• Трансфер: Отель - Ботанический сад - Отель.",
        "• Свадебные декорации (арка, украшенные стулья, украшенный стол).",
        "• Услуги переводчика во время церемонии (английский/русский).",
        "• 2 бутылки игристого вина, традиционные сладости и обслуживание официантом.",
        "• Музыкальное сопровождение (без живой музыки).",
        "• SIM-карта с безлимитным интернетом на 7 дней.",
        "• 24/7 поддержка агентства и персональный куратор.",
        "• Включены государственные пошлины и свидетели.",
      ],
    },
  },
  {
    value: "/grandeur_of_the_moment",
    img: "/monument.webp",
    label: {
      en: "GRANDEUR OF THE MOMENT",
      ka: "მომენტის სიდიადე",
      ru: "ВЕЛИЧИЕ МОМЕНТА",
    },
    description: {
      en: "VENUE OF THE CEREMONY - MONUMENT OF THE CHRONICLES OF GEORGIA",
      ka: "ცერემონიის ჩატარების ადგილი - საქართველოს მემატიანე",
      ru: "МЕСТО ПРОВЕДЕНИЯ ЦЕРЕМОНИИ - МОНУМЕНТ ХРОНИКИ ГРУЗИИ",
    },
    price: 1100,
    details: {
      en: [
        "For those who want a ceremony in one of the most breathtaking locations in Georgia.",
        "Package includes:",
        "• Assistance with marriage registration or notarized power of attorney.",
        "• Ceremony at the Monument of the Chronicles of Georgia.",
        "• Marriage certificate on the same day.",
        "• Translation of the certificate with an apostille within 2 working days.",
        "• Wedding decorations (arch, decorated chairs, decorated table).",
        "• Interpreter service during the ceremony (English/Russian).",
        "• 2 bottles of sparkling wine, traditional sweets, and waiter service.",
        "• Musical accompaniment (without live music).",
        "• SIM card with unlimited internet for 7 days.",
        "• 24/7 agency support and personal curator.",
        "• Government fees and witnesses included.",
      ],
      ka: [
        "მათთვის, ვისაც სურს ცერემონია საქართველოს ერთ-ერთ ყველაზე თვალწარმტაც ადგილას.",
        "პაკეტი მოიცავს:",
        "• დახმარება ქორწინების რეგისტრაციის ან ნოტარიული მინდობილობის მომზადებაში.",
        "• ცერემონია საქართველოს ქრონიკების მონუმენტთან.",
        "• ქორწინების მოწმობა იმავე დღესვე.",
        "• მოწმობის თარგმანი აპოსტილით 2 სამუშაო დღეში.",
        "• სადღესასწაულო დეკორაციები (თაღი, მორთული სკამები, მორთული მაგიდა).",
        "• თარჯიმანის მომსახურება ცერემონიის დროს (ინგლისური/რუსული).",
        "• 2 ბოთლი შუშხუნა ღვინო, ტრადიციული ტკბილეულობა და ოფიციანტის მომსახურება.",
        "• მუსიკალური გაფორმება (ცოცხალი მუსიკის გარეშე).",
        "• SIM ბარათი 7-დღიანი შეუზღუდავი ინტერნეტით.",
        "• 24/7 სააგენტოს მხარდაჭერა და პირადი კურატორი.",
        "• სახელმწიფო მოსაკრებლები და მოწმეები.",
      ],
      ru: [
        "Для тех, кто хочет провести церемонию в одном из самых живописных мест Грузии.",
        "Пакет включает:",
        "• Помощь в регистрации брака или оформление нотариальной доверенности.",
        "• Церемония у Монумента Хроники Грузии.",
        "• Свидетельство о браке в тот же день.",
        "• Перевод свидетельства с апостилем в течение 2 рабочих дней.",
        "• Свадебные декорации (арка, украшенные стулья, украшенный стол).",
        "• Услуги переводчика во время церемонии (английский/русский).",
        "• 2 бутылки игристого вина, традиционные сладости и обслуживание официантом.",
        "• Музыкальное сопровождение (без живой музыки).",
        "• SIM-карта с безлимитным интернетом на 7 дней.",
        "• 24/7 поддержка агентства и персональный куратор.",
        "• Включены государственные пошлины и свидетели.",
      ],
    },
  },
];
