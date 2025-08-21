import { useContext } from "react";
import "./WatchListPage.css";
import { Star } from "lucide-react";
import { GlobalContext } from "../../contexts/GlobalContext";
import CoinRow from "../../components/common/coinrow/CoinRow";
import Modal from "../../components/common/modal/Modal";
import { useState } from "react";
import { Trash } from "lucide-react";

const WatchListPage = () => {
  const { WatchListCoins, setWatchListCoins } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const emptyWatchList = () => {
    return (
      <div className="list-bottom-container">
        <Star size={80} color="hsla(219, 9%, 65%, 0.4)" />
        <span className="text-grey">No cryptocurrencies in watchlist</span>
        <span className="text-grey2">
          Add coins to your watchlist by clicking the star icon
        </span>
      </div>
    );
  };

  const handleClearAll = () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    setWatchListCoins([]);
    setIsOpen(false);
  };

  const modalContent = () => {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="list-bottom-container">
          <Trash size={80} color="hsla(219, 9%, 65%, 0.4)" />
          <span className="text-grey">
            Do You Want to Clear All Coins From WatchList
          </span>
          <span className="text-grey2">WatchList Will be Cleared</span>
          <div className="clear-btns">
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <section className="main-container">
        <div className="text">
          <span className="subheading">
            My <span className="active">WatchList</span>
          </span>
          <span
            className="
          span-text"
          >
            Track your favorite cryptocurrencies
          </span>
        </div>
        <div className="list-container">
          <div className="list-header">
            <h3>Watch List ({WatchListCoins?.length})</h3>
            <button onClick={handleClearAll}>Clear All</button>
            {modalContent()}
          </div>

          {WatchListCoins?.length === 0 ? (
            emptyWatchList()
          ) : (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div className="list-table-header">
                <span>#</span>
                <span>Coin</span>
                <span>Price</span>
                <span>24H</span>
                <span>7D Chart</span>
                <span>Market Cap</span>
                <span>Volume</span>
                <span>Action</span>
              </div>
              {WatchListCoins.map((coin, index) => {
                return (
                  <CoinRow key={coin.id} coin={coin} index={0 + index + 1} />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WatchListPage;
