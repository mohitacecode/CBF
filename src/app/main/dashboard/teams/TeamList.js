import React, { useState, useEffect } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
import TeamsHeader from "./components/TeamsHeader";
import TeamsTable from "./components/TeamsTable";

//redux
import * as Actions from "../store/actions";
import { useDispatch } from "react-redux";

function TeamList() {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([{ name: "none", id: null }]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [noData, setNoData] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teams[selectedIndex].id !== null) {
      dispatch(Actions.getTeamOperators(teams[selectedIndex].id, setNoData, setLoading));
    }
    // eslint-disable-next-line
  }, [teams, selectedIndex]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <TeamsHeader
          teams={teams}
          setTeams={setTeams}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      }
      content={<TeamsTable team={teams[selectedIndex]} loading={loading} noData={noData} />}
      innerScroll
    />
  );
}

export default withReducer("Operators", reducer)(TeamList);
