import React from "react";
import clsx from "clsx";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "./styles.css";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { TextFieldFormsy, SelectFormsy } from "@fuse/core/formsy";
//material-ui
import {
  Button,
  Icon,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Divider,
  Typography,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
//router
import { Link, useParams } from "react-router-dom";
//formsy
import Formsy from "formsy-react";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
// import { showMessage } from "app/store/actions/fuse";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputForm: {
    width: "300px",
  },
  phoneInput: {
    width: "450px",
    marginLeft: "20px",
  },
  group: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
  },
}));
function ChannelForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [phone, setPhone] = React.useState();
  const channelDetails = useSelector(({ Channels }) => Channels.channelReducer.data);
  const formRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const okStatus = useSelector(({ Channels }) => Channels.channelReducer.status);
  const botList = useSelector(({ Channels }) => Channels.channelReducer.botList);
  const theme = useTheme();
  const [isFormValid, setIsFormValid] = React.useState(false);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  React.useEffect(() => {
    if (isAuthenticate) {
      dispatch(Actions.getBotList());
      if (routeParams.channel_hash === undefined) dispatch(Actions.newChannel());
      else {
        dispatch(Actions.getChannel(routeParams.channel_hash));
        setPhone(channelDetails ? channelDetails.tester_number : 0);
      }
    } else props.history.push("/login");
    // eslint-disable-next-line
  }, []);

  function disableButton() {
    setIsFormValid(false);
    setPhone(channelDetails ? channelDetails.tester_number : 0);
  }

  function enableButton() {
    setIsFormValid(true);
    setPhone(channelDetails ? channelDetails.tester_number : 0);
  }
  const submitData = model => {
    if (model.title === undefined);
    else {
      const obj = {
        title: model.title,
        tester_number: phone.slice(1),
      };
      dispatch(Actions.createChannel(obj, props.history));
    }
  };

  const saveChanges = model => {
    dispatch(Actions.updateChannel(model, channelDetails.channel_hash));
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    deleteChannel();
  };
  const deleteChannel = () => {
    dispatch(Actions.deleteChannel(channelDetails.channel_hash, props.history));
  };

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-120 h-120 sm:h-136 sm:min-h-136",
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Typography
                className="normal-case flex items-center sm:mb-12"
                component={Link}
                role="button"
                to="/whatsappChannels"
                color="inherit"
              >
                <Icon className="text-20">
                  {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                </Icon>
                <span className="mx-4">WhatsApp Channels</span>
              </Typography>
            </FuseAnimate>

            <div className="flex items-center max-w-full">
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    {channelDetails
                      ? channelDetails.title !== ""
                        ? channelDetails.title
                        : "New WhatsApp Channel"
                      : "New WhatsApp Channel"}
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="caption">Channel Details</Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24">
          {
            <div>
              <Formsy
                id="formsy"
                onValidSubmit={submitData}
                ref={formRef}
                onValid={enableButton}
                onInvalid={disableButton}
              >
                <div className={classes.group}>
                  <TextFieldFormsy
                    className={classes.inputForm}
                    required
                    variant="outlined"
                    disabled={channelDetails !== null}
                    value={channelDetails ? channelDetails.title : ""}
                    name="title"
                    label="Channel Name"
                    id="channel_name"
                    autoComplete="current-channel_name"
                  />
                  <PhoneInput
                    placeholder="Select Country From Dropdown And Enter Phone Number"
                    className={classes.phoneInput}
                    name="wab_num"
                    disabled={channelDetails !== null}
                    error={
                      phone
                        ? isValidPhoneNumber(phone)
                          ? undefined
                          : "Invalid phone number"
                        : "Phone number required"
                    }
                    value={phone}
                    onChange={setPhone}
                    limitMaxLength={true}
                  />
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button
                      className="whitespace-no-wrap normal-case ml-24 mt-10 m-8"
                      variant="contained"
                      color="secondary"
                      onClick={model => submitData(model)}
                      form="formsy"
                      type="submit"
                      disabled={!isFormValid || routeParams.channel_hash !== undefined}
                    >
                      Confirm
                    </Button>
                  </FuseAnimate>
                </div>
              </Formsy>
              <Divider className="w-1280 justify-between text-grey" />
              <Typography style={{ marginTop: "10px" }} variant="h6" component="h5">
                Choose WhatsApp Bot For Automated Conversation
              </Typography>
              <Typography variant="caption" component="h6">
                Test how your bot responds on WhatsApp, with your number acting as client. After
                saving changes, your chosen bot will message you via our number. Please respond to
                the first message to activate the bot.
              </Typography>
              <Formsy style={{ marginTop: "10px" }} id="formsy2" onValidSubmit={saveChanges}>
                <FormControl
                  disabled
                  //disabled={okStatus !== 201 && channelDetails === null}
                  className={clsx(classes.formControl, "w-640")}
                >
                  <SelectFormsy
                    disabled={okStatus !== 201 && channelDetails === null}
                    labelId="whatsappbot"
                    id="whatsappbot"
                    label="Linked Bot"
                    name="whatsappbot"
                    variant="outlined"
                    value={channelDetails ? channelDetails.whatsappbot : ""}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {botList.map((bots, i) => (
                      <MenuItem key={i} value={bots.bot_hash}>
                        {bots.title}
                      </MenuItem>
                    ))}
                  </SelectFormsy>
                </FormControl>
                <Button
                  className="whitespace-no-wrap normal-case mt-20 ml-12 m-8"
                  variant="contained"
                  color="secondary"
                  disabled={okStatus !== 201 && channelDetails === null}
                  onClick={model => saveChanges(model)}
                  form="formsy2"
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={clsx(
                    classes.button,
                    "whitespace-no-wrap normal-case mt-20 ml-12 m-8 bg-red hover:bg-red-400"
                  )}
                  onClick={() => {
                    setOpen(true);
                  }}
                  startIcon={<DeleteIcon />}
                  disabled={channelDetails ? false : true}
                >
                  Delete
                </Button>
                <Dialog
                  aria-labelledby="confirmation-dialog-title"
                  open={open}
                  onClose={handleCancel}
                >
                  <DialogTitle id="confirmation-dialog-title">Delete Channel</DialogTitle>
                  <DialogContent>Do you want to delete this channel? </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary" variant="contained">
                      Cancel
                    </Button>
                    <Button onClick={handleOk} color="secondary" variant="contained">
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </Formsy>
            </div>
          }
        </div>
      }
    />
  );
}

export default withReducer("Channels", reducer)(ChannelForm);
