// imports
import React from "react";
import clsx from "clsx";

//material
import Typography from "@material-ui/core/Typography";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

export default function QuestionText({ nodeData, parentClasses }) {
  const dispatch = useDispatch();
  const questionText = nodeData.questionText;

  const setQuestionText = function (val) {
    dispatch(Actions.setNodeProperties({ questionText: val }));
  };

  return (
    <div>
      <Typography
        className={parentClasses.valHeading}
        variant="caption"
        display="block"
        gutterBottom
      >
        Question text
      </Typography>
      <textarea
        className={clsx(parentClasses.textArea, parentClasses.valueBox)}
        onChange={e => setQuestionText(e.target.value)}
        value={questionText}
        placeholder="Enter your question"
      />
    </div>
  );
}
