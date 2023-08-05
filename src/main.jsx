import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrencyProvider } from "./state/currencyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CurrencyProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </CurrencyProvider>
);
