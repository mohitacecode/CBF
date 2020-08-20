import BaseService from "app/services/BaseService";

class AdminOwnerService extends BaseService {
  getOperators(options = {}) {
    return this.apiCall({ url: "admin.operators" }, options);
  }
  getOperator(options = {}) {
    return this.apiCall({ url: "admin.operatorDetails" }, options);
  }
  getNewOperator(options = {}) {
    return this.apiCall({ url: "admin.operatorCreate" }, options);
  }

  addOperator(options = {}) {
    return this.apiCall({ url: "admin.operatorCreate", method: "POST" }, options);
  }
  updateOperator(options = {}) {
    return this.apiCall({ url: "admin.operatorDetails", method: "PUT" }, options);
  }

  deleteOperator(options = {}) {
    return this.apiCall({ url: "admin.operatorDetails", method: "DELETE" }, options);
  }
}

export default new AdminOwnerService();
