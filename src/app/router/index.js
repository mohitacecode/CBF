import _ from "@lodash";
// import store from "app/store";

import LoginConfig from "app/main/login/LoginConfig";
import LogoutConfig from "app/main/logout/LogoutConfig";
import RegisterConfig from "app/main/register/RegisterConfig";
import Error404Config from "app/main/errors/404/Error404PageConfig";
import AdminConfig from "app/main/dashboard/AdminConfig";
import BotManagmentConfig from "app/main/bot-management/BotManagmentConfig";
import ChatAppConfig from "app/main/admin-chat-area/AdminChatAreaConfig";
import ProfileConfig from "app/main/profile/ProfileConfig";
import ForgotPasswordPageConfig from "app/main/forgot-password/ForgotPasswordPageConfig";
import ResetPasswordPageConfig from "app/main/reset-password/ResetPasswordPageConfig";
import MailConfirmPageConfig from "app/main/mail-confirm/MailConfirmPageConfig";
import WhatsAppConfig from "app/main/whatsapp/WhatsAppConfig";
import ChatDataConfig from "app/main/chat-data/ChatDataConfig";
import MetricsConfig from "app/main/metrics/config";

// import DashboardConfig from "app/main/chatbot-dashboard/DashboardConfig";
// import PaymentsConfig from "app/main/payments/PaymentsConfig";

// const permissionRoutes = store.getState().auth.permissionRoutes;
// export default _.flatten(permissionRoutes);

export default _.flatten([
  LoginConfig,
  LogoutConfig,
  Error404Config,
  ProfileConfig,
  RegisterConfig,
  AdminConfig,
  BotManagmentConfig,
  ResetPasswordPageConfig,
  ChatAppConfig,
  WhatsAppConfig,
  MailConfirmPageConfig,
  ForgotPasswordPageConfig,
  // PaymentsConfig,
  ChatDataConfig,
  MetricsConfig,
]);

export const simpleLoginRoutes = _.flatten([
  LoginConfig,
  LogoutConfig,
  Error404Config,
  ProfileConfig,
  RegisterConfig,
  AdminConfig,
  BotManagmentConfig,
  ResetPasswordPageConfig,
  ChatAppConfig,
  WhatsAppConfig,
  MailConfirmPageConfig,
  ForgotPasswordPageConfig,
  // PaymentsConfig,
  ChatDataConfig,
  MetricsConfig,
]);
