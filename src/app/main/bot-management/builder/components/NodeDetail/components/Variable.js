// imports
import React from "react";
import clsx from "clsx";

//material
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

export default function QuestionText({ nodeData, parentClasses, text }) {
  const dispatch = useDispatch();

  const variable = nodeData.variable || "";

  const setVariable = function (val) {
    dispatch(Actions.setNodeProperties({ variable: val }));
  };

  const updteVariable = function (val = "") {
    if (val.charAt(0) !== "@") {
      val = `@${val}`;
    }
    setVariable(val);
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
        {text ? text : "Save answers in the variable"}
      </Typography>
      <TextField
        // disabled={nodeData.fix_variable}
        className={clsx("w-full", parentClasses.valueBox)}
        label="Variable"
        variant="outlined"
        value={variable}
        onChange={e => updteVariable(e.target.value)}
      />
    </div>
  );
}
