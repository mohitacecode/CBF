import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import React from "react";
import reducer from "../store/reducers";
import OperatorHeader from "./OperatorHeader";
import OperatorTable from "./OperatorTable";

function Operator() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<OperatorHeader />}
      content={<OperatorTable />}
      innerScroll
    />
  );
}

export default withReducer("Operators", reducer)(Operator);
