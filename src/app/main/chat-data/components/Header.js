import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import _ from "@lodash";
//materialui
import {
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  Input,
  Checkbox,
  ListItemText,
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core";
//Icons
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import FilterListIcon from "@material-ui/icons/FilterList";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import CloseIcon from "@material-ui/icons/Close";
import MailIcon from "@material-ui/icons/Mail";
//redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import * as Actions1 from "../../../auth/store/actions";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { showMessage } from "app/store/actions/fuse";
import FuseAnimate from "@fuse/core/FuseAnimate";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    maxWidth: "150px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Header({ botList }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //GOOGLE
  const SCOPE = "https://www.googleapis.com/auth/drive";
  const discoveryUrl = "https://sheets.googleapis.com/$discovery/rest?version=v4";
  const apiKey = "AIzaSyBamh8u-GDkaeQ6iePibBm76c_ynnLMeUI";
  const clientId = "549349963834-eiqj670r4lvn8p8p4rn34omlncc8b4a4.apps.googleusercontent.com";
  let GoogleAuth;

  //Global Store
  const activeBot = useSelector(({ chatdata }) => chatdata.botList.active);
  const headers = useSelector(({ chatdata }) => chatdata.chatdata.checkBoxHeaders);

  const email = useSelector(({ auth }) => auth.user.user.email);
  const choosenEmail = useSelector(({ auth }) => auth.user.user.google_granted_acc);
  //Local State

  const [disabled1, setDisabled1] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [google, setGoogle] = React.useState({});
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [botType, setBotType] = React.useState("all");
  const [selected, setSelected] = useState(["Room Name", "Email", "Date", "Phone"]);
  const [filteredHeader, setFilteredHeader] = useState(null);
  const cols = headers.map(item => item.title);
  const [selectedBot, setSelectedBot] = React.useState(activeBot);
  const [disabled, setDisabled] = React.useState(false);

  const handleChange = event => {
    setSelected(event.target.value);
  };
  const handleFromDateChange = date => {
    date = date.toISOString().slice(0, 10);
    setSelectedFromDate(date);
  };
  const handleToDateChange = date => {
    date = date.toISOString().slice(0, 10);
    setSelectedToDate(date);
  };
  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };
  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };
  const handleBotType = e => {
    setBotType(e.target.value);
  };

  const handleBotChange = event => {
    setSelectedBot(event.target.value);
  };

  const handleOpen = e => {
    setOpen(true);
  };

  const handleOpenFilter = e => {
    setOpenFilter(true);
  };

  const handleClose = e => {
    setOpen(false);
  };
  const handleCloseFilter = e => {
    setOpenFilter(false);
  };
  const handleSave = e => {
    if (
      activeBot === selectedBot &&
      botType === "all" &&
      selectedFromDate === null &&
      selectedToDate === null
    ) {
      dispatch(Actions.getData(activeBot));
    } else {
      dispatch(Actions.setActiveBot(selectedBot));
    }
    setOpenFilter(false);
    if (selectedFromDate === null && selectedToDate !== null) {
      let date = new Date("2000-01-01").toISOString().slice(0, 10);
      dispatch(Actions.dateFilter(activeBot, date, selectedToDate));
    } else {
      if (selectedFromDate !== null) {
        dispatch(Actions.dateFilter(activeBot, selectedFromDate, selectedToDate));
      }
    }
  };

  const handleReset = e => {
    if (botType !== "all") {
      setBotType("all");
    } else {
      setSelectedBot(filteredHeader[0].value);
    }
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };

  const handleDownload = () => {
    dispatch(Actions.exportData(activeBot));
  };

  const handleEmail = () => {
    setDisabled(true);
    dispatch(Actions.sendEmail(activeBot)).then(() => {
      setDisabled(false);
    });
  };

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    gapi.client
      .init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: [discoveryUrl],
        scope: SCOPE,
        login_hint: choosenEmail,
      })
      .then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        setGoogle(GoogleAuth);
        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setUser(user);
        setSigninStatus();
      });
  };
  const handleAuthClick = () => {
    console.log(user);
    setDisabled1(true);
    if (choosenEmail === null) {
      google.signIn().then(() => {
        dispatch(Actions1.setEmail(email, user.Qt.zu));

        dispatch(Actions.googleSheets(user.uc.access_token, activeBot)).then(setDisabled1(false));
        window.location.reload();
      });
    } else {
      google.signIn().then(() => {
        if (user.Qt.zu !== choosenEmail) {
          dispatch(
            showMessage({ message: "Please choose the associated email", variant: "error" })
          );
          setDisabled1(false);
        } else {
          dispatch(Actions.googleSheets(user.uc.access_token, activeBot)).then(setDisabled1(false));
        }
      });
    }
  };

  // const revokeAccess = () => {
  //   GoogleAuth.disconnect();
  // };

  const setSigninStatus = isSignedIn => {
    // var user = GoogleAuth.currentUser.get();
    // var isAuthorized = user.hasGrantedScopes(SCOPE);
  };

  function updateSigninStatus(isSignedIn) {
    setSigninStatus();
  }

  useEffect(() => {
    function getFilteredArray() {
      if (botType === "all") {
        return botList;
      } else {
        return _.filter(botList, item => {
          return item.label.chatbot_type === botType;
        });
      }
    }
    if (botList) {
      const array = getFilteredArray();
      if (array && array.length) {
        setSelectedBot(array[0].value);
      }
      setFilteredHeader(array);
    }
    // eslint-disable-next-line
  }, [botType, botList]);

  useEffect(() => {
    const updatedCols = headers.filter(item => {
      return selected.indexOf(item.title) !== -1;
    });
    dispatch(Actions.setColHeaders(updatedCols));
    // eslint-disable-next-line
  }, [selected && headers.length > 0, selected, activeBot && headers]);

  useEffect(() => {
    handleClientLoad();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex items-center justify-end">
      <FormControl variant="outlined" className={classes.formControl}>
        <Button
          id="update_sheet"
          onClick={handleAuthClick}
          variant="contained"
          color="secondary"
          name="update_sheet"
          disabled={
            Object.keys(google).length === 0 || !botList.length || disabled1 || !headers.length
              ? true
              : false
          }
        >
          {/* Google Sheet*/}
          <FuseAnimate animation="transition.expandIn">
            <img
              alt="google-logo"
              className="w-24 mb-2"
              src="https://img.icons8.com/color/48/000000/google-logo.png"
            />
          </FuseAnimate>
          Sheets
        </Button>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <Button
          disabled={!headers.length || disabled}
          id="filter"
          onClick={handleEmail}
          variant="contained"
          color="secondary"
        >
          Send Email <MailIcon />
        </Button>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <Button
          disabled={!headers.length}
          id="filter"
          onClick={handleDownload}
          variant="contained"
          color="secondary"
        >
          Download <SystemUpdateAltIcon />
        </Button>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <Button
          disabled={!activeBot}
          id="filter"
          onClick={handleOpenFilter}
          variant="contained"
          color="secondary"
        >
          <FilterListIcon />
        </Button>
        <Dialog open={openFilter} onClose={handleCloseFilter} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <IconButton onClick={handleCloseFilter}>
              <CloseIcon />
            </IconButton>
            <Box>Filters</Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="button" display="block" gutterBottom>
                      Bots :
                    </Typography>
                    {filteredHeader && filteredHeader.length > 0 ? (
                      <Select
                        disabled={!activeBot}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedBot}
                        native={false}
                        onChange={handleBotChange}
                      >
                        {filteredHeader && filteredHeader.length > 0
                          ? filteredHeader.map((item, i) => {
                              return (
                                <MenuItem key={i} value={item.value}>
                                  {item.label.title}
                                </MenuItem>
                              );
                            })
                          : null}
                      </Select>
                    ) : (
                      <Typography variant="overline" display="block" gutterBottom>
                        No bots available
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Box>
              <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="button" display="block" gutterBottom>
                      Bot Type :
                    </Typography>

                    <Select
                      labelId="controlled-open-select-label"
                      id="bot_type"
                      open={openDropdown}
                      onClose={handleCloseDropdown}
                      onOpen={handleOpenDropdown}
                      value={botType}
                      onChange={handleBotType}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="website">Website</MenuItem>
                      <MenuItem value="whatsapp">WhatsApp</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Box>
              <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="button" display="block" gutterBottom>
                      From :
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        maxDate={selectedToDate ? selectedToDate : new Date()}
                        margin="normal"
                        id="from_date"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedFromDate}
                        maxwidth="100px"
                        onChange={handleFromDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
              </Box>
              <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Typography variant="button" display="block" gutterBottom>
                      To :
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        minDate={selectedFromDate}
                        maxDate={new Date()}
                        margin="normal"
                        id="to_date"
                        label="Date"
                        format="MM/dd/yyyy"
                        value={selectedToDate}
                        onChange={handleToDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </Grid>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReset} color="secondary">
              Reset
            </Button>
            <Button
              onClick={handleSave}
              color="secondary"
              disabled={filteredHeader && filteredHeader.length === 0}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </FormControl>
      <FormControl>
        <Button
          disabled={!headers.length}
          id="openMenu"
          onClick={handleOpen}
          variant="contained"
          color="secondary"
        >
          <ViewColumnIcon />
        </Button>
        <Select
          multiple
          id="col_select"
          value={selected}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          style={{ display: "none" }}
          open={open}
          onClose={handleClose}
          MenuProps={{
            anchorEl: document.getElementById("openMenu"),
            style: { marginTop: 60 },
          }}
        >
          {cols.map((name, index) => (
            <MenuItem key={name + index} value={name}>
              <Checkbox checked={selected.indexOf(name) !== -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
