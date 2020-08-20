// import _ from "@lodash";
// import store from "app/store";

import { AdminNavConfig } from "app/main/dashboard/AdminConfig";
import { ChatAppNavConfig } from "app/main/admin-chat-area/AdminChatAreaConfig";
import { BotManagmentNavConfig } from "app/main/bot-management/BotManagmentConfig";
import { WhatsAppNavConfig } from "app/main/whatsapp/WhatsAppConfig";
import { ChatDataNavConfig } from "app/main/chat-data/ChatDataConfig";
import { MetricsNavConfig } from "app/main/metrics/config";

//import { DashboardNavConfig } from "app/main/chatbot-dashboard/DashboardConfig";
// import { PaymentsNavConfig } from "app/main/payments/PaymentsConfig";

// const navbarRoutes = store.getState().auth.navbarRoutes;
// export default _.flatten(navbarRoutes);

export default [
  BotManagmentNavConfig,
  WhatsAppNavConfig,
  ChatAppNavConfig,
  AdminNavConfig,
  ChatDataNavConfig,
  MetricsNavConfig,
];
