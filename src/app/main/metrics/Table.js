import React from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";

import Header from "./components/Header";
import Table from "./components/Table";

export const Metrics = () => {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<Header />}
      content={<Table />}
      // innerScroll
    />
  );
};

export default withReducer("metrics", reducer)(Metrics);
