import React, { useEffect, useState, Fragment } from "react";
import _ from "@lodash";
import clsx from "clsx";

import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import Pagination from "@material-ui/lab/Pagination";

//materials
import {
  makeStyles,
  Grid,
  Button,
  FormControl,
  Icon,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Select,
  Box,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
//components
import BotCard from "./components/BotCard";
import TemplatesCreate from "./components/TemplateCreate";

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  headerIcon: {
    position: "absolute",
    top: -54,
    left: 0,
    opacity: 0.04,
    fontSize: 200,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
  divider: {
    margin: theme.spacing(2),
  },
  button: {
    width: "150px",
    height: "40px",
  },
}));

function AddButton({ handleOpenDialog }) {
  return (
    <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
      <Button
        className="whitespace-no-wrap normal-case"
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleOpenDialog}
      >
        <span className="hidden sm:flex">Add New ChatBot</span>
        <span className="flex sm:hidden">New</span>
      </Button>
    </FormControl>
  );
}

function BotList(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  //redux
  const Bots = useSelector(({ botList }) => {
    return botList.botlist;
  });
  const user = useSelector(({ auth }) => auth.user.user);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  //local state
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalpage] = useState(1);
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [botType, setBotType] = React.useState("all");

  useEffect(() => {
    if (isAuthenticate) {
      setLoading(true);
      dispatch(Actions.getBots()).then(() => {
        setLoading(false);
      });
    } else {
      props.history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0) {
        if (botType === "all") {
          return Bots.bots;
        } else {
          return _.filter(Bots.bots, item => {
            return item.chatbot_type === botType;
          });
        }
      }
      return _.filter(Bots.bots, item => {
        if (botType === "all") {
          return item.title.toLowerCase().includes(searchText.toLowerCase());
        } else {
          return (
            item.title.toLowerCase().includes(searchText.toLowerCase()) &&
            item.chatbot_type === botType
          );
        }
      });
    }
    if (Bots) {
      let arr = getFilteredArray();
      setTotalpage(Math.ceil(arr.length / 10));
      let start = 10 * (currentPage - 1);
      let end = 10 * currentPage;
      arr = arr.slice(start, end);
      setFilteredData(arr);
      if (currentPage == 0) {
        setCurrentPage(1);
      }
    }
  }, [Bots, searchText, botType, currentPage]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  const handleBotType = e => {
    setBotType(e.target.value);
  };
  const newBot = e => {
    let bot_type = e.currentTarget.value;
    let botNo = Bots.bots.length + 1;
    dispatch(Actions.addBot(`New Bot ${botNo}`, bot_type, props.history));
  };

  return (
    <Fragment>
      {user.role === "AO" ? (
        props.history.push("/mychat_area")
      ) : (
        <div className="flex flex-col flex-auto flex-shrink-0 w-full">
          <div
            className={clsx(
              classes.header,
              "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-100"
            )}
          >
            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
              <Typography color="inherit" className="text-12 sm:text-20 font-light">
                List of Bots
              </Typography>
            </FuseAnimate>
            <Icon className={classes.headerIcon}> adb </Icon>
          </div>
          {loading ? (
            <FuseLoading />
          ) : (
            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
              <Dialog
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="max-width-dialog-title"
                open={openDialog}
                onClose={handleCloseDialog}
              >
                <DialogTitle id="form-dialog-title">Choose Bot Type</DialogTitle>
                <DialogContent>
                  <DialogContentText>Create Bot from Scratch</DialogContentText>
                  <Grid container spacing={3}>
                    <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
                      <Grid item xs={12} md={3}>
                        <Button
                          onClick={newBot}
                          color="secondary"
                          variant="contained"
                          value="website"
                          className={classes.button}
                        >
                          <LanguageIcon /> Website
                        </Button>
                      </Grid>
                    </Box>
                    <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
                      <Grid item xs={12} md={3}>
                        <Button
                          onClick={newBot}
                          color="secondary"
                          variant="contained"
                          value="whatsapp"
                          className={classes.button}
                        >
                          <WhatsAppIcon /> Whatsapp
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>

                  <TemplatesCreate />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary" variant="contained">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
              {Bots.bots.length > 0 ? (
                <Fragment>
                  <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                    <TextField
                      label="Search for Bot Title"
                      placeholder="Enter a keyword..."
                      className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                      value={searchText}
                      inputProps={{
                        "aria-label": "Search",
                      }}
                      onChange={handleSearchText}
                      variant="outlined"
                    />
                    <FormControl
                      variant="outlined"
                      className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                    >
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
                    <AddButton handleOpenDialog={handleOpenDialog} />
                  </div>
                  {/* Pagination */}
                  <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                    <Pagination
                      count={totalPage}
                      color="primary"
                      page={currentPage > totalPage ? setCurrentPage(currentPage - 1) : currentPage}
                      onChange={(e, page) => {
                        setCurrentPage(page);
                      }}
                      hideNextButton={
                        currentPage === Math.ceil(Bots.bots.length / 5) ? true : false
                      }
                    />
                  </div>

                  <div style={{ marginLeft: "30px" }}>
                    {filteredData && filteredData.length > 0 ? (
                      <FuseAnimateGroup
                        enter={{
                          animation: "transition.slideUpBigIn",
                        }}
                        className="flex flex-wrap py-24"
                      >
                        <Grid container spacing={2}>
                          {filteredData.map((bot, i) => (
                            <BotCard key={i} bot={bot} />
                          ))}
                        </Grid>
                      </FuseAnimateGroup>
                    ) : (
                      <div className="flex flex-1 items-center justify-center">
                        <Typography color="textSecondary" className="text-24 my-24">
                          No such bots available on this page
                        </Typography>
                      </div>
                    )}
                  </div>
                </Fragment>
              ) : (
                <div>
                  <AddButton handleOpenDialog={handleOpenDialog} />
                  <div className="flex flex-1 items-center justify-center">
                    <Typography color="textSecondary" className="text-24 my-24">
                      No Bots Available
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}

export default withReducer("botList", reducer)(BotList);
