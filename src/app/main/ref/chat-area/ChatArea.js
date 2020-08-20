// imports
import React from "react";

// material
import { makeStyles } from "@material-ui/core/styles";

// redux
import { Provider } from "react-redux";
import msgStore from "./store";

// components
import Msg from "./components/Msg";
import Widget from "./widget/Widget";

const useStyles = makeStyles(theme => ({
  layoutRoot: {},
}));

function ChatArea(props) {
  const classes = useStyles(props);
  return (
    <Provider store={msgStore}>
      <Msg />
      <Widget />
    </Provider>
  );
}

export default ChatArea;
