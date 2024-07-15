
interface StockData {
    name: string;
    price: number;
  }
  
  export const fetchAndStoreData = async () => {
    try {
      const response = await fetch(new Request("https://api.livecoinwatch.com/coins/map"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        }),
        body: JSON.stringify({
          codes: ["ETH", "BTC", "DOGE", "SOL", "BNB"],
          currency: "USD",
          sort: "rank",
          order: "ascending",
          offset: 0,
          limit: 0,
          meta: false,
        }),
      });
  
      const data = await response.json();
  
      for (const stock of data) {
        const { code: name, rate: price } = stock;
        await saveToDatabase({ name, price });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const saveToDatabase = async ({ name, price }: StockData) => {
    try {
      await fetch('/api/crypto/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price }),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  export const fetchStockData = async (crypto: string) => {
    try {
      const response = await fetch(`/api/crypto/${crypto}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }
      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  