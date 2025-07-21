import type { Metadata } from "next";
import { cookies } from "next/headers"; // 🔥 ენების წაკითხვა სერვერის მხარეს

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = cookieStore.get("language")?.value || "en"; // 🔥 ენის წაკითხვა ქუქიდან

  const titles: Record<string, string> = {
    en: "Terms & Conditions | Sensa",
    ka: "წესები და პირობები | Sensa",
    ru: "Условия использования | Sensa",
  };

  const descriptions: Record<string, string> = {
    en: "Read our Terms & Conditions to understand the rules of using Sensa. Your rights and responsibilities explained in detail.",
    ka: "წაიკითხეთ ჩვენი წესები და პირობები, რათა გაიგოთ Sensa-ს გამოყენების წესები. დეტალურადაა აღწერილი თქვენი უფლებები და ვალდებულებები.",
    ru: "Прочитайте наши условия использования, чтобы понять правила работы с Sensa. Ваши права и обязанности подробно объяснены.",
  };

  return {
    title: titles[lang] || titles["en"],
    description: descriptions[lang] || descriptions["en"],
    openGraph: {
      title: titles[lang] || titles["en"],
      description: descriptions[lang] || descriptions["en"],
      url: "https://sensa.ge/terms",
      type: "website",
      siteName: "Sensa",
      images: [
        {
          url: "/banner.webp",
          width: 800,
          height: 600,
          alt: "Sarko Events Terms & Conditions",
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
          url: "/qr.jpg",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          url: "/qr.jpg",
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
