import BaseService from "app/services/BaseService";

class PaymentsService extends BaseService {
  pingRazorpay(options = {}) {
    return this.apiCall({ url: "payments.pingRazorpay", method: "POST" }, options);
  }
  verifyPayment(options = {}) {
    return this.apiCall({ url: "payments.verifyPayment", method: "POST" }, options);
  }
}

export default new PaymentsService();
