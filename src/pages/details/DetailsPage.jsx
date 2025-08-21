import { useContext } from "react";

import TradingViewChart from "../../components/common/chart/TradingViewChart";
import "./DetailsPage.css";
import { GlobalContext } from "../../contexts/GlobalContext";

const DetailsPage = () => {
  const { coins, selectedCoin } = useContext(GlobalContext);

  const sortedCoins = [...coins].sort((coin1, coin2) => {
    return (
      parseFloat(coin2.price_change_percentage_24h) -
      parseFloat(coin1.price_change_percentage_24h)
    );
  });

  // Default to Bitcoin if no coin is selected
  const displayCoin =
    selectedCoin || coins.find((coin) => coin.id === "bitcoin");

  return (
    <>
      <div className="details-header">
        <span className="header-subheading">
          {displayCoin
            ? `${displayCoin.name} (${displayCoin.symbol.toUpperCase()})`
            : "Cryptocurrency"}{" "}
          <span className="active">Chart</span>
        </span>
        <span className="header-content">
          {displayCoin
            ? `Detailed ${displayCoin.name} Market Analytics and Trading Data`
            : "Explore Detailed Market Analytics and Trading Data"}
        </span>
      </div>

      <div className="chart-container">
        <TradingViewChart
          symbol={
            displayCoin
              ? `BINANCE:${displayCoin.symbol.toUpperCase()}USDT`
              : "BINANCE:BTCUSDT"
          }
        />
      </div>

      <div className="details-container">
        <h3>
          Top <span className="active">Gainers</span>
        </h3>
        <div className="top-coins">
          {sortedCoins.slice(0, 6).map((coin, index) => (
            <div className="coin-wrapper" key={coin.id || index}>
              <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="coin-logo"
              />
              <div className="coin-name-details">
                <span className="coin-name">{coin.name}</span>
                <span className="coin-short-name">
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
              <span>
                {coin.price_change_percentage_24h > 0
                  ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
                  : `${coin.price_change_percentage_24h.toFixed(2)}%`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
