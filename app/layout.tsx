"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Provider } from 'react-redux';
import store from "@/store";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Crypto-Currency</title>
        <meta name="description" content="A Realtime application of Crypto Market" />
      </Head>
      <body className={inter.className}>
        <Provider store={store}>
          <Nav />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
