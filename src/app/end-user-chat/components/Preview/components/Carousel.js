import React, { useState, useEffect } from "react";

//material
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  carousel: {
    minWidth: "300px",
    minHeight: "300px",
  },
  container: {
    display: "inline-flex",
  },
  rightButton: {
    right: "20%",
    position: "absolute",
    marginTop: "67%",
    color: "black",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  leftButton: {
    left: "3%",
    marginTop: "67%",
    position: "absolute",
    color: "black",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
}));

const RatingComponent = ({ images, links, linkTexts }) => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  let timeOut = null;
  useEffect(() => {
    // eslint-disable-next-line
    timeOut = setTimeout(() => {
      if (index < images.length) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line
  }, [index]);

  return (
    <div className={classes.container}>
      <IconButton
        className={classes.leftButton}
        onClick={() => {
          clearTimeout(timeOut);
          if (index > 0 && index < images.length) {
            setIndex(index - 1);
          } else if (index === 0) {
            setIndex(images.length - 1);
          }
        }}
      >
        <ArrowLeftRoundedIcon />
      </IconButton>
      {images[index] !== "" && index < images.length ? (
        links[index] !== " " ? (
          <div className="flex flex-col">
            <Link target="_blank" className={classes.link} href={links[index]}>
              <img src={images[index]} alt="Click to Upload Media" className={classes.carousel} />
            </Link>
            <Link target="_blank" className={classes.link} href={links[index]}>
              <h2 className="text-center mb-12">{linkTexts[index] || "Click Here"}</h2>
            </Link>
          </div>
        ) : (
          <img src={images[index]} alt="Click to Upload Media" className={classes.carousel} />
        )
      ) : (
        setIndex(0)
      )}
      <IconButton
        className={classes.rightButton}
        onClick={() => {
          clearTimeout(timeOut);
          if (index < images.length) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          }
        }}
      >
        <ArrowRightRoundedIcon />
      </IconButton>
    </div>
  );
};

export default RatingComponent;
