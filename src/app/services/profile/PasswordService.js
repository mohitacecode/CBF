import BaseService from "app/services/BaseService";

class PasswordService extends BaseService {
  addPassword(options = {}) {
    return this.apiCall({ url: "auth.changePassword", method: "POST" }, options);
  }
}

export default new PasswordService();
