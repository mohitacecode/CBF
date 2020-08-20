// Internet Explorer 11 requires polyfills and partially supported by this project.
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "app/utils/Override";
import ReactDOM from "react-dom";
import "typeface-muli";
import ReactGA from "react-ga";
//import './react-chartjs-2-defaults';
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";

ReactGA.initialize("UA-175651944-1");
if (process.env.REACT_APP_CHAT_MODULE === "true") {
  import("./app/end-user-chat/").then(endUserChatApp => {
    ReactDOM.render(
      endUserChatApp.default({
        endUserLayout:
          process.env.NODE_ENV === "development" && process.env.REACT_APP_CHAT_LAYOUT === "EndUser",
        siteConainer: true,
      }),
      document.getElementById("root")
    );
  });
} else {
  import("./app").then(app => {
    ReactDOM.render(app.default(), document.getElementById("root"));
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
