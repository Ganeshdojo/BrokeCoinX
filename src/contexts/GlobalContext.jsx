import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const getInitialWatchList = () => {
    const stored = localStorage.getItem("WatchListCoins");
    return stored ? JSON.parse(stored) : [];
  };

  const [WatchListCoins, setWatchListCoins] = useState(getInitialWatchList);

  useEffect(() => {
    localStorage.setItem("WatchListCoins", JSON.stringify(WatchListCoins));
  }, [WatchListCoins]);

  // const USE_COINS_MOCK = true;
  // const USE_GLOBAL_MOCK = true;

  const USE_COINS_MOCK = false;
  const USE_GLOBAL_MOCK = false;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coins_url = USE_COINS_MOCK
          ? "/mock-data/top250Coins.json"
          : "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=24h";

        const global_url = USE_GLOBAL_MOCK
          ? "/mock-data/globalStatsData.json"
          : `https://api.allorigins.win/raw?url=${encodeURIComponent(
              "https://api.coingecko.com/api/v3/global"
            )}`;

        const [coinsRes, globalRes] = await Promise.all([
          fetch(coins_url),
          fetch(global_url),
        ]);

        const [coinsData, globalData] = await Promise.all([
          coinsRes.json(),
          globalRes.json(),
        ]);

        setCoins(coinsData);
        setStatsData(globalData);
      } catch (error) {
        console.error("Error Fetching Data...", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
      console.log("Data Fetched");
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        coins,
        statsData,
        search,
        setSearch,
        WatchListCoins,
        setWatchListCoins,
        selectedCoin,
        setSelectedCoin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
