import React from "react";
import { Link } from "react-router-dom";

//material
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  //	Switch,
  //	FormControlLabel,
  Typography,
  Button,
  Divider,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import LanguageIcon from "@material-ui/icons/Language";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { green, red } from "@material-ui/core/colors";
//redux
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";

function BotCard({ bot }) {
  const dispatch = useDispatch();
  //Local State
  const [open, setOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");

  // const toggleChecked = (event, bot) => {
  // 	event.preventDefault();
  // 	const data = {
  // 		id: bot.bot_hash,
  // 		title: bot.title,
  // 		publish_status: event.target.checked
  // 	};
  // 	dispatch(Actions.updateBotDetails(bot.bot_hash, { ...data }));
  // };

  const duplicateBot = () => {
    dispatch(Actions.duplicateBot(bot.bot_hash));
  };

  const deleteBot = () => {
    dispatch(Actions.deleteBot(bot.bot_hash));
  };

  const handleClickOpen = e => {
    setActionType(e.currentTarget.value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickedButton = () => {
    handleClose();
    actionType === "Duplicate" ? duplicateBot() : deleteBot();
  };

  return (
    <Grid item>
      <Card elevation={1} className="flex flex-col w-192">
        <div
          className="flex flex-shrink-0 items-center justify-between px-10 h-48"
          style={{
            background: bot.publish_status
              ? "#069740" //green
              : "#1769aa", //blue
            color: "white",
          }}
        >
          <Typography className="font-medium truncate" color="inherit">
            {bot.chatbot_type === "website" ? (
              <LanguageIcon style={{ marginRight: "5px" }} />
            ) : (
              <WhatsAppIcon style={{ marginRight: "5px" }} />
            )}
            Chat Bot
          </Typography>
          {/* <Tooltip title="Publish">
						<FormControlLabel control={<Switch size="small" checked={bot.publish_status} onChange={(e) => toggleChecked(e, bot)} />} />
					</Tooltip> */}
        </div>

        <Tooltip title={bot.title}>
          <CardContent className="flex flex-col flex-auto items-center justify-center">
            <Typography
              className="text-center text-16 font-400"
              style={{ width: "150px" }}
              id="title"
              noWrap={true}
            >
              {bot.title}
            </Typography>
          </CardContent>
        </Tooltip>
        <Divider />
        <CardContent className="flex flex-col flex-auto items-center justify-center">
          <Typography className="text-center text-16 font-400" id="title">
            Chat Count - {bot.count_chat}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className="justify-center h-48">
          <Grid container spacing={5} direction="row" alignItems="center">
            <Grid item xs={4}>
              <Button
                to={`/builder/${bot.bot_hash}`}
                component={Link}
                className="justify-start px-16"
                color="primary"
              >
                EDIT
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title="Duplicate">
                <IconButton onClick={handleClickOpen} value="Duplicate">
                  <FileCopyIcon style={{ color: green[400] }}></FileCopyIcon>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title="Delete">
                <IconButton onClick={handleClickOpen} value="Delete">
                  <DeleteIcon style={{ color: red[400] }}></DeleteIcon>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                The action can not be undone after confirmation.
              </DialogContentText>

              {bot.chatbot_type === "whatsapp" && actionType === "Delete" ? (
                <DialogContentText>
                  There can be whatsapp channels linked with this bot.
                </DialogContentText>
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClickedButton} variant="contained" color="secondary">
                Confirm
              </Button>
              <Button onClick={handleClose} variant="contained" color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default BotCard;
