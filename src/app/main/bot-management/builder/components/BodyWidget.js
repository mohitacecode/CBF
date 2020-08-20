import React, { Fragment } from "react";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { makeStyles } from "@material-ui/core/styles";

import CanvasContainer from "./CanvasContainer";

const useStyles = makeStyles(theme => ({
  layer: {
    position: "relative",
    flexGrow: 1,
  },
  hiddenSvg: {
    width: 0,
    height: 0,
    minHeight: 0,
    opacity: 0,
  },
}));

const BodyWidgets = React.memo(({ app }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <svg className={classes.hiddenSvg}>
        <defs>
          <linearGradient id="pathGrad">
            <stop offset="0%" stopColor="#00c0ff"></stop>
            <stop offset="100%" stopColor="#c0ff00" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
      </svg>
      <div
        className={classes.layer}
        onDrop={event => {
          const position = app.getDiagramEngine().getRelativeMousePoint(event);
          console.log(position);
          app.getNodeModel({
            ...app.getTrayNode(event),
            addToModel: true,
            position,
          });
          app.getDiagramEngine().repaintCanvas();
        }}
        onDragOver={event => {
          event.preventDefault();
        }}
      >
        <CanvasContainer>
          <CanvasWidget engine={app.getDiagramEngine()} />
        </CanvasContainer>
      </div>
    </Fragment>
  );
});

export default BodyWidgets;
