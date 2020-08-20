import BotListConfig, { BotListNavConfig } from "./bot-list/BotListConfig";
import BuilderConfig from "./builder/BuilderConfig";
import TemplatesConfig, { TemplatesNavConfig } from "./templates/TemplatesConfig";
const BotManagmentConfig = [BotListConfig, BuilderConfig, TemplatesConfig];

export const BotManagmentNavConfig = {
  id: "managment",
  title: "Bot Managment",
  type: "group",
  icon: "adb",
  direction: "bottom-end",
  children: [BotListNavConfig, TemplatesNavConfig],
};

export default BotManagmentConfig;
