import BaseService from "app/services/BaseService";

class ChatManagementService extends BaseService {
  assignOperator(options = {}) {
    return this.apiCall({ url: "chat_manage.assignOperator", method: "POST" }, options);
  }
  sendChatReview(options = {}) {
    return this.apiCall({ url: "chat_manage.sendChatReview", method: "POST" }, options);
  }
  getChatReview(options = {}) {
    return this.apiCall({ url: "chat_manage.getChatReview" }, options);
  }
}

export default new ChatManagementService();
