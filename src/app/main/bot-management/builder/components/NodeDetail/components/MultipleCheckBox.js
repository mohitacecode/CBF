// imports
import React from "react";

//material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// redux
import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  choiceInput: {
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
  choiceInputAction: {
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

export default function MultipleCheckBox({ nodeData, parentClasses }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const choices = nodeData.choices;

  const setChoices = function (newChoices) {
    dispatch(Actions.setNodeProperties({ choices: newChoices }));
  };

  const updateChoices = function (val, i) {
      let newChoices = [...choices];
      newChoices[i] = val;
      setChoices(newChoices);
    },
    addOption = function () {
      let newChoices = [...choices, ""];
      setChoices(newChoices);
    },
    deleteChoices = function (i) {
      let newChoices = [...choices];
      newChoices.splice(i, 1);
      setChoices(newChoices);
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
        Add Multiple Options
      </Typography>
      <div className={parentClasses.elementBox}>
        <div>
          <div>
            {choices &&
              choices.map((text, i) => {
                return (
                  <div key={`m-${i}`} className="flex">
                    <input
                      placeholder="Click here to edit"
                      className={classes.choiceInput}
                      onChange={e => updateChoices(e.target.value, i)}
                      value={text}
                    />
                    <div className={classes.choiceInputAction}>
                      <IconButton
                        size="small"
                        disabled={choices.length === 1}
                        onClick={() => deleteChoices(i)}
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
            onClick={() => addOption()}
            className={classes.elementAddBtn}
            startIcon={<Icon>{"add"}</Icon>}
          >
            Add Option
          </Button>
        </div>
      </div>
    </div>
  );
}
