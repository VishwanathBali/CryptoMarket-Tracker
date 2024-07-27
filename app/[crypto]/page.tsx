"use client";

import React, { useEffect } from 'react';
import Table from '@/components/Table';
import { useParams, useRouter } from 'next/navigation';
import { fetchStockData, fetchAndStoreData } from "@/utils/dataUtils";
import { useDispatch, useSelector } from 'react-redux';
import { setStockPrices, updateStockPrice } from '@/store/stockSlice';
import { RootState } from '@/store';
import { updateCurrentIndex } from '@/store/navigationSlice';


const cryptoNames: Record<string, string> = {
  BTC: "Bitcoin",
  DOGE: "Dogecoin",
  ETH: "Ethereum",
  SOL: "Solana",
  BNB: "BNB"
};

const CryptoPage = () => {
  const { crypto } = useParams<{ crypto: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const cryptoOrder = useSelector((state: RootState) => state.navigation.cryptoOrder);
  const currentIndex = useSelector((state: RootState) => state.navigation.currentIndex);
  const stockPrices = useSelector((state: RootState) => {
    const stock = state.stock.find(stock => stock.name === crypto);
    return stock ? stock.prices : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { name, prices } = await fetchStockData(crypto);

        const latestPrice = prices[prices.length - 1];
        console.log("Length : ",stockPrices.length);
        

        if (stockPrices.length === 0) {
          dispatch(setStockPrices({ name, prices }));
        } else if (latestPrice) {
          dispatch(updateStockPrice({ name, price: latestPrice }));
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
    dispatch(updateCurrentIndex(`/${crypto}`));

    const intervalId = setInterval(() => {
      fetchAndStoreData();
      fetchData();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [crypto, dispatch]);

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
      <Table cryptoName={crypto}/>
    </section>
  );
};

export default CryptoPage;
