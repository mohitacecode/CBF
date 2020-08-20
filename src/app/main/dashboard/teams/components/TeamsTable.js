import React, { Fragment, useEffect, useState } from "react";
import _ from "@lodash";
//material-ui & fuse
import {
  Icon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  Tooltip,
  TableRow,
  TablePagination,
  Typography,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseLoading from "@fuse/core/FuseLoading";
//redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
//router
import { withRouter } from "react-router-dom";

import TeamTableHeader from "./TeamTableHeader";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  divider: {
    margin: theme.spacing(2),
  },
  teamHeader: {
    paddingLeft: "30px",
    paddingTop: "10px",
  },
}));
function TeamsTable(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // redux state
  const operatorDetails = useSelector(({ Operators }) => Operators.teams.data);
  const searchText = useSelector(({ Operators }) => Operators.teams.searchText);
  // local state
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(operatorDetails);
  const [page, setPage] = useState(0);
  const [statusData, setStatusData] = useState({});
  const [AOid, setAOid] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  function objToString(object) {
    var str = "";
    for (var k in object) {
      if (object.hasOwnProperty(k)) {
        str += object[k];
      }
    }
    return str;
  }

  useEffect(() => {
    if (isAuthenticate) {
      if (searchText.length !== 0) {
        setData(
          _.filter(operatorDetails, item =>
            objToString(item).toLowerCase().includes(searchText.toLowerCase())
          )
        );
        setPage(0);
      } else {
        setData(operatorDetails);
      }
    } else {
      props.history.push("/login");
    }
    // eslint-disable-next-line
  }, [operatorDetails, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/operatorform/${item.id}`);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }
  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancel1 = () => {
    setOpen1(false);
  };
  const handleOk = () => {
    setOpen(false);
    dispatch(Actions.changeAOstatus(AOid, { ...statusData }));
  };
  const handleOk1 = () => {
    setOpen1(false);
    dispatch(Actions.deleteOperator(AOid));
  };
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  function handleDeleteRow(event, id) {
    event.stopPropagation();
  }
  const deleteOperator = (event, n) => {
    //event.stopPropagation();
    setAOid(n.id);
    setOpen1(true);
  };
  const toggleChecked = (event, n) => {
    setAOid(n.id);
    setStatusData({ ...n, is_active: !n.is_active });
    setOpen(true);
  };
  return (
    <div className="w-full flex flex-col">
      {props.team.name !== "none" ? (
        <Fragment>
          <Typography className={classes.teamHeader} variant="h6" component="span">
            {props.team.name}
            <Typography variant="subtitile2" component="h6">
              {props.team.description}
            </Typography>
          </Typography>
          <Divider className={classes.divider} />
        </Fragment>
      ) : null}
      <FuseLoading overlay={props.loading}>
        {props.noData ? (
          <Typography style={{ padding: "30px" }} variant="h5" component="span">
            No Data Available
          </Typography>
        ) : (
          <FuseScrollbars className="flex-grow">
            <TableContainer className={classes.container}>
              <Table className="min-w-xl" aria-labelledby="tableTitle">
                <TeamTableHeader
                  numSelected={selected.length}
                  order={order}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data ? data.length : 0}
                />

                <TableBody>
                  {_.orderBy(
                    data,
                    [
                      o => {
                        switch (order.id) {
                          case "categories": {
                            return o.categories[0];
                          }
                          default: {
                            return o[order.id];
                          }
                        }
                      },
                    ],
                    [order.direction]
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                      const isSelected = selected.indexOf(n.id) !== -1;
                      return (
                        <TableRow
                          className="h-64 cursor-pointer"
                          hover
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                          onClick={event => handleClick(n)}
                        >
                          <TableCell component="th" scope="row">
                            {n.first_name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {n.last_name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {n.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {n.phone_number}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {n.city}
                          </TableCell>
                          <TableCell component="th" scope="row" align="left">
                            <Tooltip title="Activate / Deactivate" arrow>
                              <Button onClick={event => handleDeleteRow(event, n.id)}>
                                {n.is_active ? (
                                  <Icon
                                    className="text-green text-20"
                                    onClick={e => toggleChecked(e, n)}
                                  >
                                    check_circle
                                  </Icon>
                                ) : (
                                  <Icon
                                    className="text-red text-20"
                                    onClick={e => toggleChecked(e, n)}
                                  >
                                    remove_circle
                                  </Icon>
                                )}
                                <Dialog
                                  disableBackdropClick
                                  disableEscapeKeyDown
                                  maxWidth="xs"
                                  aria-labelledby="confirmation-dialog-title"
                                  open={open}
                                  onClose={handleCancel}
                                >
                                  <DialogTitle id="confirmation-dialog-title">
                                    Change Admin Operator Active Status
                                  </DialogTitle>
                                  <DialogContent dividers>
                                    Do you want to change this Admin Operator's status?{" "}
                                  </DialogContent>
                                  <DialogActions>
                                    <Button autoFocus onClick={handleCancel} color="primary">
                                      Cancel
                                    </Button>
                                    <Button onClick={handleOk} color="primary">
                                      Ok
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </Button>
                            </Tooltip>
                          </TableCell>
                          <TableCell component="th" scope="row" align="left">
                            <Button onClick={event => handleDeleteRow(event, n.id)}>
                              <Icon
                                onClick={event => {
                                  deleteOperator(event, n);
                                }}
                              >
                                delete
                              </Icon>
                              <Dialog
                                disableBackdropClick
                                disableEscapeKeyDown
                                maxWidth="xs"
                                aria-labelledby="confirmation-dialog-title"
                                open={open1}
                                onClose={handleCancel1}
                              >
                                <DialogTitle id="confirmation-dialog-title">
                                  Delete Operator
                                </DialogTitle>
                                <DialogContent dividers>
                                  Do you want to delete this operator?{" "}
                                </DialogContent>
                                <DialogActions>
                                  <Button autoFocus onClick={handleCancel1} color="primary">
                                    Cancel
                                  </Button>
                                  <Button onClick={handleOk1} color="primary">
                                    Ok
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </FuseScrollbars>
        )}

        {props.noData ? null : (
          <TablePagination
            className="overflow-hidden"
            component="div"
            count={data ? data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </FuseLoading>
    </div>
  );
}

export default withRouter(TeamsTable);
