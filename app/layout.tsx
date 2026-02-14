import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.silo.rs"),
  title: {
    default: "silo",
    template: "%s | silo",
  },
  description:
    "Run the same app on the same port, simultaneously -- across branches, worktrees, or AI agents.",
  keywords: [
    "git worktrees",
    "port isolation",
    "dev server",
    "localhost",
    "parallel development",
    "LD_PRELOAD",
    "eBPF",
    "silo",
  ],
  authors: [{ name: "silo-rs", url: "https://github.com/silo-rs" }],
  creator: "silo-rs",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "silo",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "silo",
      url: "https://www.silo.rs",
      description:
        "Run the same app on the same port, simultaneously -- across branches, worktrees, or AI agents.",
    },
    {
      "@type": "Organization",
      name: "silo-rs",
      url: "https://github.com/silo-rs",
    },
  ],
};

const themeScript = `
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={geistMono.className}>{children}</body>
    </html>
  );
}
