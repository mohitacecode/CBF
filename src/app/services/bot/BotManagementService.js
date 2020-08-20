import BaseService from "app/services/BaseService";

class BotManagementService extends BaseService {
  getBots(options = {}) {
    return this.apiCall({ url: "bot.bots" }, options);
  }
  addBot(options = {}) {
    return this.apiCall({ url: "bot.bots", method: "POST" }, options);
  }
  duplicateBot(options = {}) {
    return this.apiCall({ url: "bot.duplicateBot", method: "POST" }, options);
  }
  deleteBot(options = {}) {
    return this.apiCall({ url: "bot.deleteBot", method: "DELETE" }, options);
  }
}

export default new BotManagementService();
