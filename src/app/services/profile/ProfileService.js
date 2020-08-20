import BaseService from "app/services/BaseService";

class ProfileService extends BaseService {
  getProfile(options = {}) {
    return this.apiCall({ url: "auth.getUser" }, options);
  }

  logout(options) {
    return this.apiCall({ url: "auth.logout" }, options);
  }

  addOperator(options = {}) {
    return this.apiCall({ url: "admin.operators", method: "POST" }, options);
  }

  updateProfile(options = {}) {
    return this.apiCall({ url: "auth.updateUser", method: "PUT" }, options);
  }

  deleteOperator(options = {}) {
    return this.apiCall({ url: "admin.operatorDetails", method: "DELETE" }, options);
  }
  uploadAvatar(options = {}) {
    return this.apiCall({ url: "auth.uploadAvatar", method: "PUT" }, options);
  }
}

export default new ProfileService();
