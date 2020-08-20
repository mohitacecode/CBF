// imports
import React, { useState } from "react";

//material
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

export default function QuestionText({ nodeData, parentClasses, text }) {
  const dispatch = useDispatch();
  const [isLeadField, setisLeadField] = useState(nodeData.isLeadField || false);

  const handleChange = bool => {
    setisLeadField(bool);
    dispatch(Actions.setNodeProperties({ isLeadField: bool }));
  };

  return (
    <div>
      <Divider className={parentClasses.divider} />
      <div className="flex justify-between items-center">
        <Typography variant="body1">This field is a lead</Typography>
        <Switch
          checked={isLeadField}
          onChange={() => handleChange(!isLeadField)}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </div>
  );
}
