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
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

//services
import BotManagementService from "app/services/bot/BotManagementService";

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
  setBotName,
  channels,
  botName,
  setSelectedIndex1,
  selectedIndex1,
  setSelectedIndex3,
  selectedIndex3,
}) {
  const classes = useStyles();

  useEffect(() => {
    BotManagementService.getBots({ errorNotify: false }).then(res => {
      if (res.data.length > 0) {
        setBotName([...res.data]);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {/* Channel */}
      <FormControlLabel
        onClick={() => {
          setGetHist(!getHist);
        }}
        value="start"
        control={<Switch checked={getHist} color="primary" />}
        label="Show Historic Chats"
        labelPlacement="start"
      />
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
                {selectedIndex1.map(value => (
                  <Chip
                    key={value}
                    label={channels[value]}
                    className={classes.chip}
                    color="secondary"
                  />
                ))}
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
      {/* <Paper className={classes.filter} elevation={2}>
				<List component="span" aria-label="Device settings">
					<ListItem aria-haspopup="true" aria-controls="lock-menu" aria-label="when device is locked">
						<ListItemText primary={"Channels -"} />
					</ListItem>
				</List>
				<List component="button" aria-label="Device settings" className="flex flex-1">
					<ListItem
						button
						aria-haspopup="true"
						aria-controls="lock-menu"
						aria-label="when device is locked"
						onClick={(event) => {
							setAnchorEl1(event.currentTarget);
						}}>
						<ListItemText primary={<FuseLoading overlay={loading}>{channels[selectedIndex1]}</FuseLoading>} />
						<ArrowDropDownIcon style={{ color: "gray" }} />
					</ListItem>
				</List>
				<Menu
					id="lock-menu"
					anchorEl={anchorEl1}
					keepMounted
					open={Boolean(anchorEl1)}
					onClose={() => {
						setAnchorEl1(null);
					}}>
					{channels.length > 0 ? (
						channels.map((channel, index) => (
							<MenuItem
								style={{ width: "400px" }}
								key={index}
								selected={index === selectedIndex1}
								onClick={(event) => {
									setSelectedIndex1(index);
									setAnchorEl1(null);
								}}>
								{channel}
							</MenuItem>
						))
					) : (
						<MenuItem
							style={{ width: "400px" }}
							selected={true}
							onClick={(event) => {
								setSelectedIndex1(0);
								setAnchorEl1(null);
							}}>
							{"none"}
						</MenuItem>
					)}
				</Menu>
			</Paper> */}
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
      {/* <Paper className={classes.filter} elevation={2}>
				<List component="span" aria-label="Device settings">
					<ListItem aria-haspopup="true" aria-controls="lock-menu" aria-label="when device is locked">
						<ListItemText primary={"Bot -"} />
					</ListItem>
				</List>
				<List component="button" aria-label="Device settings" className="flex flex-1">
					<ListItem
						button
						aria-haspopup="true"
						aria-controls="lock-menu"
						aria-label="when device is locked"
						onClick={(event) => {
							setAnchorEl3(event.currentTarget);
						}}>
						<ListItemText primary={<FuseLoading overlay={loading}>{botName[selectedIndex3].title}</FuseLoading>} />
						<ArrowDropDownIcon style={{ color: "gray" }} />
					</ListItem>
				</List>
				<Menu
					id="lock-menu"
					anchorEl={anchorEl3}
					keepMounted
					open={Boolean(anchorEl3)}
					onClose={() => {
						setAnchorEl3(null);
					}}>
					{botName.length > 0 ? (
						botName.map((bot, index) => (
							<MenuItem
								style={{ width: "400px" }}
								key={index}
								selected={index === selectedIndex3}
								onClick={(event) => {
									setSelectedIndex3(index);
									setAnchorEl3(null);
								}}>
								{bot.title}
							</MenuItem>
						))
					) : (
						<MenuItem
							style={{ width: "400px" }}
							selected={true}
							onClick={(event) => {
								setSelectedIndex3(0);
								setAnchorEl3(null);
							}}>
							{"none"}
						</MenuItem>
					)}
				</Menu>
			</Paper> */}
    </Fragment>
  );
}

export default FilterList;
