import BaseService from "app/services/BaseService";

class TemplatesService extends BaseService {
  getTemplates(options = {}) {
    return this.apiCall({ url: "templates.getTemplates", method: "GET" }, options);
  }
  createBot(options = {}) {
    return this.apiCall({ url: "templates.createBot", method: "POST" }, options);
  }
}

export default new TemplatesService();
