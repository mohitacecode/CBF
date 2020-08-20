// imports
import React from "react";
import clsx from "clsx";
import moment from "moment";

// material & fuse
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LanguageIcon from "@material-ui/icons/Language";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const useStyles = makeStyles(theme => ({
  contactListItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&.active": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  unreadBadge: {
    color: theme.palette.secondary.contrastText,
  },
}));

function ContactListItem(props) {
  const classes = useStyles(props);
  console.log("statsus", props.status);

  const statusColors = {
    unassgined: "red",
    pending: "yellow",
    resolve: "lightgreen",
    disconnected: "gray",
  };

  return (
    <ListItem
      selected={props.selectedIndex === props.contact.room_name}
      button
      className={clsx(classes.contactListItem, "px-16 py-12 min-h-92")}
      onClick={e => {
        props.callBack(props.contact);
      }}
    >
      <ListItemText
        classes={{
          root: "min-w-px px-16",
          secondary: "truncate",
        }}
        primary={
          <Typography variant="subtitle1">
            {props.type === "whatsapp" ? (
              <WhatsAppIcon style={{ marginRight: "5px", color: "green" }} />
            ) : (
              <LanguageIcon style={{ marginRight: "5px", color: "#2196F3" }} />
            )}
            {`Room Name - '${props.contact.room_name}'`}
          </Typography>
        }
      />

      <div className="flex flex-col justify-center items-end">
        <Typography className="whitespace-no-wrap mb-8" variant="caption">
          {moment(props.time).format("ll")}
        </Typography>
        {props.contact.bot_is_active ? (
          <div
            style={{ backgroundColor: statusColors[props.status] }}
            className={clsx(
              classes.unreadBadge,
              "flex items-center justify-center min-w-12 min-h-12 rounded-full text-14 text-center"
            )}
          ></div>
        ) : null}
      </div>
    </ListItem>
  );
}

export default ContactListItem;
