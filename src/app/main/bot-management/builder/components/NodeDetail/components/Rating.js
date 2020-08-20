// imports
import React, { useState, useEffect, Fragment } from "react";
import clsx from "clsx";

//material
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Box from "@material-ui/core/Box";

// redux
import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  formControl: {
    width: "100%",
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

export default function Date({ nodeData, parentClasses }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const rating_type = nodeData.rating_type;
  const [feedback_input, setFeedbackInput] = useState(nodeData.feedback_input);
  const [rating_max, setMaxRating] = useState(nodeData.rating_max);

  const setRatingFormat = function (val) {
    dispatch(Actions.setNodeProperties({ rating_type: val }));
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  useEffect(() => {
    console.log(feedback_input);
    dispatch(Actions.setNodeProperties({ feedback_input: feedback_input }));
    // eslint-disable-next-line
  }, [feedback_input]);

  return (
    <div>
      <Divider className={parentClasses.divider} />
      <Typography
        className={parentClasses.valHeading}
        variant="caption"
        display="block"
        gutterBottom
      >
        Rating Format
      </Typography>
      <FormControl variant="outlined" className={clsx(classes.formControl, parentClasses.valueBox)}>
        <Select value={rating_type} onChange={e => setRatingFormat(e.target.value)}>
          <MenuItem value={"emoji"}>
            <Box borderColor="transparent">
              <Rating
                name="customized-icons"
                defaultValue={3.5}
                getLabelText={value => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
            </Box>
          </MenuItem>
          <MenuItem value={"star_custom"}>
            <Box borderColor="transparent">
              <Rating
                name="customized-empty"
                defaultValue={4}
                precision={0.5}
                max={rating_max}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
      {rating_type === "star_custom" ? (
        <Fragment>
          <Divider className={parentClasses.divider} />
          <FormControl className={classes.formControl}>
            <TextField
              label="max rating value"
              className={clsx("w-full", parentClasses.valueBox)}
              type="number"
              onChange={e => {
                dispatch(Actions.setNodeProperties({ rating_max: Number(e.target.value) }));
                setMaxRating(Number(e.target.value));
              }}
              value={Number(rating_max)}
              placeholder="select max rating"
              variant="outlined"
              inputProps={{
                min: 1,
                max: 10,
              }}
            />
          </FormControl>
        </Fragment>
      ) : null}
      <Divider className={parentClasses.divider} />
      <FormControlLabel
        checked={feedback_input}
        onChange={e => {
          setFeedbackInput(!feedback_input);
        }}
        control={<Switch color="primary" />}
        label="Take Feedback from User"
        labelPlacement="start"
      />
    </div>
  );
}
