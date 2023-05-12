import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import BurgerApp from "./App";

import  store  from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BurgerApp />
  </Provider>
);
