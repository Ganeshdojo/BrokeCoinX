import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

import CardWraper from "../../components/common/cardwrapper/CardWraper";
import CoinRow from "../../components/common/coinrow/CoinRow";
import "./CryptoTable.css";

const CryptoTable = ({ sortType }) => {
  const { coins, search } = useContext(GlobalContext);

  const [paginationDetails, setPaginationDetails] = useState({
    currentPage: 1,
    ITEMS_PER_PAGE: 10,
  });

  useEffect(() => {
    setPaginationDetails((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  }, [search, sortType]);

  const handleFilter = () => {
    if (sortType === "price") {
      return coins.sort(
        (coin1, coin2) =>
          parseFloat(coin2.current_price) - parseFloat(coin1.current_price)
      );
    }
    if (sortType === "marketcap") {
      return coins.sort(
        (coin1, coin2) =>
          parseFloat(coin1.market_cap) - parseFloat(coin2.market_cap)
      );
    }
    if (sortType === "change24h") {
      return coins.sort(
        (coin1, coin2) =>
          parseFloat(coin2.price_change_percentage_24h) -
          parseFloat(coin1.price_change_percentage_24h)
      );
    }
    if (sortType === "volume") {
      return coins.sort(
        (coin1, coin2) =>
          parseFloat(coin2.total_volume) - parseFloat(coin1.total_volume)
      );
    }
  };

  handleFilter();

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem =
    paginationDetails.currentPage * paginationDetails.ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - paginationDetails.ITEMS_PER_PAGE;

  const currentCoins = filteredCoins.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    filteredCoins.length / paginationDetails.ITEMS_PER_PAGE
  );

  const goToNext = () => {
    if (paginationDetails.currentPage < totalPages)
      setPaginationDetails((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
  };

  const goToPrev = () => {
    if (paginationDetails.currentPage > 1)
      setPaginationDetails((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
  };

  // const goToPage = (pageNum) => setCurrentPage(pageNum);
  return (
    <div className="crypto-table ">
      <h2 className="table-title">Top Cryptocurrencies</h2>
      <CardWraper>
        <div className="table-header">
          <span>#</span>
          <span>Coin</span>
          <span>Price</span>
          <span>24H</span>
          <span>7D Chart</span>
          <span>Market Cap</span>
          <span>Volume</span>
          <span>Action</span>
        </div>

        {currentCoins.map((coin, index) => (
          <CoinRow
            key={coin.id}
            coin={coin}
            index={indexOfFirstItem + index + 1}
          />
        ))}
      </CardWraper>

      <div className="table-footer">
        Showing {indexOfFirstItem + 1} to{" "}
        {Math.min(indexOfLastItem, filteredCoins.length)} of{" "}
        {filteredCoins.length} coins
        <div className="pagination">
          <button
            onClick={goToPrev}
            disabled={paginationDetails.currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            disabled={paginationDetails.currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
