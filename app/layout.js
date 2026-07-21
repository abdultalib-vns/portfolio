import { Geist, Geist_Mono, Baloo_2, Dancing_Script } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { SITE_URL } from '@/lib/siteConfig';
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const description =
  'AI-driven Automation Test Engineer, Automation Architect, and AI Product Builder with almost 5 years across Infosys, PepsiCo, Ulta Beauty, agentic QA systems, Robot Framework, Selenium, Appium, Playwright, LangChain, LangGraph, RAG, MCP, and AI-native automation products.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Abdul Talib | AI Automation Engineer',
    template: '%s | Abdul Talib',
  },
  description,
  keywords: [
    'Abdul Talib',
    'SDET',
    'AI Automation',
    'Automation Architecture',
    'QA Automation',
    'Robot Framework',
    'Selenium',
    'Appium',
    'Mobile QA',
    'Playwright',
    'UIAutomator2',
    'AI Product Developer',
    'RoboClaw AI Studio',
    'Ctrl Test AI',
    'Autogent AI',
    'RAG',
    'MCP',
    'BugWizard AI',
    'GenAI',
    'LangChain',
    'LangGraph',
    'Infosys',
    'PepsiCo',
    'Ulta Beauty',
  ],
  authors: [{ name: 'Abdul Talib', url: SITE_URL }],
  creator: 'Abdul Talib',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Abdul Talib',
    title: 'Abdul Talib | AI Automation Engineer',
    description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Abdul Talib | AI Automation Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Talib | AI Automation Engineer',
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#f7931e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Abdul Talib" />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abdul Talib',
              url: SITE_URL,
              email: 'er.syedabdultalib@gmail.com',
              jobTitle: 'AI-Driven Automation Test Engineer and Automation Architect',
              sameAs: [
                'https://www.linkedin.com/in/abdultalib751/',
                'https://gamma.site/abdultalib',
                'https://bugwizard.in',
                'https://roboclaw-aistudio.netlify.app/',
                'https://autogentai.lovable.app/',
              ],
            }),
          }}
        />
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
