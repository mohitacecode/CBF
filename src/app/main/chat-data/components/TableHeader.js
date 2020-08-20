import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

const TableHeader = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map(header => {
          return <TableCell key={header}>{header}</TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
