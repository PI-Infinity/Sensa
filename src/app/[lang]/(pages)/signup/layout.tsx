import type { Metadata } from "next";
import { cookies } from "next/headers"; // 🔥 ენების წაკითხვა სერვერის მხარეს

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en"; // 🔥 ენის წაკითხვა ქუქიდან

  const titles: Record<string, string> = {
    en: "Get in Touch | Sarko Events",
    ka: "დაგვიკავშირდით | Sarko Events",
    ru: "Свяжитесь с нами | Sarko Events",
  };

  const descriptions: Record<string, string> = {
    en: "Want an unforgettable event? ✨ Contact us today, and let’s create something unique together! 📩",
    ka: "გინდა დაუვიწყარი ივენთი? ✨ დაგვიკავშირდი დღესვე და ერთად შევქმნათ უნიკალური ღონისძიება! 📩",
    ru: "Хотите незабываемое мероприятие? ✨ Свяжитесь с нами сегодня, и мы создадим для вас уникальный ивент! 📩",
  };

  return {
    title: titles[lang] || titles["en"],
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
}: Readonly<{ children: React.ReactNode }>) {
  return <main>{children}</main>;
}
