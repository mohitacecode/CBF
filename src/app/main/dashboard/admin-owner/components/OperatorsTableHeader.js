import { TableCell, TableHead, TableRow, Tooltip, TableSortLabel } from "@material-ui/core";

import React from "react";

const rows = [
  // {
  // 	id: "id",
  // 	align: "left",
  // 	disablePadding: false,
  // 	label: "ID",
  // 	sort: true
  // },
  {
    id: "username",
    align: "left",
    disablePadding: false,
    label: "First Name",
    sort: true,
  },
  {
    id: "lastname",
    align: "left",
    disablePadding: false,
    label: "Last Name",
    sort: true,
  },
  {
    id: "email",
    align: "left",
    disablePadding: false,
    label: "Email",
    sort: true,
  },
  {
    id: "team",
    align: "left",
    disablePadding: false,
    label: "Team",
    sort: true,
  },
  {
    id: "phone",
    align: "left",
    disablePadding: false,
    label: "Phone Number",
    sort: true,
  },
  {
    id: "city",
    align: "left",
    disablePadding: false,
    label: "City",
    sort: true,
  },
  {
    id: "active",
    align: "left",
    disablePadding: false,
    label: "Active",
    sort: true,
  },
  {
    id: "button",
    align: "left",
    disablePadding: false,
    label: "",
    sort: true,
  },
];

function OperatorTableHeader(props) {
  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === "right" ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OperatorTableHeader;
