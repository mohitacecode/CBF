// imports
import React from "react";
import clsx from "clsx";

//material
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const checkValidURL = urlString => {
  const expression = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}?/gi;
  const regex = new RegExp(expression);
  if (urlString.match(regex)) {
    return true;
  }
  return false;
};

export default function Link({ nodeData, parentClasses }) {
  const dispatch = useDispatch();

  const urlMessage = nodeData.urlMessage;
  let isUrlValid = nodeData.isUrlValid;

  const onChange = function (e) {
    let urlString = e.target.value,
      isUrlValid = checkValidURL(urlString);
    dispatch(Actions.setNodeProperties({ urlMessage: urlString, isUrlValid: isUrlValid }));
  };

  return (
    <div>
      <Divider className={parentClasses.divider} />
      <Typography
        className={parentClasses.valHeading}
        variant="caption"
        display="block"
        gutterBottom
      >
        URL Link
      </Typography>
      <TextField
        error={!isUrlValid}
        label="URL"
        className={clsx("w-full", parentClasses.valueBox)}
        type="URL"
        onChange={onChange}
        value={urlMessage}
        placeholder="Enter Valid URL"
        variant="outlined"
        helperText={!isUrlValid ? "Enter Complete URL starting with https/http." : null}
      />
    </div>
  );
}
