import BaseService from "app/services/BaseService";

class WhatsAppChannelService extends BaseService {
  getChannelList(options = {}) {
    return this.apiCall({ url: "whatsapp.channelCreateAndList", method: "GET" }, options);
  }
  getChannel(options = {}) {
    return this.apiCall({ url: "whatsapp.channelDetails", method: "GET" }, options);
  }
  addChannel(options = {}) {
    return this.apiCall({ url: "whatsapp.channelCreateAndList", method: "POST" }, options);
  }
  getBotList(options = {}) {
    return this.apiCall({ url: "whatsapp.botList", method: "GET" }, options);
  }
  updateChannel(options = {}) {
    return this.apiCall({ url: "whatsapp.channelDetails", method: "PUT" }, options);
  }
  deleteChannel(options = {}) {
    return this.apiCall({ url: "whatsapp.channelDetails", method: "DELETE" }, options);
  }
}

export default new WhatsAppChannelService();
