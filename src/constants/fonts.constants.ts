import { Open_Sans, Passion_One } from "next/font/google";

export const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const passionOne = Passion_One({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});
