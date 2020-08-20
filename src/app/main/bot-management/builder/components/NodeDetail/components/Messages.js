// imports
import React from "react";

//material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  messageInput: {
    padding: "6px 8px",
    background: "#39c7f5",
    color: "white",
    border: "none !important",
    outline: "none !important",
    width: "100%",
    marginBottom: theme.spacing(1),
    "&::-webkit-input-placeholder": {
      /* WebKit, Blink, Edge */
      color: "#ffffffb0",
    },
    "&:-moz-placeholder": {
      /* Mozilla Firefox 4 to 18 */
      color: "#ffffffb0",
    },
    "&::-moz-placeholder": {
      /* Mozilla Firefox 19+ */
      color: "#ffffffb0",
    },
    "&:-ms-input-placeholder": {
      /* Internet Explorer 10-11 */
      color: "#ffffffb0",
    },
  },
  messageInputAction: {
    background: "#39c7f5",
    height: "100%",
    "& > button": {
      color: "white",
    },
  },
  elementAddBtn: {
    opacity: "0.8",
  },
}));

export default function Message({ nodeData, parentClasses }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const messages = nodeData.messages;

  const setMessages = function (newMessages) {
    dispatch(Actions.setNodeProperties({ messages: newMessages }));
  };

  const updateMessage = function (val, i) {
      let newMessages = [...messages];
      newMessages[i] = val;
      setMessages(newMessages);
    },
    addMessage = function () {
      let newMessages = [...messages, ""];
      setMessages(newMessages);
    },
    deleteMessage = function (i) {
      let newMessages = [...messages];
      newMessages.splice(i, 1);
      setMessages(newMessages);
    };

  return (
    <div className={parentClasses.elementBox}>
      <div>
        <div>
          {messages &&
            messages.map((text, i) => {
              return (
                <div key={`m-${i}`} className="flex">
                  <input
                    placeholder="Click here to edit"
                    className={classes.messageInput}
                    onChange={e => updateMessage(e.target.value, i)}
                    value={text}
                  />
                  <div className={classes.messageInputAction}>
                    <IconButton
                      size="small"
                      disabled={messages.length === 1}
                      onClick={() => deleteMessage(i)}
                    >
                      <Icon>{"delete"}</Icon>
                    </IconButton>
                  </div>
                </div>
              );
            })}
        </div>
        <Divider className={parentClasses.divider} />
        <Button
          fullWidth={true}
          variant="contained"
          color="primary"
          onClick={() => addMessage()}
          className={classes.elementAddBtn}
          startIcon={<Icon>{"add"}</Icon>}
        >
          Add Messages
        </Button>
      </div>
    </div>
  );
}
