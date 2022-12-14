import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  getChainOptions,
  WalletProvider,
} from "@terra-money/wallet-provider";
import App from "./App";
import ModalContextProvider from "./context/modalContext";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

getChainOptions().then((chainOptions) => {
  root.render(
    <WalletProvider {...chainOptions}>
    <ModalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ModalContextProvider>
    </WalletProvider>
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
