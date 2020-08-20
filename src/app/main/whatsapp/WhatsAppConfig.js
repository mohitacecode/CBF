import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

export const WhatsAppNavConfig = {
  id: "whatsapp",
  title: "WhatsApp",
  translate: "WhatsApp",
  type: "group",
  icon: <WhatsAppIcon fontSize="small" className="float-left pb-4 h-20 pt-0 pl-0 pr-4" />,
  children: [
    {
      id: "whatsappChannels",
      title: "WhatsApp Testing",
      translate: "WhatsApp Testing",
      type: "item",
      icon: "forum",
      url: "/whatsappChannels",
    },
    {
      id: "whatsappBusiness",
      title: "WhatsApp Business",
      translate: "WhatsApp Business",
      type: "item",
      icon: "business_center",
      url: "/whatsappBusiness",
    },
    {
      id: "whatsappTemplates",
      title: "WhatsApp Templates",
      translate: "WhatsApp Templates",
      type: "item",
      icon: "color_lens",
      url: "/whatsappTemplates",
    },
  ],
};

const WhatsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/whatsappChannels",
      component: React.lazy(() => import("./WhatsAppChannel")),
    },
    {
      path: "/whatsappBusiness",
      component: React.lazy(() => import("./WhatsAppBusiness")),
    },
    {
      path: "/whatsappTemplates",
      component: React.lazy(() => import("./WhatsAppTemplates")),
    },
    {
      path: "/addTemplates/new",
      component: React.lazy(() => import("./components/TemplatesForm")),
    },
    {
      path: "/channelform/new",
      component: React.lazy(() => import("./components/ChannelForm")),
    },
    {
      path: "/channelform/:channel_hash",
      component: React.lazy(() => import("./components/ChannelForm")),
    },
    {
      path: "/businessform/new",
      component: React.lazy(() => import("./components/BusinessForm")),
    },
    {
      path: "/businessform/:account_id",
      component: React.lazy(() => import("./components/BusinessForm")),
    },
    {
      path: "/detailsform/new",
      component: React.lazy(() => import("./components/DetailsForm")),
    },
    {
      path: "/detailsform/:account_id",
      component: React.lazy(() => import("./components/DetailsForm")),
    },
  ],
};

export default WhatsAppConfig;
