"use client";

import React, { useEffect } from 'react';
import Table from '@/components/Table';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { fetchStockData, fetchAndStoreData } from "@/utils/dataUtils";
import { useDispatch } from 'react-redux';
import { setStockPrices, setStockName } from '@/store/stockSlice';

const cryptoOrder = ['/', '/DOGE', '/ETH', '/SOL', '/BNB'];

const cryptoNames: Record<string, string> = {
  BTC: "Bitcoin",
  DOGE: "Dogecoin",
  ETH: "Ethereum",
  SOL: "Solana",
  BNB: "BNB"
};

const CryptoPage = () => {
  const { crypto } = useParams<{ crypto: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStockData(crypto);
      dispatch(setStockPrices(data));
    };

    fetchData();
    dispatch(setStockName(crypto));

    const intervalId = setInterval(() => {
      fetchAndStoreData();
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [crypto, dispatch]);

  const currentIndex = cryptoOrder.indexOf(pathname);
  const prevPage = currentIndex > 0 ? cryptoOrder[currentIndex - 1] : null;
  const nextPage = currentIndex < cryptoOrder.length - 1 ? cryptoOrder[currentIndex + 1] : null;

  return (
    <section className="w-full flex-col flex items-center">
      <div className="flex justify-between items-center w-full max-w-4xl my-4">
        {prevPage ? (
          <button
            className="button_gradient"
            onClick={() => router.push(prevPage)}
          >
            Prev
          </button>
        ) : (
          <div className="w-20" />
        )}
        <h1 className="text-2xl font-bold mt-0 text-center text_gradient">
          {cryptoNames[crypto.toUpperCase()].toUpperCase() || crypto.toUpperCase()}
        </h1>
        {nextPage ? (
          <button
            className="button_gradient"
            onClick={() => router.push(nextPage)}
          >
            Next
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>
      <Table />
    </section>
  );
};

export default CryptoPage;
