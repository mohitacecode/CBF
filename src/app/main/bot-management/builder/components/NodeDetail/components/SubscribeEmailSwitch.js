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
  const [isSubscribedToEmail, setIsSubscribedToEmail] = useState(nodeData.subscribeEmail || false);

  const handleChange = bool => {
    setIsSubscribedToEmail(bool);
    dispatch(Actions.setNodeProperties({ subscribeEmail: bool }));
  };

  return (
    <div>
      <Divider className={parentClasses.divider} />
      <div className="flex justify-between items-center">
        <Typography variant="body1">Subscribe to email</Typography>
        <Switch
          checked={isSubscribedToEmail}
          onChange={() => handleChange(!isSubscribedToEmail)}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </div>
  );
}
