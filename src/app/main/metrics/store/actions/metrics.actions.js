import metricsService from "app/services/metrics/metricsService";
import teamService from "app/services/admin/teams";
import botManagementService from "app/services/bot/BotManagementService";

export const FETCHING_TABLE_DATA = "FETCHING_TABLE_DATA";
export const SET_TABLE_DATA = "SET_TABLE_DATA";
export const SET_TEAM_CHART_DATA = "SET_TEAM_CHART_DATA";
export const SET_OPERATOR_CHART_DATA = "SET_OPERATOR_CHART_DATA";
export const TOGGLE_ACTIVE_METRICS = "TOGGLE_ACTIVE_METRICS";
export const SET_FILTERS = "SET_FILTERS";
export const SET_TEAM_CHART_FILTERS = "SET_TEAM_CHART_FILTERS";
export const SET_OPERATOR_CHART_FILTERS = "SET_OPERATOR_CHART_FILTERS";
export const RESET_FILTERS = "RESET_FILTERS";
export const SET_TEAMS = "SET_TEAMS";
export const SET_BOTS = "SET_BOTS";

export const createGraphData = (disconnected, resolved, pending) => ({
  labels: ["disconnected", "resolved", "pending"],
  datasets: [
    {
      data: [disconnected, resolved, pending],
      backgroundColor: ["#CCC", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
});

export const toggleActiveMetrics = metricsName => {
  console.log("fads", metricsName);
  return {
    type: TOGGLE_ACTIVE_METRICS,
    payload: metricsName,
  };
};

export const setFilters = filters => {
  return {
    type: SET_FILTERS,
    payload: filters,
  };
};

export const setTeamChartFilters = filters => {
  return {
    type: SET_TEAM_CHART_FILTERS,
    payload: filters,
  };
};
export const setOperatorChartFilters = filters => {
  return {
    type: SET_OPERATOR_CHART_FILTERS,
    payload: filters,
  };
};

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};

export const getTeamData = filters => async dispatch => {
  dispatch({ type: FETCHING_TABLE_DATA, payload: true });

  const chatRes = await metricsService.getTeamMetrics({
    data: { ...filters, sort: "asc" }, // desc
  });
  let dispatchableData = chatRes.data.metric;

  dispatch({ type: SET_TABLE_DATA, payload: dispatchableData });
};

export const getOperatorData = filters => async dispatch => {
  dispatch({ type: FETCHING_TABLE_DATA, payload: true });

  const chatRes = await metricsService.getOperatorMetrics({
    data: { ...filters, sort: "asc" }, // desc
  });
  let dispatchableData = chatRes.data.map(item => {
    return { ...item, operator: item.first_name + " " + item.last_name || "" };
  });

  dispatch({ type: SET_TABLE_DATA, payload: dispatchableData });
};

const calculatePercentageOfMetrics = data => {
  const metrics = {
    resolved: 0,
    pending: 0,
    disconnected: 0,
  };

  const total = data.reduce((prev, curr) => {
    Object.keys(curr).forEach(key => {
      if (metrics.hasOwnProperty(key)) {
        prev = prev + curr[key];
      }
    });
    return prev;
  }, 0);

  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (metrics.hasOwnProperty(key)) {
        metrics[key] = metrics[key] + item[key];
      }
    });
  });
  if (total) {
    Object.keys(metrics).forEach(key => {
      metrics[key] = Math.round((metrics[key] / total) * 100);
    });
  }

  return metrics;
};

export const getTeamChartData = filters => async dispatch => {
  const chatRes = await metricsService.getTeamMetrics({
    data: { ...filters, sort: "asc" }, // desc
  });
  let data = calculatePercentageOfMetrics(chatRes.data.metric);

  dispatch({
    type: SET_TEAM_CHART_DATA,
    payload: createGraphData(data.disconnected, data.resolved, data.pending),
  });
};

export const getOperatorChartData = filters => async dispatch => {
  const chatRes = await metricsService.getOperatorMetrics({
    data: { ...filters, sort: "asc" }, // desc
  });
  let data = calculatePercentageOfMetrics(chatRes.data);

  dispatch({
    type: SET_OPERATOR_CHART_DATA,
    payload: createGraphData(data.disconnected, data.resolved, data.pending),
  });
};

export const getTeams = () => async dispatch => {
  const teamsRes = await teamService.getTeams();
  const teams = teamsRes.data.map(item => item.name);

  dispatch({ type: SET_TEAMS, payload: teams });
};

export const getBots = () => async dispatch => {
  const botsRes = await botManagementService.getBots();
  const bots = botsRes.data.data.map(item => item.title);

  dispatch({ type: SET_BOTS, payload: bots });
};
