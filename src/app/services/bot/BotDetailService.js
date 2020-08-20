import BaseService from "app/services/BaseService";

class BotDetailService extends BaseService {
  getBotDetails(options = {}) {
    return this.apiCall({ url: "bot.botDetails" }, options);
  }
  updateBotDetails(options = {}) {
    return this.apiCall({ url: "bot.botDetails", method: "PUT" }, options);
  }
  getSessionData(options = {}) {
    return this.apiCall({ url: "bot.botSession" }, options);
  }
  getSessionInMemoryData(options = {}) {
    return this.apiCall({ url: "bot.botSessionInMemory", method: "POST" }, options);
  }
  getBotDesign(options = {}) {
    return this.apiCall({ url: "bot.botDesign" }, options);
  }
  saveBotDesign(options = {}) {
    return this.apiCall({ url: "bot.botDesign", method: "PUT" }, options);
  }
  getFilteredActiveBots(options = {}) {
    return this.apiCall({ url: "bot.botFilteredActiveList", method: "POST" }, options);
  }
  getOperatorActiveBots(options = {}) {
    return this.apiCall({ url: "bot.botOperatorActiveList", method: "POST" }, options);
  }
  getActiveBots(options = {}) {
    return this.apiCall({ url: "bot.botActiveList" }, options);
  }
  getHistBots(options = {}) {
    return this.apiCall({ url: "bot.botHistList" }, options);
  }
  getOperatorHistBots(options = {}) {
    return this.apiCall({ url: "bot.botOperatorHistList", method: "POST" }, options);
  }
  getFilteredHistBots(options = {}) {
    return this.apiCall({ url: "bot.botFilteredHistList", method: "POST" }, options);
  }
  deactivateBot(options = {}) {
    return this.apiCall({ url: "bot.deactivateBot", method: "POST" }, options);
  }
  publishBot(options = {}) {
    return this.apiCall({ url: "bot.publish", method: "PUT" }, options);
  }
  getChatHistory(options = {}) {
    return this.apiCall({ url: "bot.getHistory" }, options);
  }
  getSessionChatHistory(options = {}) {
    return this.apiCall({ url: "bot.getSessionHistory" }, options);
  }
  getChatVariables(options = {}) {
    return this.apiCall({ url: "bot.getVariables" }, options);
  }
  getSessionVariables(options = {}) {
    return this.apiCall({ url: "bot.getSessionVariables" }, options);
  }
  sendMail(options = {}) {
    return this.apiCall({ url: "bot.sendMail", method: "POST" }, options);
  }
  sendWhatsappMsg(options = {}) {
    return this.apiCall({ url: "bot.whatsappChat", method: "POST" }, options);
  }
  uploadImage(options = {}) {
    return this.apiCall({ url: "bot.uploadImage", method: "POST" }, options);
  }
}

export default new BotDetailService();
