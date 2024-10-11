import "./globals.css";
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: "Palanca Letter",
  description: "Send me your Letter!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
