import BaseService from "app/services/BaseService";

class RegisterService extends BaseService {
  registerUser(options = {}) {
    return this.apiCall({ url: "auth.registerUser", method: "POST" }, options);
  }
  mailConfirm(options = {}) {
    return this.apiCall({ url: "auth.mailConfirmUser" }, options);
  }
}

export default new RegisterService();
