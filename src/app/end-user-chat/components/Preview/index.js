import React, { useEffect, useState, Fragment } from "react";
import Formsy from "formsy-react";
import clsx from "clsx";
import moment from "moment";
import MomentUtils from "@date-io/moment";

// material
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

//Fuse
import { TextFieldFormsy } from "@fuse/core/formsy";
import FuseScrollbars from "@fuse/core/FuseScrollbars";

// redux
import reducer from "../../store/reducers/room.reducer";
import withReducer from "../../store/withReducer";

// components
import Messages from "./components/Messages";

import BotDetailService from "app/services/bot/BotDetailService";
import WSService from "app/services/WSService";
import Constants from "app/utils/Constants";
import { LocalStorageHelper } from "app/utils/Utils";

const useStyles = makeStyles(theme => ({
  conainer: {
    width: "380px",
    height: "100%",
  },
  siteConainer: {
    position: "relative",
    height: "calc(100% - 20px);",
    margin: theme.spacing(1),
    boxShadow: "0px 0px 6px 1px rgba(128, 128, 128, 0.5490196078431373)",
    background: "white",
    borderRadius: "4px",
  },
  endUserLayout: {
    position: "fixed",
    right: "10px",
    bottom: "19px",
    height: "calc(100vh - 30%)",
    boxShadow: "0px 0px 6px 1px rgba(128, 128, 128, 0.5490196078431373)",
  },
  selfConainer: {
    borderRadius: "5px",
    position: "relative",
    height: "calc(95vh - 90px)",
    margin: `0px ${theme.spacing(2)}px`,
    background: "snow",
    boxShadow: "5px 10px 8px gray",
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
  body: {
    height: "calc(100% - 79px)",
    display: "flex",
    flexFlow: "column",
  },
  scrollbar: {
    display: "flex",
    flexFlow: "column",
  },
  date: {
    padding: "10px",
    marginLeft: "20px",
  },
  footer: {
    position: "absolute",
    textAlign: "center",
    width: "90%",
    opacity: "0.5",
  },
}));

let chatSocket = null;
let isLiveChat = false;
let enableChat = null;

function Preview({
  open,
  dummy,
  botID,
  togglePreview,
  header,
  messages,
  updateMessages,
  selfConainer,
  endUserLayout,
  siteConainer,
  isBot,
  elClassName,
  showLoading,
  IframeController,
}) {
  const classes = useStyles();
  // local state
  const [fetchingPrevMsgs, setFetchingPrevMsgs] = useState(true);
  const [messageObj, setMessageObj] = useState(
    messages ? messages : { messages: [], lastObj: null, room_id: null, isLiveChat: false }
  );

  useEffect(() => {
    LocalStorageHelper.get(botID, data => {
      // Uncomment to enable session management
      // if (data) setMessageObj({ ...data, isLiveChat: data?.isLiveChat || false });
      setFetchingPrevMsgs(false);
    });
    // eslint-disable-next-line
  }, []);

  const [loadingMessage, setLoadingMessage] = useState(showLoading ? showLoading : false);
  const [userInputVal, setUserInputVal] = useState("");
  const [placeholder, setPlaceholder] = useState("Type Text Here...");
  const [chatData, setChatData] = useState([...messageObj.messages]);
  const [dateValue, setDates] = useState(moment());
  const [rating, setRating] = useState(null);

  let defaultFormat = "MM/DD/YYYY";
  let timer = null;

  const setMessages = function (obj) {
    if (messageObj.room_id) {
      LocalStorageHelper.set({ key: botID, val: messageObj, replace: true });
    }

    if (dummy === true && updateMessages) {
      updateMessages(obj);
    } else {
      setLoadingMessage(true);
      timer = setTimeout(() => {
        setLoadingMessage(false);
        setMessageObj(obj);
        timer = null;
      }, 1000);
    }
  };
  /**
   * [getUpdatedTextData description]
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  const getUpdatedTextData = function (obj) {
    if (obj.variables) {
      let variables = Object.keys(obj.variables).filter(key => key !== "@"),
        regExp = new RegExp(variables.join("|"), "gi");
      if (variables && variables.length) {
        if (obj.questionText) {
          obj.questionText = obj.questionText.replace(regExp, function (matched) {
            return obj.variables[matched];
          });
        } else if (obj.messages) {
          obj.messages = obj.messages.map(function (text) {
            return text.replace(regExp, function (matched) {
              return obj.variables[matched];
            });
          });
        } else if (obj.text) {
          obj.text = obj.text.replace(regExp, function (matched) {
            return obj.variables[matched];
          });
        }
      } else {
        return obj;
      }
    }
    return obj;
  };

  /**
   * [parseMessages description]
   * @param  {[type]} messages [description]
   * @return {[type]}          [description]
   */
  const parseMessages = function (obj) {
    let messageList = [];
    if (obj.messages) {
      obj.messages.forEach(function (text) {
        messageList.push({ user: "bot", message: text });
      });
    } else if (obj.questionText) {
      messageList.push({ user: "bot", message: obj.questionText });
    } else if (obj.userInputVal) {
      messageList.push({ user: "end_user", message: { userInputVal: obj.userInputVal } });
    }
    if (obj.urlMessage) {
      messageList.push({ user: "bot", message: obj.urlMessage });
    }
    return messageList;
  };

  /**
   * [description]
   * @param  {[type]} opt [description]
   * @return {[type]}     [description]
   */
  const sendMessage = opt => {
    //const messageList = parseMessages(messageObj.lastObj);
    chatSocket.send(
      JSON.stringify({
        user: "bot",
        room_id: messageObj.room_id,
        bot_id: botID,
        data: opt,
        //message: messageList
      })
    );
  };

  /**
   * [description]
   * @param  {[type]} targetId [description]
   * @param  {[type]} lastObj  [description]
   * @return {[type]}          [description]
   */
  const getBotData = (targetId, lastObj) => {
    if (targetId) {
      let opt = { target_id: targetId };
      if (lastObj && lastObj.userInputVal && lastObj.variable) {
        opt = { ...opt, ...lastObj.variable };
      }
      sendMessage(opt);
    }
  };

  const sendUserInput = function ({ userInputVal, messageObj }) {
    if (isLiveChat) {
      if (chatSocket !== null && userInputVal !== "") {
        chatSocket.send(
          JSON.stringify({
            user: "end_user",
            message: { userInputVal: userInputVal },
          })
        );
        const msg = {
          userInputVal: userInputVal,
        };
        setChatData((prevState, props) => {
          return [...prevState, msg];
        });
        setUserInputVal("");
      } else {
        return;
      }
    } else {
      let messages = [...messageObj.messages],
        lastMessage = messageObj.lastObj,
        opt = { userInputVal: userInputVal, targetId: lastMessage.targetId };
      if (lastMessage.variable) {
        opt.variable = {};
        opt.variable["variable"] = lastMessage.variable;
        if (lastMessage.nodeType === "RATING" && rating !== null && lastMessage.feedback_input) {
          if (lastMessage.rating_type === "star_custom") {
            opt.variable[
              "post_data"
            ] = `Rating: ${rating}/${lastMessage.rating_max}, Feedback: ${userInputVal}`;
          } else {
            opt.variable["post_data"] = `Rating: ${rating}/5, Feedback: ${userInputVal}`;
          }
        } else if (lastMessage.nodeType === "RATING" && lastMessage.feedback_input === false) {
          if (lastMessage.rating_type === "star_custom") {
            opt.variable["post_data"] = `Rating: ${userInputVal}/${lastMessage.rating_max}`;
          } else {
            opt.variable["post_data"] = `Rating: ${userInputVal}/5`;
          }
        } else {
          opt.variable["post_data"] = userInputVal;
        }
      }
      messages.push(opt);
      setUserInputVal("");
      setMessages({ ...messageObj, messages: messages, lastObj: opt });
    }
  };

  const appendMessageFromInteractiveComponent = function (obj) {
    let messages = [...messageObj.messages],
      opt = { userInputVal: obj.text, targetId: obj.targetId };
    let lastIndex = messages.length - 1;
    if (messages[lastIndex] && messages[lastIndex].buttons) {
      messages[lastIndex] = { ...messages[lastIndex], buttons: [] };
    }
    let lastMessage = messages[lastIndex];
    if (lastMessage && lastMessage.variable) {
      opt.variable = {};
      opt.variable["variable"] = lastMessage.variable;
      opt.variable["post_data"] = obj.text;
    }
    messages.push(opt);
    setMessages({ ...messageObj, messages: messages, lastObj: opt });
  };
  /**
   * @param  {[type]}
   * @return {[type]}
   */
  const buttonClick = appendMessageFromInteractiveComponent;

  const dateSelected = appendMessageFromInteractiveComponent;

  const getInputType = function () {
    let type = "text";
    if (messageObj.lastObj) {
      switch (messageObj.lastObj.nodeType) {
        case "EMAIL":
          type = "email";
          break;
        case "PHONE":
          type = "number";
          break;
        case "AGENT_TRANSFER":
          type = "text";
          break;
        case "USERNAME":
          type = "name";
          break;
        default:
          type = "text";
      }
      if (isLiveChat) {
        type = "text";
      }
    }
    return type;
  };

  // The first call
  useEffect(() => {
    if (dummy === true) {
      return;
    }
    if (messageObj.room_id) {
      // BotDetailService.getChatHistory({ pathParam: { room_id: messageObj.room_id } }).then(
      //   res => {
      //     let data = res.data;
      //     let msg = [...messageObj.messages];
      // if (data.length > 0) {
      //   data.forEach(obj => {
      //     return msg.push(obj.message);
      //   });
      // }
      // setMessages({ ...messageObj, messages: [...msg] });
      //   }
      // );
    } else if (!fetchingPrevMsgs) {
      BotDetailService.getSessionData({ pathParam: { id: botID } }).then(response => {
        if (response.data.nodeType === "INIT") {
          isLiveChat = false;
          let room_id = response.data.room_id,
            data = response.data,
            messages = [...messageObj.messages];
          if (data) {
            data = getUpdatedTextData(data);
          }
          messages.push(data);
          setMessages({ messages: messages, lastObj: data, room_id: room_id });
        }
      });
    }

    return () => {
      if (chatSocket !== null && chatSocket.isOpen()) {
        chatSocket.close();
      }
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line
  }, [fetchingPrevMsgs]);

  // 2nd
  useEffect(() => {
    if (dummy === true) {
      return;
    }
    if (messageObj.room_id && (chatSocket === null || chatSocket.isClosed())) {
      chatSocket = new WSService({
        url: `${Constants.api.websocketBaseUrl}/ws/chat/${messageObj.room_id}/`,
      });
      chatSocket.onClose(function (e) {
        console.log("Chat Socket Closed!!!");
        enableChat = null;
        isLiveChat = false;
      });
    }
  }, [messageObj, dummy]);

  useEffect(() => {
    if (dummy === true) {
      return;
    }
    if (chatSocket) {
      chatSocket.onMessage(function (e) {
        if (e) {
          let messages = [...messageObj.messages];
          const data1 = JSON.parse(e.data);
          if (data1.user === "session_timeout") {
            return chatSocket.close();
          }
          if (data1.user !== "bot_parsed") {
            // conversion logic
            if (data1.message === "###") {
              // commenting this
              // setChatData(messages);
              isLiveChat = true;
              enableChat = true;
            } else if (data1.message === "~~~") {
              enableChat = false;
            } else if (isLiveChat) {
              if (data1.user !== "end_user") {
                setChatData((prevState, props) => {
                  return [...prevState, data1.message];
                });
              }
            } else {
              // template logic
              let data = data1.data;
              if (data) {
                data = getUpdatedTextData(data);
              }
              messages.push(data);
              setMessages({ ...messageObj, messages: messages, lastObj: data });
            }
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [messageObj, dummy]);

  useEffect(() => {
    if (dummy === true) {
      return;
    }
    if (open === true && messageObj.lastObj) {
      if (messageObj.lastObj.nodeType === "AGENT_TRANSFER") {
        setChatData([...messageObj.messages]);
        enableChat = true;
        isLiveChat = true;
      } else if (messageObj.lastObj.userInput !== true && messageObj.lastObj.targetId) {
        getBotData(messageObj.lastObj.targetId, messageObj.lastObj);
      }

      if (messageObj.lastObj.nodeType === "SEND_EMAIL") {
        if (messageObj.lastObj.sendMailObj) {
          if (messageObj.lastObj.sendMailObj.to_email.indexOf("@") === 0) {
            let updatedText = getUpdatedTextData({
              variables: messageObj.lastObj.variables,
              text: messageObj.lastObj.sendMailObj.to_email,
            });
            messageObj.lastObj.sendMailObj.to_email = updatedText.text;
          }
          if (messageObj.lastObj.sendMailObj.subject.indexOf("@") >= 0) {
            let updatedText = getUpdatedTextData({
              variables: messageObj.lastObj.variables,
              text: messageObj.lastObj.sendMailObj.subject,
            });
            messageObj.lastObj.sendMailObj.subject = updatedText.text;
          }
          if (messageObj.lastObj.sendMailObj.content.indexOf("@") >= 0) {
            let updatedText = getUpdatedTextData({
              variables: messageObj.lastObj.variables,
              text: messageObj.lastObj.sendMailObj.content,
            });
            messageObj.lastObj.sendMailObj.content = updatedText.text;
          }
        }
        BotDetailService.sendMail({ data: messageObj.lastObj.sendMailObj }).catch(err => {});
      }
      const messageList = parseMessages(messageObj.lastObj);
      chatSocket.send(
        JSON.stringify({
          user: "bot_parsed",
          message: messageList,
        })
      );
    }
    // eslint-disable-next-line
  }, [messageObj, dummy]);

  useEffect(() => {
    if (dummy === true) {
      setMessageObj({ ...messages });
      setLoadingMessage(showLoading);
    }
  }, [messages, showLoading, dummy]);

  let disabled = true;
  if (messageObj.lastObj) {
    if (messageObj.lastObj.userInput === true && messageObj.lastObj.multiple !== true) {
      disabled = false;
    }
    if (messageObj.lastObj.nodeType === "RATING" && messageObj.lastObj.feedback_input === false) {
      disabled = true;
    }
    if (messageObj.lastObj.nodeType === "MULTIPLE_CHECK_BOX") {
      disabled = true;
    }
  }

  if (enableChat !== null) {
    if (enableChat === true) {
      disabled = false;
    } else {
      disabled = true;
    }
  }

  const handelChange = (model, directInput, data) => {
    if (directInput) {
      setUserInputVal(data);
      sendUserInput({ userInputVal: data, messageObj });
    } else {
      setUserInputVal(Object.values(model)[0]);
      sendUserInput({ userInputVal, messageObj });
    }
  };

  const getDateFormat = function (obj) {
    return (obj.lastObj && obj.lastObj.dateFormat) || defaultFormat;
  };

  const dateSubmit = e => {
    e.preventDefault();
    dateSelected({ ...messageObj.lastObj, text: dateValue.format(getDateFormat(messageObj)) });
  };

  const inputType = getInputType();

  return (
    <div
      className={clsx(classes.conainer, elClassName, {
        [classes.selfConainer]: selfConainer,
        [classes.endUserLayout]: endUserLayout,
        [classes.siteConainer]: siteConainer,
      })}
    >
      <Fragment>
        <div className={classes.body}>
          {header ? (
            header
          ) : (
            <div className={clsx("flex justify-between", classes.header)}>
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  {"Preview"}
                </Typography>
              </div>
              <IconButton
                onClick={() => {
                  togglePreview();
                }}
              >
                <Icon>{"close"}</Icon>
              </IconButton>
            </div>
          )}
          <FuseScrollbars scrollToBottomOnChildChange={true} className={classes.scrollbar}>
            <Messages
              messages={isLiveChat ? chatData : messageObj.messages}
              buttonClick={buttonClick}
              setUserInputVal={setUserInputVal}
              setPlaceholder={setPlaceholder}
              loadingMessage={loadingMessage}
              setRating={setRating}
              handelChange={handelChange}
            />
          </FuseScrollbars>
        </div>
        <div className="absolute bottom-0 left-0 right-0 py-16 px-16">
          <Paper className="flex items-center relative rounded-24" elevation={2}>
            {messageObj.lastObj && messageObj.lastObj.nodeType === "DATE" ? (
              <form className={classes.date} onSubmit={dateSubmit}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    format={getDateFormat(messageObj)}
                    value={dateValue}
                    onChange={date => setDates(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <IconButton
                  type="submit"
                  className="absolute ltr:right-0 rtl:left-0 top-0"
                  disabled={disabled}
                >
                  <Icon className="text-24" color="primary">
                    send
                  </Icon>
                </IconButton>
              </form>
            ) : (
              <Formsy
                className="flex flex-grow flex-shrink-0 mx-32 ltr:mr-48 rtl:ml-48"
                onValidSubmit={model => handelChange(model, false, null)}
              >
                <TextFieldFormsy
                  placeholder={placeholder}
                  className="mt-10 mb-10 flex-grow"
                  name={inputType}
                  value={userInputVal}
                  validations={
                    inputType === "text"
                      ? {}
                      : inputType === "name"
                      ? { isWords: true }
                      : inputType === "email"
                      ? { isEmail: true }
                      : { isLength: 10, isNumeric: true }
                  }
                  validationErrors={
                    inputType === "text"
                      ? {}
                      : inputType === "name"
                      ? { isWords: "name should not contain numbers" }
                      : inputType === "email"
                      ? { isEmail: "Please Provide Valid Email" }
                      : {
                          isNumeric: "It should be a Number",
                          isLength: "Mobile number should be 10 digit long",
                        }
                  }
                  onChange={e => setUserInputVal(e.target.value)}
                  InputProps={{
                    type: "text",
                    disableUnderline: true,
                  }}
                  disabled={disabled}
                  required
                />
                <IconButton type="submit" className="absolute ltr:right-0 rtl:left-0 top-0">
                  <Icon className="text-24" color="primary">
                    send
                  </Icon>
                </IconButton>
              </Formsy>
            )}
          </Paper>
          <div className={classes.footer}>
            <Typography variant="caption">© Created By AutoVista Chatbots</Typography>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default withReducer("clientData", reducer)(Preview);
