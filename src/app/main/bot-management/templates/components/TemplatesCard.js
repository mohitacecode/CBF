import React from "react";
//material-ui
import {
  makeStyles,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,
  Card,
} from "@material-ui/core";
//redux
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));
function TemplatesCard(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  let history = useHistory();
  const createBot = () => {
    dispatch(Actions.createBot(props.template.bot_hash, history));
  };
  return (
    <Grid item>
      <Card elevation={3} className={classes.root}>
        <CardMedia className={classes.media} image={props.template.image} title="Template Image" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ width: "190px" }}
            noWrap={true}
          >
            {props.template.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Chatbot Type : {props.template.chatbot_type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" variant="contained" onClick={createBot}>
            Create
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TemplatesCard;
