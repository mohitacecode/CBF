// imports
import React, { useEffect, useState, Fragment } from "react";
import io from "socket.io-client";
import forEach from "lodash/forEach";

// material
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// redux
import { useSelector, useDispatch } from "react-redux";
import { saveMessages } from "../store/actions/messages.action";

// components
import SimpleMsg from "../components/SimpleMsg";
import ButtonGrp from "../components/ButtonGrp";

// service
import WebsocketService from "app/services/WebsocketService";

let chatSocket = null;
let adminSocket = null;
let roomName = "lobby";
let test = ["Hi", "Hello"];
let test1 = ["HELLO World"];
let question = true;
let message = true;
let nodeType = "Multiple";

const useStyles = makeStyles(theme => ({
  userChat: {
    fontWeight: "600",
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    padding: "20px",
    margin: "10px",
    float: "right",
    maxWidth: "700px",
    padding: "5px",
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
    padding: "20px",
    margin: "10px",
    float: "left",
    maxWidth: "700px",
    padding: "5px",
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
    maxWidth: "480px",
    height: "410px",
    maxHeight: "530px",
    marginTop: "55px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column-reverse",
  },
  sysUser: {
    marginLeft: "2%",
  },
  userUser: {
    marginLeft: "95%",
  },
  header: {
    background: "#0277bd",
    color: "white",
    width: "100%",
    position: "absolute",
    fontWeight: "500",
    border: "1px solid black",
    padding: "15px",
    zIndex: 10,
  },
  close: {
    cursor: "pointer",
    fontSize: 30,
    float: "right",
  },
  popup: {
    maxWidth: "450px",
    height: "540px",
    position: "absolute",
    right: "2%",
    top: "2%",
  },
}));

function WidgetMsg(props) {
  const classes = useStyles(props);

  // redux state
  const dispatch = useDispatch();
  const chatData = useSelector(state => state.chatData);

  // local state
  const [child, setChild] = useState({});
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    WebsocketService.on({
      eventName: "connected",
      listenEvent: socket => {
        socket.emit("enter_room", { room: roomName });
      },
    });
    WebsocketService.on({
      eventName: "message",
      listenEvent: message => {
        console.log("/chat message recieved!");
        console.log(message.data);
        const today = new Date();
        const timew = today.getHours() + ":" + today.getMinutes();
        const sysMsg = {
          type: "System",
          text: message.data,
          time: timew,
        };
        setTimeout(() => {
          dispatch(saveMessages(sysMsg));
        }, 200);
      },
    });
    chatSocket = WebsocketService.connect("chat", { "sync disconnect on unload": true });
  }, []);

  useEffect(() => {
    const userMsg = {
      type: "User",
      text: <ButtonGrp text={["Demo Button"]} />,
      time: "10:10",
    };
    dispatch(saveMessages(userMsg));
  }, []);

  function onMessageSubmit(ev) {
    ev.preventDefault();
    const today = new Date();
    const timew = today.getHours() + ":" + today.getMinutes();
    let msg = document.getElementById("msgIp").value;
    const userMsg = {
      type: "User",
      text: msg,
      time: timew,
    };
    dispatch(saveMessages(userMsg));
    chatSocket.emit("message", { data: msg, room: roomName });
    document.getElementById("msgIp").value = "";
    document.getElementById("msgIp").focus();
  }

  return (
    <Fragment>
      <Paper elevation={3} className={classes.popup}>
        <Paper className={classes.header} elevation={20}>
          <Typography variant={"h5"} component={"span"}>
            Chat Preview
          </Typography>
          <Icon className={classes.close} onClick={props.toggle}>
            close
          </Icon>
        </Paper>
        <Card className={classes.scroll}>
          {message ? (
            <div>
              <SimpleMsg msg="Demo Msg for simple Message Type Response" class={classes.userChat} />
            </div>
          ) : null}
          {question ? (
            <div>
              <SimpleMsg
                msg="Demo Question for simple Question Type Response"
                class={classes.userChat}
              />
            </div>
          ) : null}
          {nodeType === "Multiple" ? (
            <div>
              <ButtonGrp text={test1} />
            </div>
          ) : null}
          {nodeType === "Multiple" ? (
            <div>
              <SimpleMsg
                msg='Demo Buttons when nodeType="Multiple" and text are more than one'
                class={classes.userChat}
              />
              <ButtonGrp text={test} orientation="horizontal" />
            </div>
          ) : null}

          {chatData.map((Msg, index) => {
            return Msg.type === "User" ? (
              <div key={index}>
                <Typography component={"span"} className={classes.userUser}>
                  {Msg.user}
                </Typography>
                <Typography component={"span"} className={classes.userChat} id="Usermsg">
                  {Msg.text}
                  <Typography component={"span"} className={classes.userDate}>
                    {Msg.time}
                  </Typography>
                </Typography>
              </div>
            ) : (
              <div key={index}>
                <Typography component={"span"} className={classes.sysUser}>
                  {Msg.user}
                </Typography>
                <Typography component={"span"} className={classes.sysChat} id="Usermsg">
                  {Msg.text}
                  <Typography component={"span"} className={classes.sysDate}>
                    {Msg.time}
                  </Typography>
                </Typography>
              </div>
            );
          })}
        </Card>
        <form onSubmit={onMessageSubmit} className="absolute bottom-0 left-0 right-0 py-16 px-16">
          <Paper className="flex items-center relative rounded-24" elevation={2}>
            <TextField
              autoFocus={true}
              className="flex flex-grow flex-shrink-0 mx-32 ltr:mr-48 rtl:ml-48 my-8"
              InputProps={{ disableUnderline: true }}
              placeholder="Type Text Here..."
              id="msgIp"
            />
            <IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit">
              <Icon className="text-24" color="action">
                send
              </Icon>
            </IconButton>
          </Paper>
        </form>
      </Paper>
    </Fragment>
  );
}

export default WidgetMsg;
