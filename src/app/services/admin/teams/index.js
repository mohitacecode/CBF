import BaseService from "app/services/BaseService";

class TeamService extends BaseService {
  addTeam(options = {}) {
    return this.apiCall({ url: "teams.addTeam", method: "POST" }, options);
  }
  getTeams(options = {}) {
    return this.apiCall({ url: "teams.getTeams" }, options);
  }
  getTeamOperators(options = {}) {
    return this.apiCall({ url: "teams.getTeamOperators" }, options);
  }
}

export default new TeamService();
