import React from "react";
import ReactDOM from "react-dom";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "@fortawesome/fontawesome-free-webfonts/css/fontawesome.css";
import "@fortawesome/fontawesome-free-webfonts/css/fa-solid.css";

import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";
import { App } from "./modules/app";
import { initReactIntl } from "./i18n";
import "./styles.css";
import "./polyfills";

/* Configure store. */
const store = configureStore();

/* Configure i18n. */
const { locale, messages } = initReactIntl();

/* Render application. */
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
