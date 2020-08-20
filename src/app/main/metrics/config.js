import React from "react";
import AssessmentIcon from "@material-ui/icons/AssessmentOutlined";

export const MetricsNavConfig = {
  id: "metrics",
  title: "Metrics",
  translate: "Metrics",
  type: "group",
  icon: <AssessmentIcon fontSize="small" className="float-left pb-4 h-20 pt-0 pl-0 pr-4" />,
  children: [
    {
      id: "metricsChart",
      title: "Metrics Chart",
      translate: "Metrics Chart",
      type: "item",
      icon: "forum",
      url: "/metricsChart",
    },
    {
      id: "metricsTable",
      title: "Metrics Table",
      translate: "Metrics Table",
      type: "item",
      icon: "business_center",
      url: "/metricsTable",
    },
  ],
};

const MetricsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/metricsChart",
      component: React.lazy(() => import("./Chart")),
    },
    {
      path: "/metricsTable",
      component: React.lazy(() => import("./Table")),
    },
  ],
};

export default MetricsConfig;
