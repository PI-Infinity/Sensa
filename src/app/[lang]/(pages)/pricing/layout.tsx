import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en"; // 🔥 ენის ამოღება ქუქიდან

  // 🔥 ენების მიხედვით სათაურები და აღწერები
  const titles: Record<string, string> = {
    en: "Sensa | Smart QR Feedback for Businesses",
    ka: "Sensa | ჭკვიანი QR ფიდბექი ბიზნესებისთვის",
    ru: "Sensa | Умная QR-система отзывов для бизнеса",
  };

  const descriptions: Record<string, string> = {
    en: "Sensa helps businesses collect real-time feedback via QR codes placed at physical locations. Fast, easy, and insightful customer insights.",
    ka: "Sensa ეხმარება ბიზნესებს მიიღონ სწრაფი და მარტივი ფიდბექი მომხმარებლებისგან ობიექტებზე განთავსებული QR კოდებით. სწრაფად, მარტივად და ეფექტურად.",
    ru: "Sensa помогает бизнесам получать отзывы от клиентов через QR-коды, размещённые в их заведениях. Быстро, удобно и эффективно.",
  };

  return {
    title: titles[lang] || titles["en"], // თუ ენა არასწორია, ნაგულისხმევი ინგლისურია
    description: descriptions[lang] || descriptions["en"],
    openGraph: {
      title: titles[lang] || titles["en"],
      description: descriptions[lang] || descriptions["en"],
      url: "https://sensa.ge",
      type: "website",
      siteName: "Sensa",
      images: [
        {
          url: "/banner.webp",
          width: 800,
          height: 600,
          alt: "Sensa",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
