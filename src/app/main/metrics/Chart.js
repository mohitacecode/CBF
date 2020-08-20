import React from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import { Typography } from "@material-ui/core";
import reducer from "./store/reducers";

import ChartContent from "./components/ChartContent";

const Header = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Typography color="inherit" className="text-12 sm:text-20 font-light">
        Metrics Chart
      </Typography>
    </div>
  );
};

export const Metrics = () => {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<Header />}
      content={<ChartContent />}
    />
  );
};

export default withReducer("metrics", reducer)(Metrics);
