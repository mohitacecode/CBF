//react
import React from "react";
//material-ui
// import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
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
    id: "phone",
    align: "left",
    disablePadding: false,
    label: "Phone Number",
    sort: true,
  },
  {
    id: "active",
    align: "left",
    disablePadding: false,
    label: "Active",
    sort: true,
  },
];

function ProductsTableHead(props) {
  // const classes = useStyles(props);
  // const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  // function openSelectedProductsMenu(event) {
  // 	setSelectedProductsMenu(event.currentTarget);
  // }

  // function closeSelectedProductsMenu() {
  // 	setSelectedProductsMenu(null);
  // }

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

export default ProductsTableHead;
