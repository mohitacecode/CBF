// imports
import React from "react";
import MomentUtils from "@date-io/moment";
import { create } from "jss";
import jssExtend from "jss-plugin-extend";
import rtl from "jss-rtl";
import history from "@history";
import { BrowserRouter } from "react-router-dom";
import queryString from "query-string";

// fuse and material
import FuseTheme from "@fuse/core/FuseTheme";
import { createGenerateClassName, jssPreset, StylesProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// redux
import Provider from "react-redux/es/components/Provider";
import store from "./store";

import AppContext from "app/AppContext";

// components
import "styles/end-user-chat.css";
import CustomComponent from "./components";
import IframeController from "./IframeController";
import LocalStorageHelper from "app/utils/modules/LocalStorageHelper";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();
const parsed = queryString.parse(window.location.search) || {};
IframeController.setOrigin(parsed.origin);
LocalStorageHelper.setOrigin(parsed.origin);

const App = props => {
  return parsed.origin === parsed.w ? (
    <AppContext.Provider value={{ IframeController }}>
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <BrowserRouter history={history}>
              <FuseTheme>
                <CustomComponent {...props} botID={parsed.h} />
              </FuseTheme>
            </BrowserRouter>
          </MuiPickersUtilsProvider>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  ) : null;
};

export default App;
