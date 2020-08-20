import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";

// const useStyles = (props) =>
// 	makeStyles((theme) => ({
// 		container: {
// 			height: "100%",
// 			backgroundColor: props.background,
// 			backgroundSize: "50px 50px",
// 			display: "flex",
// 			"&> *": {
// 				height: "100%",
// 				minHeight: "100%",
// 				width: "100%",
// 			},
// 			"& svg": {
// 				overflow: "visible !important",
// 			},
// 			backgroundImage: `linear-gradient(
// 				0deg,
// 				transparent 24%,
// 				${props.color} 25%,
// 				${props.color} 26%,
// 				transparent 27%,
// 				transparent 74%,
// 				${props.color} 75%,
// 				${props.color} 76%,
// 				transparent 77%,
// 				transparent
// 			),
// 			linear-gradient(
// 				90deg,
// 				transparent 24%,
// 				${props.color} 25%,
// 				${props.color} 26%,
// 				transparent 27%,
// 				transparent 74%,
// 				${props.color} 75%,
// 				${props.color} 76%,
// 				transparent 77%,
// 				transparent
// 			)`,
// 		},
// 	}));

const useStyles = props =>
  makeStyles(theme => ({
    container: {
      height: "100%",
      display: "flex",
      "&> *": {
        height: "100%",
        minHeight: "100%",
        width: "100%",
      },
      "& svg": {
        overflow: "visible !important",
      },
      "& .node": {
        width: "fit-content",
      },
      backgroundImage:
        "linear-gradient(rgba(150,150,150,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(150,150,150,.1) 1px,transparent 1px)",
      backgroundSize: "20px 20px,20px 20px",
      border: "2px dashed #ddd",
      backgroundColor: "#f3f3f3",
    },
  }));

export default function CanvasContainer(props) {
  const classes = useStyles({
    background: props.background || "rgb(60, 60, 60)",
    color: props.color || "rgba(255,255,255, 0.05)",
  })();
  return (
    <Fragment>
      <div className={classes.container}>{props.children}</div>
    </Fragment>
  );
}
