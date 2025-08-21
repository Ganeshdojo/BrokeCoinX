import { useState, useContext } from "react";

import { DollarSign, Activity, Bitcoin, Coins } from "lucide-react";

import StatCard from "../../components/common/statcard/StatCard";
import CardWraper from "../../components/common/cardwrapper/CardWraper";
import CryptoTable from "./CryptoTable";
import "./HomePage.css";
import { GlobalContext } from "../../contexts/GlobalContext";

const HomePage = () => {
  const [sortType, setSortType] = useState("");
  const { statsData } = useContext(GlobalContext);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000_000) {
      // Trillions
      return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
    } else if (num >= 1_000_000_000) {
      // Billions
      return `$${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      // Millions
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      // Thousands
      return `$${(num / 1_000).toFixed(2)}K`;
    } else {
      return `$${num}`;
    }
  };

  if (!statsData?.data) {
    return (
      <p className="global-api-data">
        Loading <span className="active"> API Data...</span>
      </p>
    );
  }

  return (
    <div className="homepage">
      <div className="home-header">
        <h1>
          Global Crypto <span className="active">Markets</span>
        </h1>
        <span>Track real-time cryptocurrency data and market trends</span>
      </div>

      {/* statcards section */}
      <div className="stat-section">
        <StatCard
          id="01"
          value={formatNumber(statsData.data.total_market_cap.usd)}
          label="Total Market Cap"
          icon={<DollarSign size={24} color="orange" />}
        />
        <StatCard
          id="02"
          value={formatNumber(statsData.data.total_volume.usd)}
          label="Total Volume"
          icon={<Activity size={24} color="lime" />}
        />
        <StatCard
          id="03"
          value={`${statsData.data.market_cap_percentage.btc.toFixed(2)}%`}
          label="BTC Dominance"
          icon={<Bitcoin size={26} color="#b081e9" />}
        />
        <StatCard
          id="04"
          value={statsData.data.markets}
          label="Total Active Coins"
          icon={<Coins size={24} color="yellow" />}
        />
      </div>
      <CardWraper>
        <div className="filter-section">
          <div className="sort-content">
            <span>Sort by:</span>
            <select
              className="filter-select"
              onChange={(e) => {
                const sel = e.target.value;
                setSortType(sel);
                console.log(sel);
              }}
            >
              <option value="default">Select Option</option>
              <option value="marketcap">Market Cap</option>
              <option value="price">Price</option>
              <option value="change24h">24h Change</option>
              <option value="volume">Volume</option>
            </select>
          </div>
        </div>
      </CardWraper>

      <CryptoTable sortType={sortType} />
    </div>
  );
};

export default HomePage;
