// imports
import React, { useState, useEffect } from "react";

// material
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";

// redux
import { Provider } from "react-redux";
import msgStore from "../store";

// components
import WidgetMsg from "./WidgetMsg";

const useStyles = makeStyles(theme => ({
  layoutRoot: {},
  widget: {
    cursor: "pointer",
    background: "#1769aa",
    padding: "10px",
    position: "fixed",
    borderRadius: "1000px",
    boxShadow: "5px 10px 8px gray",
    border: "2px solid #93A7AB",
    alignContent: "center",
    bottom: "2%",
    right: "5%",
  },
}));

function Widget(props) {
  const classes = useStyles(props);

  // local state
  const [isOpen, setOpen] = useState(false);

  const toggle = e => {
    setOpen(!isOpen);
  };

  return (
    <Provider store={msgStore}>
      {isOpen ? (
        <WidgetMsg toggle={toggle} />
      ) : (
        <div className={classes.root} onClick={toggle}>
          <Paper className={classes.widget} elevation={4}>
            <Icon style={{ fontSize: 30, color: "white" }}>insert_comment</Icon>
          </Paper>
        </div>
      )}
    </Provider>
  );
}

export default Widget;
