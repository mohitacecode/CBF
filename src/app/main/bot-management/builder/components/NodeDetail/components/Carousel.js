import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import clsx from "clsx";

//material && fuse
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { showMessage } from "app/store/actions/fuse";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { Button, DialogContent, DialogTitle, Dialog, DialogActions } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

// redux
import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

// services
import BotDetailService from "app/services/bot/BotDetailService";
import FuseLoading from "@fuse/core/FuseLoading";

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
    alignItems: "left",
    flexDirection: "row",
  },
  uploadContainer: {
    width: "100%",
    background: "#e2e2e2",
    display: "flex",
    flexDirection: "row",
    height: "80px",
    border: "1px dashed gray",
  },
  imageUpload: {
    position: "absolute",
    width: "30px",
    height: "30px",
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
    zIndex: "9",
    bottom: "0",
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
  imgCarousel: {
    width: "80px",
    height: "80px",
    display: "inline-block",
  },
  slider: {
    width: "250px",
    marginLeft: "20px",
  },
  formControl: {
    width: "100%",
  },
}));

const marks = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

const checkValidURL = urlString => {
  const expression = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}?/gi;
  const regex = new RegExp(expression);
  if (urlString.match(regex)) {
    return true;
  }
  return false;
};

export default function Carousel({ nodeData, parentClasses, setDisable }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  // local state
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState([...nodeData.carousel_url]);
  const [no_images, setNoImages] = useState(nodeData.no_images);
  const [link, setLink] = useState([...nodeData.link_carousel]);
  const [linkText, setLinkText] = useState(nodeData.link_carousel_text || []);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState([...media]);
  let isUrlValid = [...nodeData.isUrlValid];

  useEffect(() => {
    if (no_images === nodeData.carousel_url.length) {
      setMedia([...nodeData.carousel_url]);
    } else {
      let dummy = [...media];
      dummy.length = no_images;
      dummy.fill(" ", 0, no_images);
      setMedia([...dummy]);
      setLink([...dummy]);
    }
    let dummy = [...isUrlValid];
    dummy.length = no_images;
    dummy.fill(true, 0, no_images);
    dispatch(Actions.setNodeProperties({ isUrlValid: [...dummy] }));

    // eslint-disable-next-line
  }, [no_images]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    setLoading(true);
    setDisable(true);

    BotDetailService.uploadImage({
      data: { paramName: "image", fileObj: fileName[index] },
      formData: true,
      pathParam: { id: routeParams.id },
    })
      .then(res => {
        let med = [...media];
        med[index] = [...res.data];
        dispatch(Actions.setNodeProperties({ carousel_url: [...med] }));
        setMedia([...med]);
        setDisable(false);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        dispatch(showMessage({ message: "Upload Failed" }));
        setDisable(true);
        setLoading(false);
      });

    if (isUrlValid[index] === true) {
      setOpen(false);
    } else {
      dispatch(showMessage({ message: "Invalid Link" }));
    }
  };

  const onDrop = files => {
    let demo = [...media];
    demo[index] = files[0];
    setFileName([...demo]);
  };

  const getMediaElement = function (url, i) {
    return (
      <img key={`img${i}`} src={url} alt="Click to Upload Media" className={classes.imgCarousel} />
    );
  };

  const onChange = function (e, index) {
    if (e.target.value === "") {
      isUrlValid[index] = true;
      let links = [...link];
      links[index] = e.target.value;
      setLink([...links]);
    } else {
      isUrlValid[index] = checkValidURL(e.target.value);
      let links = [...link];
      links[index] = e.target.value;
      setLink([...links]);
      dispatch(
        Actions.setNodeProperties({ link_carousel: [...links], isUrlValid: [...isUrlValid] })
      );
    }
  };

  const onLinkTextChange = (e, index) => {
    const linkTexts = [...linkText];
    linkTexts[index] = e.target.value;
    setLinkText(linkTexts);
    dispatch(Actions.setNodeProperties({ link_carousel_text: linkTexts }));
  };

  return (
    <div>
      <Divider className={parentClasses.divider} />
      <div className={classes.slider}>
        <Typography id="discrete-slider-always" gutterBottom>
          No of Images in Carousel
        </Typography>
        <Slider
          value={typeof no_images === "number" ? no_images : Number(no_images)}
          aria-labelledby="discrete-slider-always"
          marks={marks}
          valueLabelDisplay="auto"
          min={2}
          max={5}
          onChange={(event, newValue) => {
            dispatch(Actions.setNodeProperties({ no_images: newValue }));
            setNoImages(newValue);
          }}
        />
      </div>
      <Divider className={parentClasses.divider} />

      <FuseLoading style={{ color: "white" }} overlay={loading}>
        {media.map((img, i) => {
          return (
            <div key={`img${i}`} className={classes.imgCarousel}>
              <div className={classes.uploadContainer}>
                <div
                  className={classes.imageUpload}
                  onClick={() => {
                    setIndex(i);
                    handleClickOpen();
                  }}
                >
                  <Icon>{"edit"}</Icon>
                </div>

                <div className={classes.center}>
                  {img !== " " ? (
                    getMediaElement(img)
                  ) : (
                    <div>
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
              </div>
            </div>
          );
        })}
      </FuseLoading>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <Typography variant="caption" component="h6" style={{ marginBottom: "10px" }}>
            {fileName[index] && fileName[index].path ? fileName[index].path : fileName[index]}
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
          <Divider className={parentClasses.divider} />
          <FormControl className={classes.formControl}>
            <TextField
              error={isUrlValid[index] === false}
              label="On click link"
              className={clsx("w-full", parentClasses.valueBox)}
              type="url"
              onChange={e => onChange(e, index)}
              value={link[index]}
              placeholder="enter valid link"
              variant="outlined"
              helperText={
                isUrlValid[index] === false ? "Enter Complete URL starting with https/http." : null
              }
            />
          </FormControl>
          <Divider className={parentClasses.divider} />
          <FormControl className={classes.formControl}>
            <TextField
              // error={isUrlValid[index] === false}
              label="Link text"
              className={clsx("w-full", parentClasses.valueBox)}
              onChange={e => onLinkTextChange(e, index)}
              value={linkText[index]}
              placeholder="Eg:- Click here"
              variant="outlined"
              // helperText={
              //   isUrlValid[index] === false ? "Enter Complete URL starting with https/http." : null
              // }
            />
          </FormControl>
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
    </div>
  );
}
