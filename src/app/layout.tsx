import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Loading } from "@/components/loading";
import MobileMenu from "@/components/mobileMenu";
import Popup from "@/components/popup";
import SimpleSnackbar from "@/components/snackbar";
import Tawk from "@/components/tawk";
import UserInitializer from "@/components/userInitializer";
import { AppContextWrapper } from "@/context/app";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { cookies } from "next/headers"; // 🔥 ენების წაკითხვა სერვერის მხარეს
import "./globals.css";

// 🔥 `generateMetadata()` სერვერის მხარეს ქმნის დინამიურ `metadata`
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "en"; // 🔥 ენის წაკითხვა ქუქიდან

  const titles: Record<string, string> = {
    en: "Sensa | Smart QR Feedback for Businesses",
    ka: "Sensa | ჭკვიანი QR ფიდბექი ბიზნესებისთვის",
    ru: "Sensa | Умная QR-система отзывов для бизнеса",
  };

  const descriptions: Record<string, string> = {
    en: "Sensa helps businesses collect real-time feedback via QR codes placed at physical locations. Fast, easy, and insightful customer insights.",
    ka: "Sensa ეხმარება ბიზნესებს მიიღონ სწრაფი და მარტივი ფიდბექი მომხმარებლებისგან ობიექტებზე განთავსებული QR კოდებით.",
    ru: "Sensa помогает бизнесам получать отзывы от клиентов через QR-коды, размещённые в их заведениях. Быстро, удобно и эффективно.",
  };

  return {
    title: titles[lang] || titles["en"],
    description: descriptions[lang] || descriptions["en"],
    openGraph: {
      title: titles[lang] || titles["en"],
      description: descriptions[lang] || descriptions["en"],
      url: "https://sensa.ge",
      type: "website",
      siteName: "Sensa",
      images: [
        {
          url: "/qr.jpg",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // await createIndexes();

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body>
          <AppContextWrapper>
            {/* <GoogleAnalytics gaId="G-PRTE7FTLBK" /> */}
            <UserInitializer />
            <Loading />
            <Header />
            <MobileMenu />
            <SimpleSnackbar />
            <main className="flex-grow w-full">{children}</main>
            <Popup />
            <Footer />
            <Tawk />
          </AppContextWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
