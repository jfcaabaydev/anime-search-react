import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { WatchListProvider } from "./context/WatchListProvider.jsx";
import App from "./App.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WatchListProvider>
        <App />
      </WatchListProvider>
    </BrowserRouter>
  </StrictMode>,
);
