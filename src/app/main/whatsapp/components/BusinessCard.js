import React from "react";
import { Link } from "react-router-dom";
//icon
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import PhoneIcon from "@material-ui/icons/Phone";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
//material
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core/";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";
//material-colors
import { green, red, blue } from "@material-ui/core/colors";

function BusinessCard({ Account, props }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  function handleClick() {
    props.history.push(`/detailsform/${Account.wab_hash}`);
  }
  function handleClickDelete() {
    dispatch(Actions.deleteAccount(Account.project_id, Account.wab_hash));
  }
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
    handleClickDelete();
  };
  return (
    <Grid item>
      <Card elevation={1} className="flex flex-col w-192">
        <div
          className="flex flex-shrink-0 items-center justify-between px-10 h-48"
          style={{
            background: "#1769aa", //blue
            color: "white",
          }}
        >
          <Typography className="font-medium " color="inherit">
            {Account.published ? (
              <CheckIcon style={{ color: green[400], marginRight: "5px" }} />
            ) : (
              <CancelIcon style={{ color: red[400], marginRight: "5px" }} />
            )}
            Business Card
          </Typography>
          <IconButton onClick={handleClick} value="edit">
            <EditIcon style={{ color: green[400] }} />
          </IconButton>
        </div>
        <Divider />
        <CardContent className="flex flex-col flex-auto items-center justify-center">
          <Typography
            className="text-center text-16 font-400"
            style={{ width: "150px" }}
            id="title"
            noWrap={true}
          >
            {Account.title}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent className="flex flex-col flex-auto items-center justify-center">
          {Account.whatsappbot_name ? (
            <Grid container spacing={5} direction="row" alignItems="center">
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ width: "80px" }}
                  id="title"
                  noWrap={true}
                >
                  {Account.whatsappbot_name}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Button
                  to={`/Businessform/${Account.wab_hash}`}
                  component={Link}
                  size="small"
                  color="secondary"
                  variant="contained"
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button
              to={`/Businessform/${Account.wab_hash}`}
              component={Link}
              size="small"
              color="secondary"
              variant="contained"
              disabled={!Account.approved}
            >
              Assign
            </Button>
          )}
        </CardContent>
        <Divider />
        <div className="flex flex-shrink-0 items-center justify-between px-10 h-25">
          <PhoneIcon style={{ color: blue[400], marginRight: "5px" }} />
          <Typography
            className="text-center text-11 font-400"
            style={{ width: "150px" }}
            noWrap={true}
          >
            +{Account.wab_num}
          </Typography>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
              value="Delete"
            >
              <DeleteIcon style={{ color: red[400] }}></DeleteIcon>
            </IconButton>
          </Tooltip>
        </div>
        <Dialog aria-labelledby="confirmation-dialog-title" open={open} onClose={handleCancel}>
          <DialogTitle id="confirmation-dialog-title">Delete Account</DialogTitle>
          <DialogContent>Do you want to delete this account? </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleOk} color="secondary" variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>{" "}
      </Card>
    </Grid>
  );
}

export default BusinessCard;
