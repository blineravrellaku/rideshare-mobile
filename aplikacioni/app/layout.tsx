import type { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  title: "RideShare",
  description: "Udhëtime për studentë",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sq">
      <body>{children}</body>
    </html>
  );
}
