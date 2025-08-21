import { Search, X } from "lucide-react";
import "./NavBar.css";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import Modal from "../../components/common/modal/Modal";

const NavBar = () => {
  const { search, setSearch, coins } = useContext(GlobalContext);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const btc = coins.find((coin) => coin.id === "bitcoin");
  const eth = coins.find((coin) => coin.id === "ethereum");

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <h1 className="logo-name">
            <span className="active">Broke</span>CoinX
          </h1>

          <div className="live-coins">
            <span className="live">Live: </span>
            <div className="nav-coin coin1">
              <span>BTC</span>
              <span className="active">${btc?.current_price}</span>
              <span className="nav-change green">
                {btc?.price_change_percentage_24h > 0
                  ? `+${btc?.price_change_percentage_24h.toFixed(2)}%`
                  : `${btc?.price_change_percentage_24h.toFixed(2)}%`}
              </span>
            </div>

            <div className="nav-coin coin1">
              <span>ETH</span>
              <span className="active">${eth?.current_price}</span>
              <span className="nav-change red">
                {eth?.price_change_percentage_24h > 0
                  ? `+${eth?.price_change_percentage_24h.toFixed(2)}%`
                  : `${eth?.price_change_percentage_24h.toFixed(2)}%`}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="search-bar desktop-search">
          <input
            type="text"
            placeholder="Search Cryptocurrencies..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search color="hsl(219, 9%, 65%)" className="search-icon" />
        </div>

        {/* Mobile Search Icon */}
        <div className="mobile-search-icon" onClick={openSearchModal}>
          <Search size={24} color="hsl(219, 9%, 65%)" />
        </div>
      </nav>

      {/* Search Modal */}
      <Modal isOpen={isSearchModalOpen} onClose={closeSearchModal}>
        <div className="search-modal-content">
          <div className="search-modal-header">
            <h3>Search Cryptocurrencies</h3>
            
          </div>
          <div className="search-modal-input-container">
            <Search size={20} color="hsl(219, 9%, 65%)" />
            <input
              type="text"
              placeholder="Search Cryptocurrencies..."
              className="search-modal-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
