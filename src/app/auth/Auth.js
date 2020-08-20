import React, { useEffect, useState } from "react";
import { renderRoutes } from "react-router-config";
import { withRouter } from "react-router";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "app/auth/store/actions";

import { unAuthenticatedRoute } from "app/fuse-configs/routesConfig";

//components
import FuseDialog from "@fuse/core/FuseDialog";
import FuseMessage from "@fuse/core/FuseMessage";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import FuseSuspense from "@fuse/core/FuseSuspense";
import FooterLayout2 from "app/fuse-layouts/layout2/components/FooterLayout2";
import LeftSideLayout2 from "app/fuse-layouts/layout2/components/LeftSideLayout2";
import NavbarWrapperLayout2 from "app/fuse-layouts/layout2/components/NavbarWrapperLayout2";
import RightSideLayout2 from "app/fuse-layouts/layout2/components/RightSideLayout2";
import ToolbarLayout2 from "app/fuse-layouts/layout2/components/ToolbarLayout2";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    "&.boxed": {
      maxWidth: 1280,
      margin: "0 auto",
      boxShadow: theme.shadows[3],
    },
    "&.container": {
      "& .container": {
        maxWidth: 1120,
        width: "100%",
        margin: "0 auto",
      },
      "& .navigation": {},
    },
  },
  content: {
    display: "flex",
    overflow: "auto",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
    "-webkit-overflow-scrolling": "touch",
    zIndex: 4,
  },
  toolbarWrapper: {
    display: "flex",
    position: "relative",
    zIndex: 5,
  },
  toolbar: {
    display: "flex",
    flex: "1 0 auto",
  },
  footerWrapper: {
    position: "relative",
    zIndex: 5,
  },
  footer: {
    display: "flex",
    flex: "1 0 auto",
  },
}));

let unlisten = null;
function Auth({ children, history, location }) {
  const dispatch = useDispatch();
  //let isAuthenticate = null;
  const [loading, setLoading] = useState(true);

  //redux
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });

  const [auth, setAuth] = useState(isAuthenticate);
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);

  const classes = useStyles();
  useEffect(() => {
    dispatch(userActions.getProfile()).then(() => {
      setLoading(false);
    });
    return () => {
      if (unlisten !== null) {
        unlisten();
        unlisten = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (unlisten !== null) {
      unlisten();
      unlisten = null;
    }
    setAuth(isAuthenticate);
  }, [isAuthenticate]);

  useEffect(() => {
    unlisten = history.listen((location, action) => {
      if (
        auth === false &&
        location &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/mail-confirm/:uidb64/:token" &&
        location.pathname !== "/password-reset/:uidb64/:token"
      ) {
        //console.log(location.pathname);
        history.push("/login");
      } else if (auth && location.pathname === "/login") {
        //console.log("why here");
        history.push("/");
      } else {
        //console.log("come on!!");
      }
    });
    //eslint-disable-next-line
  }, [auth]);

  const show = function (argument) {
    if (loading || isAuthenticate !== auth) {
      return <FuseSplashScreen />;
    } else {
      if (auth) {
        //console.log(auth);
        return children;
      } else {
        //console.log(auth)
        return (
          <div id="fuse-layout" className={clsx(classes.root, config.mode)}>
            {config.leftSidePanel.display && <LeftSideLayout2 />}

            <div className="flex flex-1 flex-col overflow-hidden relative">
              {config.toolbar.display && config.toolbar.position === "above" && <ToolbarLayout2 />}

              {config.navbar.display && <NavbarWrapperLayout2 />}

              {config.toolbar.display && config.toolbar.position === "below" && <ToolbarLayout2 />}

              <FuseScrollbars className={classes.content} scrollToTopOnRouteChange>
                <FuseDialog />

                <div className="flex flex-auto flex-col relative h-full">
                  <FuseSuspense>{renderRoutes(unAuthenticatedRoute)}</FuseSuspense>

                  {children}

                  {config.footer.display && config.footer.style === "static" && <FooterLayout2 />}
                </div>
              </FuseScrollbars>

              {config.footer.display && config.footer.style === "fixed" && <FooterLayout2 />}

              {/*<SettingsPanel />*/}
            </div>

            {config.rightSidePanel.display && <RightSideLayout2 />}

            <FuseMessage />
          </div>
          //<FuseSuspense>{renderRoutes(unAuthenticatedRoute)}</FuseSuspense>
        );
      }
    }
  };
  return show();
  //return children;
}

export default withRouter(Auth);
