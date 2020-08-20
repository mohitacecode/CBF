import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Icon from "@material-ui/core/Icon";
import Link from "@material-ui/core/Link";
import _ from "@lodash";

export default function BreadcrumbHelper({ route, home = true }) {
  const getRouterNav = function ({ breadcrumbs }) {
    let navObj = _.map(breadcrumbs, (obj, i) => {
      if (breadcrumbs.length === i + 1) {
        return <Typography color="textPrimary">{obj.name}</Typography>;
      } else {
        return (
          <Link href={obj.link ? obj.link : "javascript:void(0)"} color="inherit">
            {obj.name}
          </Link>
        );
      }
    });
    if (home) {
      navObj = [
        <Link href={"/"} color="inherit">
          <Icon>{"home"}</Icon>
        </Link>,
      ].concat(navObj);
    }
    return navObj;
  };
  return route && route.breadcrumbs ? (
    <Breadcrumbs aria-label="breadcrumb">{getRouterNav(route)}</Breadcrumbs>
  ) : null;
}
