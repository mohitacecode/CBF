import React from "react";
//material
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Design = React.memo(({ app }) => {
  const bgColor = "#80DAE2";
  return (
    <Grid container direction="row-reverse" justify="space-evenly" alignItems="center">
      <Card elevation={1} className="flex flex-col">
        <div
          className="flex flex-shrink-0 items-center justify-between px-10 h-48"
          style={{
            background: bgColor,
            color: "white",
          }}
        >
          <Icon> adb </Icon>
          <Typography className="font-medium truncate" color="inherit">
            ChatBot Appearance
          </Typography>

          <Tooltip title="Publish">
            <FormControlLabel control={<Switch size="small" label="" labelPlacement="start" />} />
          </Tooltip>
        </div>

        <CardContent className="flex flex-col flex-auto items-center justify-center">
          <Typography className="text-center text-16 font-400" id="title">
            Chatbot Appearance
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className="justify-center h-48">
          <Button to={`/botList`} className="justify-start px-32" color="primary">
            EDIT
          </Button>
        </CardActions>
      </Card>
      <Card elevation={1} className="flex flex-col">
        <div
          className="flex flex-shrink-0 items-center justify-between px-10 h-48"
          style={{
            background: bgColor,
            color: "white",
          }}
        >
          <Icon> adb </Icon>
          <Typography className="font-medium truncate" color="inherit">
            Chat Bot
          </Typography>

          <Tooltip title="Publish">
            <FormControlLabel control={<Switch size="small" label="" labelPlacement="start" />} />
          </Tooltip>
        </div>

        <CardContent className="flex flex-col flex-auto items-center justify-center">
          <Typography className="text-center text-16 font-400" id="title">
            Chatbot Appearance
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className="justify-center h-48">
          <Button to={`/botList`} className="justify-start px-32" color="primary">
            EDIT
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
});

export default Design;
