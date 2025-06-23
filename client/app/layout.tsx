import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";
import Script from "next/script";

// ✅ フォント設定（Noto Sans JP）
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});


// ✅ ルートレイアウトコンポーネント
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/rvs7vvb.css" />
      </head>
      <body className={`${notoSansJP.variable} antialiased flex min-h-screen flex-col`}>
        <Header />
        <Toaster position="top-right" />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
        {/* ✅ FontAwesome のスクリプト */}
        <Script src="https://kit.fontawesome.com/4e6b2556d7.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
