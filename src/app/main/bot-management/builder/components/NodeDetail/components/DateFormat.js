// imports
import React from "react";
import clsx from "clsx";

//material
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "100%",
  },
}));

export default function Date({ nodeData, parentClasses }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const dateFormat = nodeData.dateFormat;

  const setDateFormat = function (val) {
    dispatch(Actions.setNodeProperties({ dateFormat: val }));
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
        Date Format
      </Typography>
      <FormControl variant="outlined" className={clsx(classes.formControl, parentClasses.valueBox)}>
        <Select value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
          <MenuItem value={"DD-MM-YYYY"}>DD-MM-YYYY</MenuItem>
          <MenuItem value={"YYYY-MM-DD"}>YYYY-MM-DD</MenuItem>
          <MenuItem value={"DD/MM/YYYY"}>DD/MM/YYYY</MenuItem>
          <MenuItem value={"YYYY/MM/DD"}>YYYY/MM/DD</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
