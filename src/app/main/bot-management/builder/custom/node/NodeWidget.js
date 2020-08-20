import React, { useState } from "react";

import { useDebounce } from "@fuse/hooks";
import FuseAnimate from "@fuse/core/FuseAnimate";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import CommonLayout from "./components/CommonLayout";

const useStyles = makeStyles(theme => ({
  customNode: {
    borderRadius: "5px",
    minWidth: "116px",
    minHeight: "69px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    flexDirection: "column",
  },
  customNodeSelected: {
    boxShadow: "0px 0px 9px 0px #80caff",
  },
  actionDiv: {
    position: "absolute",
    background: "#f2f0f073",
    width: "28px",
    height: "20px",
    right: "-21px",
    top: 0,
    borderRadius: "10px",
  },
}));

export default function CustomNodeWidget(props) {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);
  const handleToggle = useDebounce(open => {
    setOpened(open);
  }, 150);

  const render = {
    me: CommonLayout,
  };
  return (
    <Paper
      elevation={3}
      className={clsx(classes.customNode, {
        [classes.customNodeSelected]: props.node.options.selected,
      })}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      {opened ? (
        <FuseAnimate animation="transition.slideLeftIn">
          <div className={classes.actionDiv}></div>
        </FuseAnimate>
      ) : null}
      <render.me {...props} />
    </Paper>
  );
}
