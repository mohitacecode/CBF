import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";

import _ from "@lodash";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
    cursor: "pointer",
  },
  itemText: {
    margin: 0,
  },
}));

export default function TrayItemWidget({ setTrayNode, onClickAddNode, model }) {
  const classes = useStyles();

  return (
    <ListItem
      draggable={true}
      onDragStart={event => {
        setTrayNode(event, _.clone(model));
      }}
      onClick={() => onClickAddNode(model)}
      className={classes.root}
    >
      <ListItemAvatar>
        <Avatar>
          <Icon>{model.icon}</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.itemText}
        primary={model.primaryText}
        secondary={model.secondaryText}
      />
    </ListItem>
  );
}
