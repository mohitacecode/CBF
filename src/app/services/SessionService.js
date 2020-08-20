//import UserSessionService from "services/sessions/UserSessionService";

class SessionService {
  constructor() {
    this.userSession = {
      islogedIn: false,
    };
    //_.extend(this, UserSessionService);
  }
  getUserSession() {
    return this.userSession;
  }
  clearSession() {
    this.userSession = null;
  }
}

export default new SessionService();
