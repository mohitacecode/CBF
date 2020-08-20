import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../store/actions";

const Table = () => {
  const columns = {
    team: [
      // { title: "Date", field: "date" },
      { title: "Team", field: "name" },
      { title: "Total Chats", field: "total_chats" },
      { title: "Pending Chats", field: "pending" },
      { title: "Resolved", field: "resolved" },
      // { title: "Unassigned", field: "unassigned" },
      { title: "Disconnected", field: "disconnected" },
    ],
    operator: [
      // { title: "Date", field: "date" },
      { title: "Operator", field: "operator" },
      { title: "Team", field: "team_name" },
      { title: "Total Chats", field: "total_chats" },
      { title: "Pending Chats", field: "pending" },
      { title: "Resolved", field: "resolved" },
      { title: "Disconnected", field: "disconnected" },
    ],
  };
  const dispatch = useDispatch();
  const metrics = useSelector(({ metrics }) => metrics.metrics);

  useEffect(() => {
    if (metrics.active === "team") dispatch(Actions.getTeamData(metrics.filters));
    else dispatch(Actions.getOperatorData(metrics.filters));
    // eslint-disable-next-line
  }, [metrics.filters]);
  console.log("boom", metrics.tableData);

  return (
    <div className="w-full">
      <MaterialTable
        columns={columns[metrics.active]}
        data={metrics.tableData}
        title={metrics.active === "team" ? "Team Metrics" : "Operator Metrics"}
        options={{
          sorting: true,
        }}
      />
    </div>
  );
};

export default Table;
