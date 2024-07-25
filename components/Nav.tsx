"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Crypto Tracker</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/BTC" className={`text-white ${pathname === '/BTC' ? 'font-bold' : 'hover:text-blue-200'}`}>Bitcoin</Link>
          </li>
          <li>
            <Link href="/DOGE" className={`text-white ${pathname === '/DOGE' ? 'font-bold' : 'hover:text-blue-200'}`}>Dogecoin</Link>
          </li>
          <li>
            <Link href="/ETH" className={`text-white ${pathname === '/ETH' ? 'font-bold' : 'hover:text-blue-200'}`}>Ethereum</Link>
          </li>
          <li>
            <Link href="/SOL" className={`text-white ${pathname === '/SOL' ? 'font-bold' : 'hover:text-blue-200'}`}>Solana</Link>
          </li>
          <li>
            <Link href="/BNB" className={`text-white ${pathname === '/BNB' ? 'font-bold' : 'hover:text-blue-200'}`}>BNB</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
