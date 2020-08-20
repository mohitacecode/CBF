import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import clsx from "clsx";

//material && fuse
import FuseLoading from "@fuse/core/FuseLoading";
import { makeStyles } from "@material-ui/core/styles";
import { showMessage } from "app/store/actions/fuse";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import { Button, DialogContent, DialogTitle, Dialog, DialogActions } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// redux
import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

// services
import BotDetailService from "app/services/bot/BotDetailService";

const useStyles = makeStyles(theme => ({
  dropzone: {
    padding: "20px",
    border: "3px dashed #eeeeee",
    backgroundColor: "#ccccb3",
    color: "black",
  },
  imgParent: {
    position: "relative",
  },
  center: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  uploadContainer: {
    width: "100%",
    background: "#e2e2e2",
    display: "flex",
    height: "50px",
    border: "1px dashed gray",
  },
  imageUpload: {
    position: "absolute",
    width: "30px",
    height: "30px",
    right: "0",
    zIndex: "9",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.55)",
    "& > * ": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
    },
  },
  linkUpload: {
    position: "absolute",
    width: "30px",
    height: "30px",
    right: "0",
    bottom: "0",
    zIndex: "9",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.55)",
    "& > * ": {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
    },
  },
  formControl: {
    marginTop: "10px",
    width: "100%",
  },
}));

const checkValidURL = urlString => {
  const expression = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}?/gi;
  const regex = new RegExp(expression);
  if (urlString.match(regex)) {
    return true;
  }
  return false;
};

export default function Media({ nodeData, parentClasses, setDisable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  // local state
  const [link_option, setLinkOption] = useState(nodeData.link_option);
  const [link, setLink] = useState(nodeData.link);
  const [media, setMedia] = useState(nodeData.media_url);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(media);
  let isUrlValid = nodeData.isUrlValid;

  useEffect(() => {
    setMedia(nodeData.media_url);
  }, [nodeData.media_url]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = function (e) {
    isUrlValid = checkValidURL(e.target.value);
    setLink(e.target.value);
    dispatch(Actions.setNodeProperties({ link: e.target.value, isUrlValid: isUrlValid }));
  };

  const handleUpload = () => {
    setOpen(false);
    setLoading(true);
    setDisable(true);
    BotDetailService.uploadImage({
      data: { paramName: "image", fileObj: fileName },
      formData: true,
      pathParam: { id: routeParams.id },
    })
      .then(res => {
        setMedia(res.data[0]);
        setDisable(false);
        dispatch(Actions.setNodeProperties({ media_url: res.data[0] }));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        dispatch(showMessage({ message: "Upload Failed" }));
        setDisable(true);
        setLoading(false);
      });
  };

  const onDrop = files => {
    setFileName(files[0]);
  };

  const isURLVideo = function (url) {
    return url.match(/\.(mp4|ogg)$/) != null;
  };
  const getMediaElement = function (url) {
    if (isURLVideo(url)) {
      return (
        <video controls>
          <source src={url}></source>
        </video>
      );
    } else {
      return <img src={url} alt="Click to Upload Media" />;
    }
  };
  const isMediaUrl = media.length > 0;
  return (
    <div>
      <Divider className={parentClasses.divider} />
      <div className={classes.imgParent}>
        <FuseLoading overlay={loading}>
          <div className={classes.imageUpload} onClick={handleClickOpen}>
            <Icon>{"edit"}</Icon>
          </div>
          <div className={classes.center}>
            {isMediaUrl ? (
              getMediaElement(media)
            ) : (
              <div className={classes.uploadContainer}>
                <Typography
                  className={parentClasses.valHeading}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Click to upload media
                </Typography>
              </div>
            )}
          </div>
        </FuseLoading>
        <Divider className={parentClasses.divider} />

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
          <DialogContent>
            <Typography variant="caption" component="h6" style={{ marginBottom: "10px" }}>
              {fileName && fileName.path ? fileName.path : fileName}
            </Typography>
            <Dropzone
              onDrop={acceptedFiles => onDrop(acceptedFiles)}
              minSize={1024}
              maxSize={3072000}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={classes.dropzone}>
                  <input {...getInputProps()} />
                  <p>Drag'n'drop images, or click to select files</p>
                </div>
              )}
            </Dropzone>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpload} color="primary">
              Upload
            </Button>
          </DialogActions>
        </Dialog>

        <FormControlLabel
          checked={link_option}
          onChange={e => {
            dispatch(Actions.setNodeProperties({ link_option: !link_option }));
            setLinkOption(!link_option);
          }}
          control={<Switch color="primary" />}
          label="On Click Redirect to Link"
          labelPlacement="start"
        />
        {link_option ? (
          <FormControl className={classes.formControl}>
            <TextField
              error={isUrlValid === false}
              label="on click link"
              className={clsx("w-full", parentClasses.valueBox)}
              type="url"
              onChange={onChange}
              value={link}
              placeholder="enter valid link"
              variant="outlined"
              helperText={
                isUrlValid === false ? "Enter Complete URL starting with https/http." : null
              }
            />
          </FormControl>
        ) : null}
      </div>
    </div>
  );
}
