import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchWithFallback = async (url, mockUrl, isMock = false) => {
    try {
      if (isMock) {
        const response = await fetch(mockUrl);
        return await response.json();
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Check for our serverless function error responses
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error.message);
      // Fallback to mock data
      const mockResponse = await fetch(mockUrl);
      return await mockResponse.json();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use our serverless function instead of direct CoinGecko calls
        const coins_url = USE_COINS_MOCK
          ? "/mock-data/top250Coins.json"
          : "/api/coingecko?endpoint=coins";

        const global_url = USE_GLOBAL_MOCK
          ? "/mock-data/globalStatsData.json"
          : "/api/coingecko?endpoint=global";

        const [coinsData, globalData] = await Promise.all([
          fetchWithFallback(
            coins_url,
            "/mock-data/top250Coins.json",
            USE_COINS_MOCK
          ),
          fetchWithFallback(
            global_url,
            "/mock-data/globalStatsData.json",
            USE_GLOBAL_MOCK
          ),
        ]);

        setCoins(coinsData);
        setStatsData(globalData);
      } catch (error) {
        console.error("Error Fetching Data...", error);
        setError(error.message);
        // Load mock data as final fallback
        try {
          const [coinsRes, globalRes] = await Promise.all([
            fetch("/mock-data/top250Coins.json"),
            fetch("/mock-data/globalStatsData.json"),
          ]);
          const [coinsData, globalData] = await Promise.all([
            coinsRes.json(),
            globalRes.json(),
          ]);
          setCoins(coinsData);
          setStatsData(globalData);
        } catch (fallbackError) {
          console.error("Even mock data failed:", fallbackError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Reduced frequency to avoid rate limiting
    const interval = setInterval(() => {
      fetchData();
      console.log("Data Refreshed");
    }, 60000); // Changed from 30s to 60s

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
        isLoading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
