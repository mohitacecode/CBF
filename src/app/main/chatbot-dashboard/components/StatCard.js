import React from "react";
import { Link } from "react-router-dom";
//material
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

function BotCard({ bot }) {
  console.log("hey botcard");
  return (
    <Grid item key={bot.id}>
      <Card elevation={4} className="flex flex-col w-192" variant="outlined">
        <Link to={bot.link}>
          <CardContent className="flex flex-col flex-auto items-center justify-center h-96">
            <Typography className="text-center text-48 font-200" id="title">
              {bot.role__count}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions className="text-center justify-center h-48">{bot.role}</CardActions>
        </Link>
      </Card>
    </Grid>
  );
}

export default BotCard;
