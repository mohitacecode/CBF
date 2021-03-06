import React, { useState, useEffect } from "react";
import clsx from "clsx";

// material
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";

// fuse
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseLoading from "@fuse/core/FuseLoading";

// redux
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { showMessage } from "app/store/actions/fuse";

// components
import Messages from "app/end-user-chat/components/Preview/components/Messages";

// services
import BotDetailService from "app/services/bot/BotDetailService";
import WSService from "app/services/WSService";
import Constants from "app/utils/Constants";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "110%",
  },
  selfConainer: {
    borderRadius: "5px",
    position: "relative",
    height: "85%",
    margin: "15px",
    background: "snow",
    boxShadow: "5px 10px 8px silver",
  },
  header: {
    height: "50px",
    padding: theme.spacing(1, 2),
    paddingRight: "0px",
    borderBottom: "1px solid grey",
    width: "100%",
    background: theme.palette.primary.main,
    "& > *": {
      color: "white",
    },
  },
  scrollbar: {
    height: "calc(100% - 126px)",
    display: "flex",
    flexFlow: "column",
  },
  icons: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
}));

let chatSocket = null;
let adminChat = false;

function LiveChat({ callBack, close, type, roomId, roomName }) {
  const classes = useStyles();
  // redux state
  const dispatch = useDispatch();
  const contact = useSelector(({ chat }) => chat.contact);

  // local state
  const [loading, setLoading] = useState(false);
  const [inputDisable, setInputDisable] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [msgIp, setMsgIp] = useState("");

  /**
   * [closeSocket description]
   * @return {[type]} [description]
   */
  const closeSocket = function () {
    if (chatSocket !== null) {
      chatSocket.close();
    }
    chatSocket = null;
  };
  /**
   * [getChatHistory description]
   * @return {[type]} [description]
   */
  const getHistory = function () {
    if (contact.bot_is_active) {
      setLoading(true);
      BotDetailService.getSessionChatHistory({ pathParam: { room_id: roomId } })
        .then(res => {
          let data = res.data;
          if (data.length > 0) {
            let msg = [];
            data.forEach(obj => {
              return msg.push(obj.message);
            });
            setChatData([...msg]);
            setLoading(false);
          } else {
            getChatHistory();
          }
        })
        .catch(err => {
          setLoading(false);
        });
    } else {
      setLoading(true);
      getChatHistory();
    }
  };

  const getChatHistory = () => {
    BotDetailService.getChatHistory({ pathParam: { room_id: roomId } })
      .then(res => {
        let data = res.data;
        if (data.length > 0) {
          let msg = [];
          data.forEach(obj => {
            return msg.push(obj.message);
          });
          setChatData([...msg]);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      if (chatSocket !== null) {
        chatSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (contact.room_id) {
      if (chatSocket !== null && chatSocket.isOpen() && roomId !== contact.room_id) {
        closeSocket();
      }
    }
    // eslint-disable-next-line
  }, [roomId]);

  useEffect(() => {
    getHistory();
    if (chatSocket === null && contact.bot_is_active) {
      chatSocket = new WSService({ url: `${Constants.api.websocketBaseUrl}/ws/chat/${roomId}/` });
      chatSocket.onMessage(function (e) {
        const data = JSON.parse(e.data);
        if (contact.bot_info.chatbot_type !== "whatsapp") {
          if (adminChat === false) {
            if (
              data.user === "bot_parsed" &&
              data.message[0].user !== "admin" &&
              data.message.length > 0
            ) {
              setChatData((prevState, props) => {
                return [...prevState, data.message[0].message];
              });
            }
          } else {
            if (data.user !== "admin") {
              setChatData((prevState, props) => {
                return [...prevState, data.message];
              });
            }
          }
        } else {
          if (
            data.user === "bot_parsed" &&
            data.message[0].user !== "admin" &&
            data.message.length > 0
          ) {
            setChatData((prevState, props) => {
              return [...prevState, data.message[0].message];
            });
          }
        }
      });
      chatSocket.onClose(function (e) {
        console.log("Chat socket closed " + roomId);
        chatSocket = null;
        adminChat = false;
        setInputDisable(true);
      });
    }

    // eslint-disable-next-line
  }, [roomId]);

  const adminEnable = () => {
    adminChat = !adminChat;
    if (contact.bot_info.chatbot_type !== "whatsapp") {
      if (adminChat === true && chatSocket !== null) {
        chatSocket.send(
          JSON.stringify({
            user: "admin",
            message: "###",
          })
        );
        chatSocket.send(
          JSON.stringify({
            user: "admin",
            message: "*Admin Entered the chat room*",
          })
        );
      } else if (adminChat === false && chatSocket !== null) {
        chatSocket.send(
          JSON.stringify({
            user: "admin",
            message: "*Admin Left the chat room*",
          })
        );
        chatSocket.send(
          JSON.stringify({
            user: "admin",
            message: "~~~",
          })
        );
      }
    } else {
      if (adminChat === true && chatSocket !== null) {
        sendMsgAPICall("*Admin is now Online*", true);
      } else if (adminChat === false && chatSocket !== null) {
        sendMsgAPICall("*Admin is now Offline*", false);
      }
    }

    if (inputDisable === false && chatData.length > 0) {
      const chatting = {
        room_id: roomId,
        chat: [...chatData],
      };
      dispatch(Actions.saveMessages(chatting));
    }
    setInputDisable(!inputDisable);
  };

  const onMessageSubmit = ev => {
    ev.preventDefault();
    if (contact.bot_info.chatbot_type === "whatsapp") {
      if (msgIp !== "") {
        sendMsgAPICall(msgIp, true);
      }
    } else {
      if (type === "bot") {
        if (chatSocket !== null && msgIp !== "") {
          chatSocket.send(
            JSON.stringify({
              user: "admin",
              message: msgIp,
            })
          );

          setChatData((prevState, props) => {
            return [...prevState, msgIp];
          });
        } else if (msgIp === "") {
          return;
        } else {
          dispatch(showMessage({ message: "Connection Error" }));
        }
      }
    }

    setMsgIp("");
  };

  const sendMsgAPICall = (msg, enter_chat) => {
    BotDetailService.sendWhatsappMsg({
      data: { message: msg, enter_chat },
      pathParam: { room_id: roomId },
    }).then(res => {
      setChatData((prevState, props) => {
        return [...prevState, msg];
      });
      if (chatSocket !== null) {
        chatSocket.send(
          JSON.stringify({
            user: "bot_parsed",
            message: [{ user: "admin", message: msg }],
          })
        );
      }
    });
  };

  return (
    <div className={classes.container}>
      <Card className={classes.selfConainer}>
        <div className={clsx("flex justify-between", classes.header)}>
          <div>
            <Typography variant="subtitle1" component="span">
              {roomName ? roomName : "Preview"}
            </Typography>
            {contact.bot_is_active ? (
              <Button
                variant={inputDisable ? "contained" : "outlined"}
                color={inputDisable ? "secondary" : "inherit"}
                size="small"
                onClick={adminEnable}
                style={{ marginLeft: "10px" }}
              >
                {inputDisable ? "Enter Chat" : "Close Chat"}
              </Button>
            ) : null}
          </div>
          <div className={classes.icons}>
            <IconButton onClick={callBack}>
              <Icon style={{ color: "white" }}>menu</Icon>
            </IconButton>
            <IconButton onClick={close}>
              <Icon style={{ color: "white" }}>close</Icon>
            </IconButton>
          </div>
        </div>
        <FuseLoading overlay={loading}>
          <FuseScrollbars scrollToBottomOnChildChange={true} className={classes.scrollbar}>
            <Messages
              messages={chatData}
              admin={true}
              setUserInputVal={null}
              setPlaceholder={null}
            />
          </FuseScrollbars>
        </FuseLoading>
        <form onSubmit={onMessageSubmit} className="absolute bottom-0 right-0 left-0 py-16 px-8">
          <Paper className="flex items-center relative rounded-24" elevation={3}>
            <TextField
              onChange={e => {
                setMsgIp(e.target.value);
              }}
              disabled={contact.bot_is_active ? inputDisable : true}
              autoFocus={true}
              className="flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8"
              InputProps={{ disableUnderline: true }}
              placeholder="Type Text Here..."
              name="msgIp"
              value={msgIp}
            />
            <IconButton
              className="absolute ltr:right-0 rtl:left-0 top-0"
              type="submit"
              disabled={contact.bot_is_active ? inputDisable : true}
            >
              <Icon className="text-24" color="primary">
                send
              </Icon>
            </IconButton>
          </Paper>
        </form>
      </Card>
    </div>
  );
}

export default LiveChat;
