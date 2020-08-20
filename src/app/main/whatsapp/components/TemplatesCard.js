import React from "react";

//material
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";

function TemplateCard({ template, props }) {
  // function handleClick(item) {
  //   props.history.push(`/channelform/${channel.channel_hash}`);
  // }
  return (
    <Grid item>
      <Card
        elevation={1}
        className="flex flex-col w-192 cursor-pointer border-black border-black:hover grow:hover"
        // onClick={event => handleClick(channel)}
      >
        <div
          className="flex flex-shrink-0 items-center justify-between px-10 h-48"
          style={{
            background: "#1769aa", //blue
            color: "white",
          }}
        >
          <Typography className="font-medium " color="inherit">
            Whatsapp Template
          </Typography>
        </div>
        <div className="flex flex-shrink-0 items-center justify-between  text-blue-200 px-20 py-20 h-8">
          <Icon>color_lens</Icon>
        </div>
        <CardContent className="flex flex-col flex-auto justify-center">
          <Typography className="strong text-20 bold em font-400 p-2">{template.title}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default TemplateCard;
