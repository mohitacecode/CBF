// imports
import React, { Fragment, useEffect } from "react";

// material & fuse
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

//services
import BotManagementService from "app/services/bot/BotManagementService";
import AdminOwnerService from "app/services/admin/owner/AdminOwnerService";

const useStyles = makeStyles(theme => ({
  filter: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingRight: "5px",
    borderRadius: "8px",
    maxHeight: "20%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "70%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

function FilterList({
  setGetHist,
  getHist,
  setOperators,
  setBotName,
  channels,
  operators,
  botName,
  setSelectedIndex1,
  selectedIndex1,
  setSelectedIndex2,
  selectedIndex2,
  setSelectedIndex3,
  selectedIndex3,
  statuses,
  chatStatuses,
  setChatStatuses,
  selectedFromDate,
  setSelectedFromDate,
  selectedToDate,
  setSelectedToDate,
}) {
  const classes = useStyles();

  useEffect(() => {
    AdminOwnerService.getOperators().then(res => {
      if (res.data.length > 0) {
        setOperators([...res.data]);
      }
    });
    BotManagementService.getBots({ errorNotify: false }).then(res => {
      if (res.data.length > 0) {
        setBotName([...res.data]);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <FormControlLabel
        onClick={() => {
          setGetHist(!getHist);
        }}
        value="start"
        control={<Switch checked={getHist} color="primary" />}
        label="Show Historic Chats"
        labelPlacement="start"
      />
      {/* Channel */}
      <Paper className={classes.filter} elevation={2}>
        <List component="span" aria-label="Device settings">
          <ListItem
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="when device is locked"
          >
            <ListItemText primary={"Channels -"} />
          </ListItem>
        </List>

        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-mutiple-name-label"
            id="lock-menu"
            multiple
            value={selectedIndex1}
            onChange={e => {
              setSelectedIndex1(e.target.value);
            }}
            renderValue={selectedIndex1 => (
              <div className={classes.chips}>
                {selectedIndex1.map(value => {
                  const label = channels[value];
                  return (
                    <Chip key={value} label={label} className={classes.chip} color="secondary" />
                  );
                })}
              </div>
            )}
            input={<Input id="select-multiple-checkbox" />}
          >
            {channels.length > 0 ? (
              channels.map((channel, index) =>
                channel !== "none" ? (
                  <MenuItem style={{ width: "400px" }} key={channel + index} value={index}>
                    <Checkbox checked={selectedIndex1.indexOf(index) !== -1} />
                    <ListItemText primary={channel} />
                  </MenuItem>
                ) : (
                  <MenuItem style={{ width: "400px" }} key={channel + index} value={index}>
                    {channel}
                  </MenuItem>
                )
              )
            ) : (
              <MenuItem style={{ width: "400px" }} selected={true}>
                {"none"}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Paper>
      {/* Operator */}
      <Paper className={classes.filter} elevation={2}>
        <List component="span" aria-label="Device settings">
          <ListItem
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="when device is locked"
          >
            <ListItemText primary={"Operators -"} />
          </ListItem>
        </List>

        <FormControl className={classes.formControl}>
          <Select
            id="lock-menu1"
            multiple
            value={selectedIndex2}
            onChange={e => {
              setSelectedIndex2(e.target.value);
            }}
            renderValue={items => (
              <div className={classes.chips}>
                {items.map(value => {
                  const label = operators[value].first_name + " " + operators[value].last_name;
                  return (
                    <Chip key={value} label={label} className={classes.chip} color="secondary" />
                  );
                })}
              </div>
            )}
            input={<Input id="select-multiple-checkbox" />}
          >
            {operators.length > 0 ? (
              operators.map((operator, index) => {
                const label = operator.first_name + " " + operator.last_name;
                return (
                  <MenuItem style={{ width: "400px" }} key={label + index} value={index}>
                    <Checkbox checked={selectedIndex2.indexOf(index) !== -1} />
                    <ListItemText primary={label} />
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem style={{ width: "400px" }} selected={true}>
                {"none"}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Paper>
      {/* Bot Name */}
      <Paper className={classes.filter} elevation={2}>
        <List component="span" aria-label="Device settings">
          <ListItem
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="when device is locked"
          >
            <ListItemText primary={"Bot -"} />
          </ListItem>
        </List>

        <FormControl className={classes.formControl}>
          <Select
            id="lock-menu1"
            multiple
            value={selectedIndex3}
            onChange={e => {
              setSelectedIndex3(e.target.value);
            }}
            renderValue={selectedIndex3 => (
              <div className={classes.chips}>
                {selectedIndex3.map(value => (
                  <Chip
                    key={value}
                    label={botName[value].title}
                    className={classes.chip}
                    color="secondary"
                  />
                ))}
              </div>
            )}
            input={<Input id="select-multiple-checkbox" />}
          >
            {botName.length > 0 ? (
              botName.map((bot, index) => (
                <MenuItem style={{ width: "400px" }} key={bot.title + index} value={index}>
                  <Checkbox checked={selectedIndex3.indexOf(index) !== -1} />
                  <ListItemText primary={bot.title} />
                </MenuItem>
              ))
            ) : (
              <MenuItem style={{ width: "400px" }} selected={true}>
                {"none"}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Paper>
      {/*Status*/}
      <Paper className={classes.filter} elevation={2}>
        <List component="span" aria-label="Device settings">
          <ListItem
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="when device is locked"
          >
            <ListItemText primary={"Status -"} />
          </ListItem>
        </List>

        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-mutiple-name-label"
            id="lock-menu"
            multiple
            value={chatStatuses}
            onChange={e => {
              setChatStatuses(e.target.value);
            }}
            renderValue={chatStatuses => (
              <div className={classes.chips}>
                {chatStatuses.map(value => {
                  const label = statuses[value];
                  return (
                    <Chip key={value} label={label} className={classes.chip} color="secondary" />
                  );
                })}
              </div>
            )}
            input={<Input id="select-multiple-checkbox" />}
          >
            {statuses.map((status, index) => (
              <MenuItem style={{ width: "400px" }} key={status} value={index}>
                <Checkbox checked={chatStatuses.indexOf(index) !== -1} />
                <ListItemText primary={status} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      <div className="flex">
        <Paper className={[classes.filter, "py-10"]}>
          <TextField
            id="date"
            label="From"
            type="date"
            value={selectedFromDate}
            onChange={e => {
              setSelectedFromDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>
        <Paper className={[classes.filter, "py-10"]}>
          <TextField
            id="date"
            label="To"
            type="date"
            value={selectedToDate}
            onChange={e => {
              setSelectedToDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Paper>
      </div>
    </Fragment>
  );
}

export default FilterList;
