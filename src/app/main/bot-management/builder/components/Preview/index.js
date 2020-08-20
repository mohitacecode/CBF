import React, { useState, useEffect } from "react";

// material
import Drawer from "@material-ui/core/Drawer";
import { showMessage } from "app/store/actions/fuse/message.actions";
import { useDispatch } from "react-redux";
import Preview from "app/end-user-chat/components/Preview";
import BotDetailService from "app/services/bot/BotDetailService";

export default function BuilderPreview({ open, botID, togglePreview, diagramEngine }) {
  const dispatch = useDispatch();
  const [messageObj, setMessageObj] = useState({ messages: [], lastObj: null });
  const [loadingMessage, setLoadingMessage] = useState(false);
  let timer = null;
  const setMessages = function (obj) {
    setLoadingMessage(true);
    timer = setTimeout(() => {
      setLoadingMessage(false);
      setMessageObj(obj);
      timer = null;
    }, 1000);
  };
  useEffect(() => {
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line
  }, []);

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

  const getBotData = function (dataObj) {
    BotDetailService.getSessionInMemoryData({ pathParam: { id: botID }, data: dataObj }).then(
      response => {
        let data = response.data,
          messages = [...messageObj.messages];
        if (data) {
          data = getUpdatedTextData(data);
        }
        messages.push(data);
        setMessages({ messages: messages, lastObj: data });
      }
    );
  };

  useEffect(() => {
    if (
      open === true &&
      messageObj.lastObj &&
      messageObj.lastObj.userInput !== true &&
      messageObj.lastObj.targetId
    ) {
      let data = { target_id: messageObj.lastObj.targetId };
      if (messageObj.lastObj.variable) {
        data = { ...data, ...messageObj.lastObj.variable };
      }
      getBotData(data);
    }

    if (messageObj.lastObj && messageObj.lastObj.nodeType === "SEND_EMAIL") {
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
      BotDetailService.sendMail({ data: messageObj.lastObj.sendMailObj }).catch(err => {
        dispatch(
          showMessage({
            message: "Please Check If you have filled the Send Mail Fields Properly / Server Error",
            variant: "error",
          })
        );
      });
    }
    // eslint-disable-next-line
  }, [messageObj, open]);

  useEffect(() => {
    if (open === true) {
      let model = diagramEngine.getModel(),
        modelData = model.serialize();
      getBotData({ bot_full_json: { ...modelData } });
    } else if (open === false) {
      setMessages({ messages: [], lastObj: null });
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <Drawer anchor="right" open={open} onClose={togglePreview}>
      <Preview
        dummy={true}
        showLoading={loadingMessage}
        updateMessages={obj => setMessages(obj)}
        messages={messageObj}
        togglePreview={togglePreview}
        open={open}
        botID={botID}
      />
    </Drawer>
  );
}
