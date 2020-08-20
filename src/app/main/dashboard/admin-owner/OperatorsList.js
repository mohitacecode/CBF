import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import React from "react";
import reducer from "../store/reducers";
import OperatorsHeader from "./components/OperatorHeader";
import OperatorsTable from "./components/OperatorsTable";

function OperatorsList() {
  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<OperatorsHeader />}
      content={<OperatorsTable />}
      innerScroll
    />
  );
}

export default withReducer("Operators", reducer)(OperatorsList);
