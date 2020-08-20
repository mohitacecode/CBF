import FuseNavigation from "@fuse/core/FuseNavigation";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

function Navigation(props) {
  const navigation = useSelector(({ fuse }) => fuse.navigation);
  const user = useSelector(({ auth }) => auth.user.user);
  let nav = [...navigation];

  if (user.role === "AO") {
    let temp = [];
    navigation.forEach(nav => {
      if (nav.id === "chats" || nav.id === "user") {
        temp.push(nav);
      }
    });

    temp.forEach(nav => {
      if (nav.id === "chats") {
        nav.children.forEach((child, index) => {
          if (child.id === "My_Chat") {
            nav.children.splice(0, index);
            nav.children.splice(index, nav.children.length);
          }
        });
      }
    });
    nav = [...temp];
  } else {
    nav = [...navigation];
  }

  return (
    <FuseNavigation
      className={clsx("navigation", props.className)}
      navigation={nav}
      layout={props.layout}
      dense={props.dense}
      active={props.active}
    />
  );
}

Navigation.defaultProps = {
  layout: "vertical",
};

export default React.memo(Navigation);
