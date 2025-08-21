import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalProvider from "./contexts/GlobalContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router>
  </StrictMode>
);
