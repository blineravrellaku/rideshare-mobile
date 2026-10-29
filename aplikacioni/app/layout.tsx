import type { ReactNode } from "react";

import Pwa from "@/components/Pwa";
import "./globals.css";

export const metadata = {
  title: "RideShare AAB",
  description: "Udhëtime për studentë",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sq">
      <body>
        <Pwa />
        {children}
      </body>
    </html>
  );
}
