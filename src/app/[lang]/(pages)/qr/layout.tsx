import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en"; // 🔥 ენის ამოღება ქუქიდან

  // 🔥 ენების მიხედვით სათაურები და აღწერები
  const titles: Record<string, string> = {
    en: "Sarko Events – Experts in Event Planning",
    ka: "Sarko Events – ექსპერტი ღონისძიებების ორგანიზებაში",
    ru: "Sarko Events – эксперты в организации мероприятий",
  };

  const descriptions: Record<string, string> = {
    en: "We create unique events with meticulous attention to detail! Meet our professional team and plan the perfect event. 🚀",
    ka: "ჩვენ ვქმნით უნიკალურ ივენთებს დეტალებზე მაქსიმალური ყურადღებით! გაიცანი ჩვენი პროფესიონალი გუნდი და დაგეგმე სრულყოფილი ღონისძიება. 🚀",
    ru: "Мы создаем уникальные события с максимальным вниманием к деталям! Познакомьтесь с нашей профессиональной командой и организуйте идеальное мероприятие. 🚀",
  };

  return {
    title: titles[lang] || titles["en"], // თუ ენა არასწორია, ნაგულისხმევი ინგლისურია
    description: descriptions[lang] || descriptions["en"],
    openGraph: {
      title: titles[lang] || titles["en"],
      description: descriptions[lang] || descriptions["en"],
      url: "https://sarkoevents.shop",
      type: "website",
      siteName: "Sarko Events",
      images: [
        {
          url: "/banner.webp",
          width: 800,
          height: 600,
          alt: "Sarko Events",
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/sarko-favicon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/sarko-favicon.png",
        },
      ],
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
