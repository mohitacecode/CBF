// imports
import React from "react";
import clsx from "clsx";

//material
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

export default function SendMail({ nodeData, parentClasses, setSaveSuccess, setDisable }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const sendMailObj = nodeData.sendMailObj;
  if (sendMailObj.to_email === "" || sendMailObj.subject === "" || sendMailObj.content === "") {
    setDisable(true);
    setSaveSuccess(false);
  } else {
    setDisable(false);
    setSaveSuccess(true);
  }

  const setMailObj = function (val) {
    dispatch(Actions.setNodeProperties({ sendMailObj: { ...sendMailObj, ...val } }));
  };

  return (
    <div>
      <Divider className={parentClasses.divider} />
      <FormControl className={classes.formControl}>
        <TextField
          label="From"
          className={clsx("w-full", parentClasses.valueBox)}
          type="email"
          onChange={e => setMailObj({ from_email: e.target.value })}
          value={sendMailObj.from_email}
          placeholder="Senders Email"
          variant="outlined"
        />
      </FormControl>
      <TextField
        label="To"
        className={clsx("w-full", parentClasses.valueBox)}
        type="email"
        onChange={e => setMailObj({ to_email: e.target.value })}
        value={sendMailObj.to_email}
        placeholder="Recievers Email"
        variant="outlined"
      />
      <Divider className={parentClasses.divider} />
      <TextField
        label="Subject"
        className={clsx("w-full", parentClasses.valueBox)}
        type="text"
        onChange={e => setMailObj({ subject: e.target.value })}
        value={sendMailObj.subject}
        placeholder="Email Subject"
        variant="outlined"
      />
      <Divider className={parentClasses.divider} />
      <Typography className={parentClasses.valHeading} variant="caption" display="block">
        Mail Content
      </Typography>
      <textarea
        className={clsx(parentClasses.textArea, parentClasses.valueBox)}
        onChange={e => setMailObj({ content: e.target.value })}
        value={sendMailObj.content}
        placeholder="Enter mail context here..."
      />
    </div>
  );
}
