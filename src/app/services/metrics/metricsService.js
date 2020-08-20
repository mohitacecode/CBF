import BaseService from "app/services/BaseService";

class MetricsService extends BaseService {
  getTeamMetrics(options = {}) {
    return this.apiCall({ url: "metrics.getTeamMetrics", method: "POST" }, options);
  }
  getOperatorMetrics(options = {}) {
    return this.apiCall({ url: "metrics.getOperatorMetrics", method: "POST" }, options);
  }
}

export default new MetricsService();
