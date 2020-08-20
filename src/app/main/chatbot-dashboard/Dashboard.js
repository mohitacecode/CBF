import React, { useEffect } from "react";
import clsx from "clsx";

import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";

//materials
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";

import BotCard from "./components/StatCard";

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  headerIcon: {
    position: "absolute",
    top: -54,
    left: 0,
    opacity: 0.04,
    fontSize: 200,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
}));

function Dashboard(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const stats = useSelector(({ statList }) => {
    return statList.statlist;
  });

  const loaderText = "Loading...";

  useEffect(() => {
    dispatch(Actions.getStats());
  }, [dispatch]);
  console.log(stats);
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div
        className={clsx(
          classes.header,
          "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-100"
        )}
      >
        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
          <Typography color="inherit" className="text-12 sm:text-20 font-light">
            Your Dashboard
          </Typography>
        </FuseAnimate>
        <Icon className={classes.headerIcon}> dashboard </Icon>
      </div>
      <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
        <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24"></div>
        {stats ? (
          //&& stats.length > 0
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn",
            }}
            className="flex flex-wrap py-48"
          >
            <Grid container spacing={10}>
              {<BotCard bot={stats} />}
            </Grid>
          </FuseAnimateGroup>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <Typography color="textSecondary" className="text-24 my-24">
              {loaderText}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default withReducer("statList", reducer)(Dashboard);
