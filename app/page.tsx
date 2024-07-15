"use client"
import React, { useEffect } from 'react';
import Table from "@/components/Table";
import { fetchStockData, fetchAndStoreData } from "@/utils/dataUtils";
import { useDispatch } from 'react-redux';
import { setStockPrices, setStockName } from '@/store/stockSlice';
import { usePathname, useRouter } from 'next/navigation';

const cryptoOrder = ['/', '/DOGE', '/ETH', '/SOL', '/BNB'];

export default function Home() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStockData("BTC");
      dispatch(setStockPrices(data));
    };

    fetchData();
    dispatch(setStockName("BTC"));

    const intervalId = setInterval(() => {
      fetchAndStoreData();
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

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
        <h1 className="text-2xl font-bold mt-0 text-center text_gradient">BITCOIN</h1>
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
}
