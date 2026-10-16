import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { OG_IMAGE } from "@/lib/og";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://garden-reform-navi.com"),
  openGraph: {
    siteName: "庭リフォームナビ",
    locale: "ja_JP",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  title: "庭リフォームナビ | 外構・庭工事の比較・見積もりサイト",
  description: "庭リフォームの費用相場・業者比較・見積もりに関する情報をまとめた比較サイトです。ウッドデッキ、カーポート、フェンス、コンクリートなど外構工事の情報を掲載しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg">
        <SiteHeader />
        <main className="flex-1">{children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"庭リフォームナビ\",\"url\":\"https://garden-reform-navi.com/\",\"logo\":\"https://garden-reform-navi.com/favicon.ico\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"株式会社MediaX\",\"url\":\"https://mediax.biz\"},\"sameAs\":[\"https://garden-reform-navi.com/about/\"]}" }}
        />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
