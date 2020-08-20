import * as Actions from "../actions";

const metrics = {
  active: "team",
  fetchingTable: false,
  tableData: [],
  filters: {
    channels: ["website", "whatsapp"],
    bots: [],
    teams: [],
  },
  teamChartData: Actions.createGraphData(0, 0, 0),
  operatorChartData: Actions.createGraphData(0, 0, 0),
  teamChartFilters: { channels: ["website", "whatsapp"], bots: [], teams: [] },
  operatorChartFilters: { channels: ["website", "whatsapp"], bots: [], teams: [] },
  bots: [],
  teams: [],
};

export default (state = metrics, action = {}) => {
  const defaultFilters = {
    channels: ["website", "whatsapp"],
    bots: state.bots,
    teams: state.teams,
  };

  switch (action.type) {
    case Actions.SET_TABLE_DATA:
      return { ...state, tableData: action.payload };

    case Actions.SET_TEAM_CHART_DATA:
      return { ...state, teamChartData: action.payload };

    case Actions.SET_OPERATOR_CHART_DATA:
      return { ...state, operatorChartData: action.payload };

    case Actions.TOGGLE_ACTIVE_METRICS:
      return { ...state, active: action.payload, tableData: [], filters: defaultFilters };

    case Actions.SET_FILTERS:
      return { ...state, filters: action.payload };

    case Actions.SET_TEAM_CHART_FILTERS:
      return { ...state, teamChartFilters: action.payload };

    case Actions.SET_OPERATOR_CHART_FILTERS:
      return { ...state, operatorChartFilters: action.payload };

    case Actions.RESET_FILTERS:
      return { ...state, filters: defaultFilters };

    case Actions.SET_TEAMS:
      return {
        ...state,
        filters: { ...state.filters, teams: action.payload },
        teams: action.payload,
      };

    case Actions.SET_BOTS:
      return {
        ...state,
        filters: { ...state.filters, bots: action.payload },
        bots: action.payload,
      };

    default:
      return state;
  }
};
