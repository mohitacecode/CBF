import React, { useState, useEffect } from "react";

// Material & fuse
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import BotDetailService from "app/services/bot/BotDetailService";

import { useDispatch } from "react-redux";
import { showMessage } from "app/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    maxWidth: "70%",
    margin: "20px",
    flexGrow: 1,
    overflowY: "scroll",
  },
  codeBlock: {
    padding: theme.spacing(2),
    margin: `${theme.spacing(2)}px 0px`,
    background: theme.palette.primary.main,
    color: "white",
    borderRadius: "5px",
    "&>.comment": {
      color: "gray",
      display: "block",
      marginBottom: theme.spacing(2),
    },
  },
  input: {
    marginLeft: "10px",
    width: "50% ",
  },
}));

export default function Publish({ botID, updateBuilderData, nodeDetail = {} }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [website, setWebsite] = useState(nodeDetail.website_url || "");
  let publish_status = nodeDetail.publish_status;

  useEffect(() => {
    if (nodeDetail) {
      setWebsite(nodeDetail.website_url);
    }
  }, [nodeDetail]);

  const onPublish = function () {
    if (publish_status) {
      BotDetailService.updateBotDetails({
        data: { publish_status: false, website_url: "" },
        pathParam: { id: botID },
      }).then(response => {
        dispatch(
          showMessage({
            message: "Builder Un-Published Successfully",
            variant: "success",
          })
        );
        updateBuilderData(response.data);
      });
    } else {
      BotDetailService.publishBot({
        pathParam: {
          id: botID,
        },
        data: { website_url: website.replace(/\/$/, "") },
      })
        .then(response => {
          if (response && response.data) {
            dispatch(
              showMessage({
                message: "Builder Published Successfully",
                variant: "success",
              })
            );
            let data = { ...response.data, publish_status: true };
            updateBuilderData(data);
          }
        })
        .catch(err => {
          let error = JSON.parse(err.request.response);
          dispatch(
            showMessage({
              message: error.website_url[0],
              variant: "error",
            })
          );
        });
    }
  };
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography component="span" variant="h5">
          Chat Widget Config
        </Typography>
        <TextField
          name="chatboxname"
          placeholder="Website URL"
          variant="outlined"
          size="small"
          value={website}
          disabled={publish_status}
          onChange={e => setWebsite(e.target.value)}
          className={classes.input}
        />
        <Button
          variant="contained"
          color={publish_status === true ? "primary" : "secondary"}
          style={{ marginLeft: "20px" }}
          onClick={() => {
            onPublish();
          }}
        >
          {publish_status === true ? "Unpublish" : "Publish"}
        </Button>
        {publish_status && nodeDetail.js_file_path ? (
          <div className={classes.codeBlock}>
            <span className="comment">{`/* include below script tag at the end of your html body */`}</span>
            <span>{`<script src="${nodeDetail.js_file_path}"></script>`}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
