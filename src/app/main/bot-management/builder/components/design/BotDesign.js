import React, { useState, useEffect } from "react";

// material and fuse
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseScrollbars from "@fuse/core/FuseScrollbars";

// components
import EditPanel from "./components/EditPanel";
import Widget from "./components/Widget";
import themeObj from "app/end-user-chat/themes";

// services
import BotDetailService from "app/services/bot/BotDetailService";

const useStyles = makeStyles(theme => ({
  layoutRoot: {
    display: "flex",
    overflow: "hidden",
    height: "calc(100vh - 84px)",
  },
  formWidth: {
    width: "calc(100% - 300px)",
  },
}));

function BotDesign({ botID }) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [themeObject, setTheme] = useState({ color: themeObj["defaultTheme"] });

  const [botOnline, setBotOnline] = useState(true);
  // local state
  const [design, setDesign] = useState({
    chatboxname: "",
    theme: "",
    online_status: "",
    offline_status: "",
    offline_msg: "",
    widget_position: "",
    defaultOpen: false,
    button_label: false,
    label_text: "",
    visibility: "",
  });

  const updateTheme = function (data) {
    setTheme((prevState, props) => {
      return { color: { ...prevState.color, ...themeObj[data.theme] } };
    });
  };

  useEffect(() => {
    BotDetailService.getBotDesign({ pathParam: { id: botID } })
      .then(response => {
        setDesign({ ...response.data });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateTheme(design);
  }, [design]);

  return (
    <FuseLoading overlay={isLoading}>
      <div className={classes.layoutRoot}>
        <ThemeProvider theme={themeObj}>
          <FuseScrollbars className={classes.formWidth}>
            <EditPanel
              botID={botID}
              design={design}
              botOnline={botOnline}
              setBotOnline={val => setBotOnline(val)}
              setDesign={data => setDesign(data)}
            />
          </FuseScrollbars>
        </ThemeProvider>
        <ThemeProvider theme={themeObject}>
          <Widget botID={botID} design={design} botOnline={botOnline} dummy={true} />
        </ThemeProvider>
      </div>
    </FuseLoading>
  );
}
export default BotDesign;
