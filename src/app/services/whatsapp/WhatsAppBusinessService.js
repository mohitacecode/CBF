import BaseService from "app/services/BaseService";

class WhatsAppBusinessService extends BaseService {
  getAccountList(options = {}) {
    return this.apiCall({ url: "whatsapp.accountCreateAndList", method: "GET" }, options);
  }
  getAccount(options = {}) {
    return this.apiCall({ url: "whatsapp.accountDetails", method: "GET" }, options);
  }
  addAccount(options = {}) {
    return this.apiCall({ url: "whatsapp.accountCreateAndList", method: "POST" }, options);
  }
  updateAccount(options = {}) {
    return this.apiCall({ url: "whatsapp.accountDetails", method: "PUT" }, options);
  }
  deleteAccount(options = {}) {
    return this.apiCall({ url: "whatsapp.accountDetails", method: "DELETE" }, options);
  }
  saveDetails(options = {}) {
    return this.apiCall({ url: "whatsapp.accountCreateAndList", method: "POST" }, options);
  }
  editDetails(options = {}) {
    return this.apiCall({ url: "whatsapp.accountEdit", method: "PUT" }, options);
  }
}

export default new WhatsAppBusinessService();
