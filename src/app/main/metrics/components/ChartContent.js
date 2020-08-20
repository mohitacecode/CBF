import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import FilterButton from "./FilterButton";
import FilterDialog from "./FilterDialog";

const Info = ({ title, percent }) => {
  return (
    <div className="px-16 flex flex-col items-center">
      <p className="MuiTypography-root h4 MuiTypography-body1 MuiTypography-colorTextSecondary">
        {title}
      </p>
      <p className="MuiTypography-root h2 font-300 py-8 MuiTypography-body1">{percent}%</p>
    </div>
  );
};

const ChartContent = () => {
  const dispatch = useDispatch();

  const [teamFilterVisible, setTeamFilterVisible] = useState(false);
  const [operatorFilterVisible, setOperatorFilterVisible] = useState(false);
  const metrics = useSelector(({ metrics }) => metrics.metrics);
  const teamData = metrics.teamChartData;
  const operatorData = metrics.operatorChartData;

  useEffect(() => {
    dispatch(Actions.getBots());
    dispatch(Actions.getTeams());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(Actions.getTeamChartData(metrics.teamChartFilters));
    // eslint-disable-next-line
  }, [metrics.teamChartFilters]);

  useEffect(() => {
    dispatch(Actions.getOperatorChartData(metrics.operatorChartFilters));
    // eslint-disable-next-line
  }, [metrics.operatorChartFilters]);

  return (
    <div className="flex justify-around w-full py-24">
      <Paper elevation={3}>
        <Doughnut
          options={{
            title: { display: true, fontSize: 20, fontFamily: "Muli", text: "Team Metrics" },
          }}
          height={300}
          data={teamData}
        />
        <div className="p-16 flex flex-row items-center justify-center">
          <Info title="Disconnected" percent={teamData.datasets[0].data[0]} />
          <Info title="Resolved" percent={teamData.datasets[0].data[1]} />
          <Info title="Pending" percent={teamData.datasets[0].data[2]} />
        </div>
        <FilterButton onPress={setTeamFilterVisible} />
        <FilterDialog
          visible={teamFilterVisible}
          hideDialog={() => setTeamFilterVisible(false)}
          title="Filter operator metrics"
          channels={["website", "whatsapp"]}
          bots={metrics.bots}
          teams={metrics.teams}
          filter={metrics.filters}
          setFilter={filter => dispatch(Actions.setTeamChartFilters(filter))}
        />
      </Paper>
      <Paper elevation={3}>
        <Doughnut
          options={{
            title: { display: true, fontSize: 20, fontFamily: "Muli", text: "Operator Metrics" },
          }}
          height={300}
          data={operatorData}
        />
        <div className="p-16 flex flex-row items-center justify-center">
          <Info title="Disconnected" percent={operatorData.datasets[0].data[0]} />
          <Info title="Resolved" percent={operatorData.datasets[0].data[1]} />
          <Info title="Pending" percent={operatorData.datasets[0].data[2]} />
        </div>
        <FilterButton onPress={setOperatorFilterVisible} />
        <FilterDialog
          visible={operatorFilterVisible}
          hideDialog={() => setOperatorFilterVisible(false)}
          title="Filter operator metrics"
          channels={["website", "whatsapp"]}
          bots={metrics.bots}
          teams={metrics.teams}
          filter={metrics.filters}
          setFilter={filter => dispatch(Actions.setOperatorChartFilters(filter))}
        />
      </Paper>
    </div>
  );
};

export default ChartContent;
