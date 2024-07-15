"use client"
import React, { useEffect } from 'react';
import Table from "@/components/Table";
import { fetchStockData, fetchAndStoreData } from "@/utils/dataUtils";
import { useDispatch, useSelector } from 'react-redux';
import { setStockPrices, setStockName } from '@/store/stockSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';
import { updateCurrentIndex } from '@/store/navigationSlice';


export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cryptoOrder = useSelector((state: RootState) => state.navigation.cryptoOrder);
  const currentIndex = useSelector((state: RootState) => state.navigation.currentIndex);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStockData("BTC");
      dispatch(setStockPrices(data));
    };

    fetchData();
    dispatch(setStockName("BTC"));
    dispatch(updateCurrentIndex(`/`));

    const intervalId = setInterval(() => {
      fetchAndStoreData();
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

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
