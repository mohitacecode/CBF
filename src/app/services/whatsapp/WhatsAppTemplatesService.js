import BaseService from "app/services/BaseService";

class WhatsAppTemplatesService extends BaseService {
  getTemplates(options = {}) {
    return this.apiCall({ url: "whatsapp.getPostTemplates", method: "GET" }, options);
  }
  addTemplates(options = {}) {
    return this.apiCall({ url: "whatsapp.getPostTemplates", method: "POST" }, options);
  }
}

export default new WhatsAppTemplatesService();
