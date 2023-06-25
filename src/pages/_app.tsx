import "@/styles/globals.css";
import type { AppProps } from "next/app";

import localFont from "next/font/local";

const materialSymbols = localFont({
  variable: "--font-family-symbols", // Variable name (to reference after in CSS/styles)
  style: "normal",
  src: "../../node_modules/material-symbols/material-symbols-rounded.woff2", // This is a reference to woff2 file from NPM package "material-symbols"
  display: "block",
  weight: "100 700",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={materialSymbols.variable}>
      <Component {...pageProps} />
    </div>
  );
}
