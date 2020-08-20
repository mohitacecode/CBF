import React, { useState } from "react";
import _ from "@lodash";
import clsx from "clsx";
import { Link } from "react-router-dom";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
//materials
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";

import ChannelCard from "./components/ChannelCard";

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 0%)`,
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
}));

function WhatsAppChannel(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  //redux
  const Channels = useSelector(({ Channels }) => {
    return Channels.channel_listReducer.data;
  });
  //local state

  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  React.useEffect(() => {
    if (isAuthenticate) dispatch(Actions.getChannelList());
    else props.history.push("/login");
  }, [dispatch, isAuthenticate, props.history]);
  React.useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0) {
        return Channels;
      }

      return _.filter(Channels, item => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    if (Channels) {
      setFilteredData(getFilteredArray());
    }
  }, [Channels, searchText]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div
        className={clsx(
          classes.header,
          "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-100"
        )}
      >
        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
          <Typography color="inherit" className="text-12 sm:text-20 font-light">
            WhatsApp Channels
          </Typography>
        </FuseAnimate>
        <Icon className={classes.headerIcon}> forum </Icon>
      </div>
      <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
        <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
          <TextField
            label="Search for WhatsApp Channel"
            placeholder="Enter a keyword..."
            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
            value={searchText}
            inputProps={{
              "aria-label": "Search",
            }}
            onChange={handleSearchText}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
            <Button
              component={Link}
              to="/channelform/new"
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary"
            >
              <span className="hidden sm:flex">Add New Channel</span>
              <span className="flex sm:hidden">New</span>
            </Button>
          </FormControl>
        </div>
        {filteredData && filteredData.length > 0 ? (
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn",
            }}
            className="flex flex-wrap py-24"
          >
            <Grid container spacing={2}>
              {filteredData.map((channel, i) => (
                <ChannelCard key={i} channel={channel} props={props} />
              ))}
            </Grid>
          </FuseAnimateGroup>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Typography color="textSecondary" className="text-24 my-24"></Typography>
            {Channels.length === 0 ? (
              <div className="text-24 my-24 text-grey">Add Channels...</div>
            ) : (
              <div className="text-24 my-24 text-grey">Loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default withReducer("Channels", reducer)(WhatsAppChannel);
