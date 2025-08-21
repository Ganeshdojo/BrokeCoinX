import { Routes, Route } from "react-router-dom";
import "./styles/index.css";

import HomePage from "./pages/home/HomePage";
import DetailsPage from "./pages/details/DetailsPage";
import WatchListPage from "./pages/watchlist/WatchListPage";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
