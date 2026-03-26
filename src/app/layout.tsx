import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "爆撃竜馬 | Official Site - 株式会社SGRIT",
    template: "%s | 爆撃竜馬",
  },
  description:
    "アーティスト爆撃竜馬の公式サイト。プロフィール、最新ニュース、音楽配信リンク。株式会社SGRIT運営。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "爆撃竜馬 Official Site",
    images: [{ url: "/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ryo_ma_official",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
