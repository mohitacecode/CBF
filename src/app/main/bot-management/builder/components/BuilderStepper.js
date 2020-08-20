import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "@fuse/hooks";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import StepConnector from "@material-ui/core/StepConnector";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepButton from "@material-ui/core/StepButton";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import * as Actions from "../store/actions";

const useStyles = makeStyles(theme => ({
  stepperButton: {
    padding: theme.spacing(1, 2),
  },
  stepper: {
    width: "100%",
  },
  inputRoot: {
    display: "flex",
    alignItems: "center",
    width: "300px",
  },
  input: {
    flex: 1,
  },
  backbutton: {
    padding: "10px 5px",
  },
}));

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  name: {},
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon fontSize="small" />,
    2: <GroupAddIcon fontSize="small" />,
    3: <VideoLabelIcon fontSize="small" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

export default function BuilderStepper({
  type,
  updateBuilderName,
  data,
  newComp,
  botTitle,
  setBotTitle,
}) {
  const dispatch = useDispatch();
  const [completed] = useState({});
  const [name, setName] = useState({ value: (data && data.title) || "", error: false });
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const history = useHistory();

  const handleStep = step => () => {
    dispatch(Actions.setActiveStep(step));
  };

  useEffect(() => {
    if (data && data.title) {
      setName({ ...name, value: data.title });
    }
    // eslint-disable-next-line
  }, [data]);

  const onBlur = useDebounce(e => {
    if (e.target.value === "") {
      setName({ ...name, error: true });
    } else {
      if (data.title !== e.target.value) {
        updateBuilderName(e.target.value);
      }
    }
  }, 150);

  const classes = useStyles();
  const steps = ["Build", "Design", "Publish"];
  const activeStep = useSelector(({ builder }) => builder.stepper.activeStep);

  const onBack = e => {
    if (newComp) {
      setDialogueOpen(true);
    } else {
      history.push("/botList");
    }
  };

  const handleClose = () => {
    setDialogueOpen(false);
  };

  return (
    <Fragment>
      <div>
        <IconButton aria-label="delete" onClick={onBack} className={classes.backbutton}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Dialog
          open={dialogueOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Unsaved Changes."}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              changes will be deleted if not saved, please make sure that you save changes before
              going back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogueOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleClose();
                history.push("/botList");
              }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.inputRoot}>
        <TextField
          onBlur={e => {
            e.persist();
            if (e.target.value !== data.title) {
              onBlur(e);
            }
          }}
          error={name.error}
          className={classes.input}
          value={botTitle}
          onChange={e => setBotTitle(e.target.value)}
        />
      </div>
      {type === "website" ? (
        <Stepper
          className={classes.stepper}
          nonLinear
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                className={classes.stepperButton}
                onClick={handleStep(index)}
                completed={completed[index]}
              >
                <StepLabel className={classes.label} StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Stepper
          className={classes.stepper}
          nonLinear
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          <Step key={"Builder"}>
            <StepButton
              className={classes.stepperButton}
              onClick={handleStep(0)}
              completed={completed[0]}
            >
              <StepLabel className={classes.label} StepIconComponent={ColorlibStepIcon}>
                {"Builder"}
              </StepLabel>
            </StepButton>
          </Step>
        </Stepper>
      )}
    </Fragment>
  );
}
