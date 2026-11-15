import { Oswald, Roboto } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Camden United FC",
  description: "United in Passion. Driven by Excellence.",
  // App Router's favicon.ico, icon.png and apple-icon.png provide the
  // correctly sized club crest to browsers and mobile home screens.
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${roboto.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

