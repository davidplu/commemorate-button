import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commemorate — Sometimes Like is the wrong word",
  description: "An independent feature concept exploring a more fitting Instagram interaction for memorial posts."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
