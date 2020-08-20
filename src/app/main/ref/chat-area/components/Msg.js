// imports
import React, { useState, useEffect } from "react";
import moment from "moment";

// material & fuse
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import { showMessage } from "app/store/actions/fuse";

// redux
import { useSelector, useDispatch } from "react-redux";
import { saveMessages } from "../store/actions/messages.action";

// components
// import SimpleMsg from "./SimpleMsg";
// import ButtonGrp from "./ButtonGrp";

// service
// import WebsocketService from "app/services/WebsocketService";
import BotDetailService from "app/services/bot/BotDetailService";

let chatSocket = null;

const useStyles = makeStyles(theme => ({
  root: {
    padding: "5px 10px",
    width: "100%",
    left: "35%",
    top: "1%",
    height: "100%",
    float: "right",
  },
  userChat: {
    fontWeight: "600",
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    margin: "10px",
    float: "right",
    maxWidth: "700px",
    minWidth: "50px",
    borderRadius: "30px",
    padding: "10px",
    paddingRight: "20px",
    paddingLeft: "20px",
    background: "silver",
    boxShadow: "2px 3px 8px #93A7AB",
    border: "1px solid #93A7AB",
  },
  sysChat: {
    fontWeight: "600",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: "10px",
    float: "left",
    maxWidth: "700px",
    minWidth: "50px",
    borderRadius: "30px",
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    background: "#93A7AB",
    boxShadow: "-2px 3px 8px  silver",
    border: "1px solid #719192",
  },
  userDate: {
    fontSize: "10px",
    display: "flex",
    flexDirection: "row-reverse",
    float: "right",
    color: "gray",
  },
  sysDate: {
    fontSize: "10px",
    display: "flex",
    flexDirection: "row",
    float: "right",
    color: "gray",
  },
  scroll: {
    padding: "10px",
    height: "86%",
    maxWidth: "100%",
    overflowY: "scroll",
    border: "1px solid silver",
    display: "flex",
    flexDirection: "column-reverse",
  },
  sysType: {
    float: "left",
  },
  userType: {
    marginLeft: "95%",
  },
}));

function Messages({ contactData }) {
  const classes = useStyles();

  //local state

  // redux state
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.chat.chatData);

  useEffect(() => {
    chatSocket = new WebSocket(
      `${process.env.REACT_APP_WS_URL}/ws/chat/${contactData ? contactData.room_id : "lobby"}/`
    );

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("Received message!");
      const time = new Date().getTime();
      const sysMsg = {
        type: "System",
        message: data.message,
        time: moment(time).format("h:mm A"),
      };
      setTimeout(() => {
        dispatch(saveMessages(sysMsg));
      }, 500);
    };
    chatSocket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };
  }, [dispatch, contactData.room_id]);

  function onMessageSubmit(ev) {
    ev.preventDefault();
    const time = new Date().getTime();
    let msg = document.getElementById("msgIp").value;
    const userMsg = {
      type: "User",
      message: msg,
      time: moment(time).format("h:mm A"),
    };
    if (chatSocket !== null && userMsg.message !== "") {
      dispatch(saveMessages(userMsg));
      chatSocket.send(JSON.stringify(userMsg));
    } else if (userMsg.message === "") {
      return;
    } else {
      dispatch(showMessage({ message: "Connection Error" }));
    }

    document.getElementById("msgIp").value = "";
    document.getElementById("msgIp").focus();
  }

  return (
    <div className={classes.root}>
      <Card className={classes.scroll}>
        {chatData.map((Msg, index) => {
          return Msg.type === "User" ? (
            <div key={index}>
              <Typography component={"span"} className={classes.userType}>
                {Msg.type}
              </Typography>
              <Typography component={"span"} className={classes.userChat} id="Usermsg">
                {Msg.message}
                <Typography component={"span"} className={classes.userDate}>
                  {Msg.time}
                </Typography>
              </Typography>
            </div>
          ) : (
            <div key={index}>
              <Typography component={"span"} className={classes.sysType}>
                {Msg.type}
              </Typography>
              <Typography component={"span"} className={classes.sysChat} id="Usermsg">
                {Msg.message}
                <Typography component={"span"} className={classes.sysDate}>
                  {Msg.time}
                </Typography>
              </Typography>
            </div>
          );
        })}
      </Card>

      <form onSubmit={onMessageSubmit} className=" bottom-0 right-0 left-0 py-16 px-8">
        <Paper className="flex items-center relative rounded-24" elevation={3}>
          <TextField
            autoFocus={true}
            className="flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
            InputProps={{ disableUnderline: true }}
            placeholder="Type Text Here..."
            id="msgIp"
          />
          <IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit">
            <Icon className="text-24" color="primary">
              send
            </Icon>
          </IconButton>
        </Paper>
      </form>
    </div>
  );
}

export default Messages;
