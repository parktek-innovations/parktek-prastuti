import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from "./google-analytics";

const GA_MEASUREMENT_ID = "G-3YPSBPEGB3";

export const metadata = {
  title: "ParkTek — Connected residential parking access",
  description:
    "ParkTek connects vehicle identity, local gate control, resident tools and society operations for residential parking.",
  icons: {
    icon: "/brand/parktek-mark.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
        </Script>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
