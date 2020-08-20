// imports
import React, { useState } from "react";

// fuse and material
import { ThemeProvider } from "@material-ui/core/styles";

// components
import "styles/end-user-chat.css";
import WidgetPreview from "./WidgetPreview";

import AppContext from "app/AppContext";

const CustomComponent = props => {
  const [themeObject, setTheme] = useState({
    color: {
      background: "#273240",
      error: {
        background: "#ff7961",
      },
    },
    widPos: { right: "1%" },
  });

  return (
    <AppContext.Consumer>
      {({ IframeController }) => (
        <ThemeProvider theme={themeObject}>
          <WidgetPreview
            setTheme={setTheme}
            IframeController={IframeController}
            {...props}
            botID={props.botID}
          />
        </ThemeProvider>
      )}
    </AppContext.Consumer>
  );
};

export default CustomComponent;
