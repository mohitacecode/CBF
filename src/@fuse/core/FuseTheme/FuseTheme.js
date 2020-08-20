import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { trackPage } from "withTracker";

const useEnhancedEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function FuseTheme(props) {
  useEffect(() => {
    const page = window.location.href.split("#")[1];
    trackPage(page);
  });

  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const direction = useSelector(({ fuse }) => fuse.settings.defaults.direction);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  // console.warn('FuseTheme:: rendered',mainTheme);
  return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default React.memo(FuseTheme);
