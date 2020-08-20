// imports
import React, { useState, useEffect, Fragment } from "react";
import clsx from "clsx";

// fuse and material
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

// components
import Preview from "./Preview";
import themeObj from "../themes";

// services
import BotDetailService from "app/services/bot/BotDetailService";
// import { LocalStorageHelper } from "app/utils/Utils";

const useStyles = makeStyles(theme => ({
  widget: {
    cursor: "pointer",
    background: theme.color.background, //theme.palette.primary.main,
    width: "55px",
    height: "55px",
    position: "fixed",
    borderRadius: "100%",
    boxShadow: "4px 5px 6px 1px rgba(128, 128, 128, 0.5490196078431373)",
    bottom: "2%",
    right: "2%", // theme.widPos.right,
  },
  widgetLeft: {
    left: 0,
    boxShadow: "1px 5px 10px 1px rgba(128, 128, 128, 0.5490196078431373)",
  },
  header: {
    background: theme.color.background, // theme.palette.primary.main,
    color: "white",
    width: "100%",
    fontWeight: "500",
    padding: "15px",
  },
  online: {
    borderRadius: "500px",
    background: "green",
    paddingLeft: "5px",
    paddingRight: "5px",
    width: "50px",
  },
  offline: {
    borderRadius: "500px",
    background: "green",
    paddingLeft: "5px",
    paddingRight: "5px",
    width: "50px",
  },
  error: {
    background: theme.color.error.background,
    padding: "5px",
    borderRadius: "200px",
    color: "white",
  },
  close: {
    cursor: "pointer",
    fontSize: 30,
    float: "right",
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.header} elevation={2}>
      <Icon className={classes.close} onClick={props.callBack}>
        close
      </Icon>
      <Typography variant={"h5"}>{props.title ? props.title : "demo_title"}</Typography>
      {/* <Typography variant="caption" component={"span"}>
				{props.online_status ? props.online_status : "online_status"}
			</Typography> */}
    </Paper>
  );
};

const WidgetPreview = props => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(props.defaultOpen ? props.defaultOpen : false);
  const [design, setDesign] = useState(null);

  useEffect(() => {
    if (toggle === true) {
      props.IframeController.setWidth("22rem");
      props.IframeController.setHeight("75vh");
    } else {
      if (design && design.button_label === true) {
        props.IframeController.setWidth("31vw");
        props.IframeController.setHeight("12vh");
      } else {
        props.IframeController.setWidth("6vw");
        props.IframeController.setHeight("12vh");
      }
    }
    // eslint-disable-next-line
  }, [toggle, design]);

  useEffect(() => {
    BotDetailService.getBotDesign({ pathParam: { id: props.botID } }).then(response => {
      props.setTheme((prevState, props) => {
        return { color: { ...prevState.color, ...themeObj[response.data.theme] } };
      });
      setDesign({ ...response.data });
      setToggle(response.data.defaultOpen);

      if (response.data.widget_position === "L") {
        props.IframeController.setLeft("1%");
      }
      props.IframeController.show();
    });
    // eslint-disable-next-line
  }, [props.botID]);

  const toggleWidget = e => {
    setToggle(!toggle);
  };

  return (
    <Fragment>
      {toggle ? (
        <Preview
          {...props}
          open={true}
          botID={props.botID}
          isBot={true}
          togglePreview={toggleWidget}
          // selfConainer={true}
          header={
            <Header
              callBack={toggleWidget}
              title={design ? design.chatboxname : null}
              online_status={design ? design.online_status : null}
            />
          }
        />
      ) : design && design.button_label ? (
        <Tooltip
          title={design.label_text}
          placement={design && design.widget_position === "L" ? "right" : "left"}
          open={true}
          arrow={true}
        >
          <Paper
            className={clsx(classes.widget, {
              [classes.widgetLeft]: design && design.widget_position === "L",
            })}
            elevation={3}
            onClick={toggleWidget}
          >
            <Icon style={{ fontSize: 30, color: "white", margin: "13px" }}>insert_comment</Icon>
          </Paper>
        </Tooltip>
      ) : (
        <Paper
          className={clsx(classes.widget, {
            [classes.widgetLeft]: design && design.widget_position === "L",
          })}
          elevation={3}
          onClick={toggleWidget}
        >
          <Icon style={{ fontSize: 30, color: "white", margin: "13px" }}>insert_comment</Icon>
        </Paper>
      )}
    </Fragment>
  );
};

export default WidgetPreview;
