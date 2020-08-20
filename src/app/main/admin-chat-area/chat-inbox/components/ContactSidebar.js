// import
import React from "react";
import _ from "@lodash";

// material & fuse
import FuseLoading from "@fuse/core/FuseLoading";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// redux
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

function ContactSidebar({ close, variables, loading }) {
  const classes = useStyles();
  // redux state
  const contact = useSelector(({ chat }) => chat.contact);
  // local state

  return (
    <FuseLoading overlay={loading}>
      <div className="flex flex-col flex-auto h-full">
        <AppBar position="static" color="primary" elevation={1}>
          <Toolbar className="flex justify-between items-center px-4">
            <Typography className="px-12" color="inherit" variant="subtitle1">
              Room Info
            </Typography>
            <IconButton onClick={close} color="inherit">
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>

          <Toolbar className="flex flex-col justify-center items-center p-24">
            <Typography color="secondary" variant="caption">
              Room Name
            </Typography>
            <Typography color="inherit" variant="h6">
              {contact !== undefined ? contact.room_name : "Room Name"}
            </Typography>
          </Toolbar>
        </AppBar>

        <List className={classes.list} subheader={<li />}>
          <li className={classes.listSection}>
            <ul className={classes.ul}>
              {variables && _.size(variables) !== 0 ? (
                <React.Fragment>
                  <ListSubheader>Variables</ListSubheader>
                  {Object.entries(variables).map((variable, index) => (
                    <ListItem key={"var" + index}>
                      <ListItemText primary={variable[0]} secondary={variable[1] || "..."} />
                    </ListItem>
                  ))}
                </React.Fragment>
              ) : null}
            </ul>

            <ul className={classes.ul}>
              {variables && _.size(variables) === 0 ? (
                <ListSubheader>No Data Available</ListSubheader>
              ) : null}
            </ul>
          </li>
        </List>
      </div>
    </FuseLoading>
  );
}

export default ContactSidebar;
