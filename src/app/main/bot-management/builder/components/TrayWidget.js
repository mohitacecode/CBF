import React, { Fragment } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import FuseScrollbars from "@fuse/core/FuseScrollbars";

import { TrayItems } from "../custom/node/components";
import TrayItemWidget from "./TrayItemWidget";

const useStyles = makeStyles(theme => ({
  root: {
    width: "290px",
  },
  list: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: "#eaeaea",
    flexGrow: 0,
    flexShrink: 0,
  },
  searchConiatner: {
    margin: "0px 8px 5px 1px",
  },
  input: { width: "calc(100% - 60px)" },
  scrollbar: {
    height: "100% ",
  },
}));

export default function TrayWidget(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FuseScrollbars className={classes.scrollbar}>
        <List className={classes.list}>
          {props.type === "website" ? (
            <Fragment>
              {TrayItems.map((obj, i) => {
                return <TrayItemWidget key={i} {...props} model={obj} />;
              })}
            </Fragment>
          ) : null}
          {props.type === "whatsapp" ? (
            <Fragment>
              {TrayItems.map((obj, i) => {
                if (obj.nodeType !== "CAROUSEL") {
                  return <TrayItemWidget key={i} {...props} model={obj} />;
                } else {
                  return null;
                }
              })}
            </Fragment>
          ) : null}
        </List>
      </FuseScrollbars>
    </div>
  );
}
