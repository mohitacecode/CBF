import { useTimeout } from "@fuse/hooks";
import clsx from "clsx";
import LinearProgress from "@material-ui/core/LinearProgress";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useState, Fragment } from "react";

const useStyles = makeStyles(theme => ({
  ovelay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "99999",
    background: "#80808057",
  },
}));

function FuseLoading(props) {
  const classes = useStyles();
  const [showLoading, setShowLoading] = useState(!props.delay);

  useTimeout(() => {
    setShowLoading(true);
  }, props.delay);

  if (!showLoading) {
    return null;
  }

  return (
    <Fragment>
      {props.overlay !== undefined ? (
        props.overlay === true ? (
          <div className="flex justify-center">
            <div className={clsx("flex justify-center items-center", classes.ovelay)}>
              <CircularProgress color="primary" />
            </div>
            <div className="h-full w-full">{props.children}</div>
          </div>
        ) : (
          props.children
        )
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <Typography className="text-20 mb-16" color="textSecondary">
            Loading...
          </Typography>
          <LinearProgress className="w-xs" color="secondary" />
        </div>
      )}
    </Fragment>
  );
}

FuseLoading.propTypes = {
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

FuseLoading.defaultProps = {
  delay: false,
};

export default FuseLoading;
