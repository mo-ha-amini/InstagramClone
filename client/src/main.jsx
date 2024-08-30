

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles/index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { RecoilRoot } from 'recoil';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </>
);
