// imports
import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";

// material & fuse
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/actions/fuse/message.actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LanguageIcon from "@material-ui/icons/Language";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//redux
import { useDispatch } from "react-redux";

// services
import ChatManagementService from "app/services/chat-management";
import AdminOwnerService from "app/services/admin/owner/AdminOwnerService";

const useStyles = makeStyles(theme => ({
  contactListItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&.active": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  unreadBadge: {
    backgroundColor: "lightgreen",
    color: theme.palette.secondary.contrastText,
  },

  dropDown: {
    border: "2px solid black",
    borderRadius: "10px",
    padding: "0px",
  },
}));

function ContactListItem(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [operators, setOperators] = useState([]);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAssign = () => {
    let data = {
      room_name: props.contact.room_name,
      operator_id: operators[selectedIndex1].is_active
        ? operators[selectedIndex1].email
        : "null@null.com",
    };
    ChatManagementService.assignOperator({
      data,
    })
      .then(res => {
        dispatch(showMessage({ message: "Operator Assigned", variant: "success" }));
        setOpen(false);
      })
      .catch(err => {
        dispatch(showMessage({ message: "Failed To Assign Operator", variant: "error" }));
        setOpen(false);
      });
  };

  useEffect(
    e => {
      if (open) {
        setLoading(true);
        AdminOwnerService.getOperators().then(res => {
          setOperators([...res.data]);
          setLoading(false);
        });
      }
    },
    [open]
  );

  return (
    <ListItem
      selected={props.selectedIndex === props.contact.room_name}
      button
      className={clsx(classes.contactListItem, "px-16 py-12 min-h-92")}
    >
      {props.contact.bot_is_active ? (
        <Fragment>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            size="small"
            onClick={event => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <MoreVertIcon style={{ color: "gray" }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              style={{ width: "200px" }}
              onClick={() => {
                setAnchorEl(null);
                setOpen(true);
              }}
            >
              Assign Operator
            </MenuItem>
          </Menu>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{`Assign Operator to Room : "${props.contact.room_name}"`}</DialogTitle>
            <DialogContent>
              <List component="nav" aria-label="Device settings" className={classes.dropDown}>
                <ListItem
                  button
                  aria-haspopup="true"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  onClick={event => {
                    setAnchorEl2(event.currentTarget);
                  }}
                >
                  <ListItemText
                    primary={
                      <FuseLoading overlay={loading}>
                        {operators[selectedIndex1] && operators[selectedIndex1].is_active
                          ? `Operator ID: ${operators[selectedIndex1].id}, Name: ${operators[selectedIndex1].first_name} ${operators[selectedIndex1].last_name}`
                          : "No Operator Selected/Available"}
                      </FuseLoading>
                    }
                  />
                  <ArrowDropDownIcon style={{ color: "gray" }} />
                </ListItem>
              </List>

              <Menu
                id="lock-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={() => {
                  setAnchorEl2(null);
                }}
              >
                {operators.map((operator, index) =>
                  operator && operator.is_active ? (
                    <MenuItem
                      key={operator ? operator.id : index}
                      selected={index === selectedIndex1}
                      onClick={event => {
                        setSelectedIndex1(index);
                        setAnchorEl2(null);
                      }}
                    >
                      {operator
                        ? `Operator ID: ${operator.id}, Name: ${operator.first_name} ${operator.last_name}`
                        : null}
                    </MenuItem>
                  ) : null
                )}
              </Menu>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleAssign} variant="contained" color="primary">
                Assign
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      ) : null}
      <ListItemText
        classes={{
          root: "min-w-px px-16",
          secondary: "truncate",
        }}
        onClick={e => {
          props.callBack(props.contact);
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
            className={clsx(
              classes.unreadBadge,
              "flex items-center justify-center min-w-12 h-12 rounded-full text-14 text-center"
            )}
          ></div>
        ) : null}
      </div>
    </ListItem>
  );
}

export default ContactListItem;
