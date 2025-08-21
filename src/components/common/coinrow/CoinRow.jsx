import { Star, MousePointerClick } from "lucide-react";
import Sparkline from "../sparkline/Sparkline";
import "./CoinRow.css";
import Modal from "../modal/Modal";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const CoinRow = ({ coin, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { WatchListCoins, setWatchListCoins, setSelectedCoin } =
    useContext(GlobalContext);
  const isInWatchlist = WatchListCoins.some((item) => item.id === coin.id);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(2)}K`;
    } else {
      return `$${num}`;
    }
  };

  const navigate = useNavigate();
  const handleChartClick = () => {
    setSelectedCoin(coin);
    setIsOpen(false);
    navigate(`/details`);
  };

  const modalContent = () => {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="coin-details modal-header">
          <img
            src={coin.image}
            alt="Coin Logo"
            className="coin-logo coin-logo2"
          />
          <div className="coin-name-details">
            <span className="coin-name coin-name2">{coin.name}</span>
            <span className="coin-short-name coin-symbol2">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="main-content">
          <div className="left-content">
            <span className="price">${coin.current_price}</span>
            <span
              className={`24h-change ${
                coin.price_change_percentage_24h > 0 ? "green" : "red"
              }`}
            >
              {coin.price_change_percentage_24h > 0
                ? `+${coin.price_change_percentage_24h.toFixed(2)}% (24H)`
                : `${coin.price_change_percentage_24h.toFixed(2)}% (24H)`}
            </span>
            <div className="cards-content">
              <div className="modal-cards">
                <span className="modal-card-name">Market Cap</span>
                <span className="modal-card-value">
                  {formatNumber(coin.market_cap)}
                </span>
              </div>
              <div className="modal-cards">
                <span className="modal-card-name">Circulating Supply</span>
                <span className="modal-card-value">
                  {formatNumber(coin.circulating_supply)}{" "}
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
              <div className="modal-cards">
                <span className="modal-card-name">All-Time High</span>
                <span className="modal-card-value">${coin.ath}</span>
              </div>
              <div className="modal-cards">
                <span className="modal-card-name">24H High</span>
                <span className="modal-card-value">${coin.high_24h}</span>
              </div>
            </div>
          </div>
          <div className="right-content">
            <Sparkline
              data={coin.sparkline_in_7d.price}
              color={
                coin.price_change_percentage_24h > 0
                  ? "hsl(150, 40%, 52%)"
                  : "hsl(3, 68%, 58%)"
              }
              height="100%"
              fill={
                coin.price_change_percentage_24h > 0
                  ? "hsla(150, 40%, 52%, 0.5)"
                  : "hsla(3, 68%, 58%, 0.5)"
              }
              strokeWidth={5}
              granularValue={28}
              isToolTipUsing={true}
            />
          </div>
        </div>
        <div className="button-value">
          <button className="_7day-chart">7 Days</button>
          <button onClick={handleChartClick} className="open-chart">
            Open Chart
          </button>
        </div>
      </Modal>
    );
  };

  const handleStar = (e) => {
    e.stopPropagation();
    setWatchListCoins((prevItems) => {
      const found = prevItems.find((item) => item.id === coin.id);
      if (found) return prevItems.filter((item) => item.id !== coin.id);
      return [...prevItems, coin];
    });
  };

  return (
    <div className="coinrow-container" onClick={() => setIsOpen(true)}>
      {modalContent()}
      <div className="coin-row">
        <span className="coin-number">{index}</span>
        <div className="coin-details">
          <img src={coin.image} alt="Coin Logo" className="coin-logo" />
          <div className="coin-name-details">
            <span className="coin-name">{coin.name}</span>
            <span className="coin-short-name">{coin.symbol.toUpperCase()}</span>
          </div>
        </div>
        <span className="price">${coin.current_price}</span>

        <span
          className={`24h-change ${
            coin.price_change_percentage_24h > 0 ? "green" : "red"
          }`}
        >
          {coin.price_change_percentage_24h > 0
            ? `+${coin.price_change_percentage_24h.toFixed(2)}%`
            : `${coin.price_change_percentage_24h.toFixed(2)}%`}
        </span>
        <span className="sparkline-chart">
          <Sparkline
            data={coin.sparkline_in_7d.price}
            color={
              coin.price_change_percentage_24h > 0
                ? "hsl(150, 40%, 52%)"
                : "hsl(3, 68%, 58%)"
            }
          />
        </span>
        <span className="market-cap">{formatNumber(coin.market_cap)}</span>
        <span className="volume">{formatNumber(coin.total_volume)}</span>
        <span className="action">
          <Star
            size={16}
            onClick={handleStar}
            className={`star ${isInWatchlist ? "star-active" : ""}`}
          />
          <MousePointerClick
            size={16}
            className={`mouse-pointer ${isOpen ? "mouse-pointer-active" : ""}`}
          />
        </span>
      </div>
    </div>
  );
};

export default CoinRow;
