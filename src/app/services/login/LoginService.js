import BaseService from "app/services/BaseService";

class LoginService extends BaseService {
  loginUser(options = {}) {
    return this.apiCall({ url: "auth.loginUser", method: "POST" }, options);
  }
  forgotPassword(options = {}) {
    return this.apiCall({ url: "auth.forgotPassword", method: "POST" }, options);
  }
  google_Login(options = {}) {
    return this.apiCall({ url: "auth.google", method: "POST" }, options);
  }
  facebook_Login(options = {}) {
    return this.apiCall({ url: "auth.facebook", method: "POST" }, options);
  }
  resetPassword(options = {}) {
    return this.apiCall({ url: "auth.resetPasswordLink", method: "POST" }, options);
  }
}

export default new LoginService();
