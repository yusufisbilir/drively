import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const geistSans = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Drively',
  description: 'Data storage solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} font-poppins antialiased`}>{children}</body>
    </html>
  );
}
