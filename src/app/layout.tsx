import "./globals.css";
import { Outfit } from "next/font/google";
import BottomBar from "./components/Navbar";

// Setup Outfit
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <BottomBar />
        <section className="relative min-h-screen overflow-hidden ">
          <div className="h-full">
            {children}
          </div>
        </section>
      </body>
    </html>
  );
}
