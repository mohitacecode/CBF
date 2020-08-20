import React, { Fragment } from "react";
import clsx from "clsx";

// Material & fuse
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";
// services
import BotDetailService from "app/services/bot/BotDetailService";

import { useDispatch } from "react-redux";
import { showMessage } from "app/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    width: "100%",
    flexGrow: 1,
    overflowY: "scroll",
  },
  cont: {
    overflowY: "scroll",
  },
  paper: {
    padding: "10px",
  },
  colorGrid: {
    color: "white",
    cursor: "pointer",
    width: "110px",
    marginLeft: "20px",
    borderRadius: "200px",
  },
  colordef: {
    background: theme.palette.primary.main,
  },
  color1: {
    background: theme.theme1.background,
  },
  color2: {
    background: theme.theme2.background,
  },
  input: {
    marginLeft: "10px",
  },
  input2: {
    marginLeft: "50px",
  },
  divider: {
    margin: theme.spacing(2),
  },
  dividerIn: {
    margin: theme.spacing(0, 2),
  },
}));

export default function EditPanel({ botID, design, setDesign, setBotOnline, botOnline }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRadioChange = event => {
    setDesign({ ...design, widget_position: event.target.value });
  };

  const handleColRadioChange = event => {
    setDesign({ ...design, theme: event.target.value });
  };

  const handlePrevRadioChange = val => {
    setDesign({ ...design, defaultOpen: val });
  };

  const handleLabelChange = val => {
    setDesign({ ...design, button_label: val });
  };

  const changeIP = e => {
    setDesign({
      ...design,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = e => {
    BotDetailService.saveBotDesign({ pathParam: { id: botID }, data: { ...design } }).then(
      response => {
        setDesign({ ...response.data });
        dispatch(
          showMessage({
            message: "Builder Config Updated Successfully",
            variant: "success",
          })
        );
      }
    );
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography component="span" variant="h5">
          Chat Widget Config
        </Typography>
        <Button variant="contained" color="primary" onClick={saveData} style={{ float: "right" }}>
          Apply
        </Button>
        <Divider className={classes.divider} />
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              onChange={changeIP}
              name="chatboxname"
              label="Chat Box Name"
              value={design.chatboxname}
              placeholder={"Title"}
              variant="outlined"
              fullWidth={true}
              className={classes.input}
            />
          </Grid>
          <Divider className={classes.dividerIn} />
          <Grid item xs={12}>
            <RadioGroup
              row
              name="color"
              defaultValue="defaultTheme"
              value={design.theme}
              onChange={handleColRadioChange}
            >
              <FormControlLabel
                value="defaultTheme"
                className={clsx(classes.colorGrid, classes.colordef)}
                control={<Radio color="secondary" />}
                label="default"
                labelPlacement="start"
              />
              <FormControlLabel
                value="theme1"
                className={clsx(classes.colorGrid, classes.color1)}
                control={<Radio color="primary" />}
                label="Theme1"
                labelPlacement="start"
              />
              <FormControlLabel
                value="theme2"
                className={clsx(classes.colorGrid, classes.color2)}
                control={<Radio color="primary" />}
                label="Theme2"
                labelPlacement="start"
              />
            </RadioGroup>
          </Grid>
          <Divider className={classes.dividerIn} />
          <Grid item>
            <FormControlLabel
              label="Open Chatbox by Default"
              labelPlacement="start"
              control={
                <Switch
                  checked={design.defaultOpen}
                  onChange={() => handlePrevRadioChange(!design.defaultOpen)}
                  color="primary"
                />
              }
            />
          </Grid>
          <Divider className={classes.dividerIn} />
          <Grid item>
            <FormControlLabel
              label="Widget live Status (For testing)"
              labelPlacement="start"
              control={
                <Switch
                  checked={botOnline}
                  onChange={() => setBotOnline(!botOnline)}
                  color="primary"
                />
              }
            />
          </Grid>
          <Divider className={classes.dividerIn} />
          {botOnline ? (
            <Grid item xs={12}>
              <TextField
                onChange={changeIP}
                name="online_status"
                value={design.online_status}
                placeholder={"We Reply Immediately"}
                variant="outlined"
                label="Online Status"
                fullWidth={true}
                className={classes.input}
              />
            </Grid>
          ) : (
            <Fragment>
              <Grid item>
                <TextField
                  onChange={changeIP}
                  name="offline_status"
                  value={design.offline_status}
                  placeholder={"We Reply within a Day"}
                  variant="outlined"
                  label="Offline Status"
                  fullWidth={true}
                  className={classes.input}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  onChange={changeIP}
                  name="offline_msg"
                  value={design.offline_msg}
                  placeholder={"we're currently unavailable"}
                  variant="outlined"
                  label="Offline Message"
                  fullWidth={true}
                  className={classes.input}
                />
              </Grid>
            </Fragment>
          )}
          <Divider className={classes.dividerIn} />
          <Grid item xs={12}>
            <RadioGroup
              row
              defaultValue="top"
              value={design.widget_position}
              onChange={handleRadioChange}
            >
              <FormControl component="fieldset">
                <FormLabel>Placement</FormLabel>
                <FormControlLabel
                  value="L"
                  control={<Radio color="primary" />}
                  label="Left"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="R"
                  control={<Radio color="primary" />}
                  label="Right"
                  labelPlacement="start"
                />
              </FormControl>
            </RadioGroup>
          </Grid>
          <Divider className={classes.dividerIn} />
          <Grid item xs={12}>
            <FormControlLabel
              label="Widget Label"
              labelPlacement="start"
              control={
                <Switch
                  checked={design.button_label}
                  onChange={() => handleLabelChange(!design.button_label)}
                  color="primary"
                />
              }
            />
            {design.button_label ? (
              <TextField
                value={design.label_text}
                onChange={changeIP}
                name="label_text"
                placeholder={"Widget Label"}
                variant="outlined"
                fullWidth={true}
                className={classes.input}
              />
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
