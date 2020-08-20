import BaseService from "app/services/BaseService";

class DashboardService extends BaseService {
  getStats(options = {}) {
    return this.apiCall({ url: "admin.chatbotCount" }, options);
  }
  /*addBot(options = {}) {
		return this.apiCall({ url: "bot.bots", method: "POST" }, options);
	}
	getBots(options = {}) {
		return this.apiCall({ url: "bot.bots" }, options);
	}
	updateBotStatus(options = {}) {
		return this.apiCall({ url: "bot.botDetails", method: "PUT" }, options);
	}
*/
}

export default new DashboardService();
