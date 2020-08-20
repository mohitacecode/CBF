import BaseService from "app/services/BaseService";

class ChatDataService extends BaseService {
  getListing(options = {}) {
    return this.apiCall({ url: "chatdata.listing" }, options);
  }
  getHeaders(options = {}) {
    return this.apiCall({ url: "chatdata.headers" }, options);
  }
  getData(options = {}) {
    return this.apiCall({ url: "chatdata.bot" }, options);
  }
  getVisitors(options = {}) {
    return this.apiCall({ url: "chatdata.visitors" }, options);
  }
  getLeads(options = {}) {
    return this.apiCall({ url: "chatdata.leads" }, options);
  }
  dateFilter(options = {}) {
    return this.apiCall({ url: "chatdata.dateFilter" }, options);
  }
  exportData(options = {}) {
    return this.apiCall({ url: "chatdata.exportData" }, options);
  }
  sendEmail(options = {}) {
    return this.apiCall({ url: "chatdata.sendEmail", method: "POST" }, options);
  }
  googleSheets(options = {}) {
    return this.apiCall({ url: "chatdata.googleSheets", method: "POST" }, options);
  }
  setEmail(options = {}) {
    return this.apiCall({ url: "chatdata.setEmail", method: "PUT" }, options);
  }
}

export default new ChatDataService();
