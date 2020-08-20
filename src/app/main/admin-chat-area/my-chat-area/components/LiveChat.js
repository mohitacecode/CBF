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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// fuse
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/actions/fuse";

// redux
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../store/actions";

// components
import Messages from "app/end-user-chat/components/Preview/components/Messages";

// services
import BotDetailService from "app/services/bot/BotDetailService";
import ChatManagementService from "app/services/chat-management";
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
  textArea: {
    height: "100px",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.23)",
    padding: theme.spacing(1),
    borderWidth: "1px",
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

let chatSocket = null;
let adminChat = false;

const closeChatActions = ["Resolve", "Disconnected"];

function LiveChat({ roomId, callBack, close, type, roomName }) {
  const classes = useStyles();
  // redux state
  const dispatch = useDispatch();
  const contact = useSelector(({ chat }) => chat.contact);
  const user = useSelector(({ auth }) => auth.user.user);
  // local state
  const [loading, setLoading] = useState(false);
  const [inputDisable, setInputDisable] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [msgIp, setMsgIp] = useState("");
  const [closeChat, setCloseChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [chatNote, setChatNote] = useState("");

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
        if (contact.chatbot_type !== "whatsapp") {
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
            if (data.email !== user.email) {
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
    if (contact.chatbot_type !== "whatsapp") {
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
            message: `*${
              user ? user.first_name : "Customer Representative"
            } Entered the chat room*`,
          })
        );
      } else if (adminChat === false && chatSocket !== null) {
        chatSocket.send(
          JSON.stringify({
            user: "admin",
            message: `*${user ? user.first_name : "Customer Representative"} Left the chat room*`,
          })
        );
        chatSocket.send(
          JSON.stringify({
            user: "admin",
            message: "~~~",
          })
        );
        setCloseChat(true);
      }
    } else {
      if (adminChat === true && chatSocket !== null) {
        sendMsgAPICall(
          `*${user ? user.first_name : "Customer Representative"} is now Online*`,
          true
        );
      } else if (adminChat === false && chatSocket !== null) {
        sendMsgAPICall(
          `*${user ? user.first_name : "Customer Representative"} is now Offline*`,
          false
        );
        setCloseChat(true);
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
    if (contact.chatbot_type === "whatsapp") {
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
              email: user.email,
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

  const handleCloseChat = e => {
    let data = {
      room_id: contact.room_id,
      close_chat_action: closeChatActions[selectedIndex].toLowerCase(),
      review_note: chatNote,
    };
    ChatManagementService.sendChatReview({
      data,
    })
      .then(res => {
        setInputDisable(true);
        dispatch(showMessage({ message: "Review Noted", variant: "success" }));
      })
      .catch(err => {
        dispatch(showMessage({ message: "Failed To Note the Review", variant: "error" }));
      });
    setCloseChat(false);
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
                {inputDisable ? "Enter Chat" : "Update Chat Status"}
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
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={closeChat}
        onClose={() => {
          setCloseChat(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Typography variant="h6" style={{ marginBottom: "10px" }} component="h6">
            Chat Review
          </Typography>
          <Typography variant="subtitle2" component="h5">
            {"Close Chat Action"}
            <List component="span" aria-label="Device settings" className="flex flex-1">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                style={{ border: "2px solid rgba(0, 0, 0, 0.23)" }}
                onClick={event => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <ListItemText
                  primary={
                    <FuseLoading overlay={loading}>{closeChatActions[selectedIndex]}</FuseLoading>
                  }
                />
                <ArrowDropDownIcon style={{ color: "gray" }} />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => {
                setAnchorEl(null);
              }}
            >
              {closeChatActions.map((action, index) => (
                <MenuItem
                  style={{ width: "400px" }}
                  key={index}
                  selected={index === selectedIndex}
                  onClick={event => {
                    setSelectedIndex(index);
                    setAnchorEl(null);
                  }}
                >
                  {action}
                </MenuItem>
              ))}
            </Menu>
            {"Review Note : "}
            <textarea
              className={classes.textArea}
              onChange={e => {
                setChatNote(e.target.value);
              }}
              value={chatNote}
              placeholder="Enter Note Regarding This Chat"
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCloseChat(false);
            }}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
          <Button onClick={handleCloseChat} variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LiveChat;
