import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from "./google-analytics";
import { SiteFooter } from "@/components/website/site-footer";
import { SiteHeader } from "@/components/website/site-header";
import StructuredData from "@/components/website/structured-data";
import { makeMetadata, organizationJsonLd, localBusinessJsonLd } from "@/lib/seo";

const GA_MEASUREMENT_ID = "G-3YPSBPEGB3";

export const metadata = {
  ...makeMetadata({
    title: "Connected parking access and operations",
    description:
      "ParkTek connects residential gate access today with commercial parking and POS workflows launching through selected sites.",
    path: "/"
  }),
  icons: {
    icon: "/brand/parktek-mark.svg"
  }
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#FFFFFF"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={[organizationJsonLd(), localBusinessJsonLd()]} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            window.dispatchEvent(new Event('parktek:analytics-ready'));
          `}
        </Script>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
