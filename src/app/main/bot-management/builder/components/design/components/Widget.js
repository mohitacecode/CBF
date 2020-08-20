import React, { useState, Fragment } from "react";
import clsx from "clsx";

// material
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import Tooltip from "@material-ui/core/Tooltip";

// components
import Preview from "app/end-user-chat/components/Preview";

const useStyles = makeStyles(theme => ({
  layout: {
    position: "relative",
  },
  widget: {
    cursor: "pointer",
    background: theme.color.background,
    width: "55px",
    height: "55px",
    position: "absolute",
    borderRadius: "100%",
    boxShadow: "4px 5px 6px 1px rgba(128, 128, 128, 0.5490196078431373)",
    bottom: "4px",
    right: "8px",
  },
  widgetLeft: {
    left: 0,
  },
  header: {
    background: theme.color.background,
    color: "white",
    width: "100%",
    fontWeight: "500",
    padding: "15px",
    zIndex: 10,
  },
  close: {
    cursor: "pointer",
    fontSize: 30,
    float: "right",
  },
  error: {
    background: "rgba(107, 105, 105, 0.7411764705882353)",
    padding: "5px",
    borderRadius: "8px",
    color: "white",
    marginTop: "6px",
  },
}));

const Header = ({ design, botOnline }) => {
  const classes = useStyles();
  const { chatboxname, online_status, offline_status, offline_msg } = design;
  console.log(offline_msg);
  return (
    <Paper className={classes.header} elevation={2}>
      <Icon className={classes.close}>close</Icon>
      <Typography variant={"h5"}>{chatboxname ? chatboxname : "Title"}</Typography>
      {botOnline ? (
        <Typography variant="caption" component={"span"}>
          {online_status ? online_status : "Online"}
        </Typography>
      ) : (
        <Fragment>
          <Typography variant="caption" component={"span"} style={{ marginLeft: "5px" }}>
            {offline_status ? offline_status : "Offline"}
          </Typography>
          {offline_msg ? (
            <div className={classes.error}>
              <Typography component={"span"} id="Usermsg">
                <WarningIcon />
                {offline_msg}
              </Typography>
            </div>
          ) : null}
        </Fragment>
      )}
    </Paper>
  );
};
function Widget({ design, botOnline }) {
  const classes = useStyles();
  const [toggle, setToggle] = useState(design.defaultOpen);

  return (
    <div className={classes.layout}>
      {"toggle" ? (
        <Preview
          elClassName={classes.preview}
          open={true}
          dummy={true}
          messages={{
            messages: [
              { messages: ["Hi", "Welcome To Chat Bot"] },
              { userInputVal: "Input From User" },
              {
                userInputVal:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices feugiat varius...",
              },
            ],
          }}
          selfConainer={true}
          header={<Header design={design} botOnline={botOnline} />}
        />
      ) : null}
      {design.button_label ? (
        <Tooltip
          title={design.label_text}
          placement={design.widget_position === "L" ? "right" : "left"}
          arrow="true"
          open="true"
        >
          <Paper
            className={clsx(classes.widget, {
              [classes.widgetLeft]: design.widget_position === "L",
            })}
            elevation={3}
            onClick={() => setToggle(!toggle)}
          >
            <Icon style={{ fontSize: 30, color: "white", margin: "13px" }}>insert_comment</Icon>
          </Paper>
        </Tooltip>
      ) : (
        <Paper
          className={clsx(classes.widget, { [classes.widgetLeft]: design.widget_position === "L" })}
          elevation={3}
          onClick={() => setToggle(!toggle)}
        >
          <Icon style={{ fontSize: 30, color: "white", margin: "13px" }}>insert_comment</Icon>
        </Paper>
      )}
    </div>
  );
}

export default Widget;
