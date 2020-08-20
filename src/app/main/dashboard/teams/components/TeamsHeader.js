// import
import React, { useState, useEffect } from "react";

// fuse & material
import { makeStyles } from "@material-ui/core/styles";
import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseLoading from "@fuse/core/FuseLoading";
import { showMessage } from "app/store/actions/fuse";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl } from "@material-ui/core";
// redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";

// services
import TeamService from "app/services/admin/teams";

const useStyles = makeStyles(theme => ({
  textArea: {
    height: "100px",
    width: "100%",
    borderColor: "black",
    padding: theme.spacing(1),
    borderWidth: "2px",
    color: "black",
    borderRadius: "5px",
  },
  dropdown: {
    color: "black",
    background: "white",
    borderRadius: " 10px",
    width: "300px",
    height: "40px",
    marginLeft: "180px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  input: {
    padding: "5px",
    marginLeft: "0%",
    border: "2px solid black",
    marginBottom: "10px",
    background: "white",
    color: "black",
    borderRadius: "5px",
  },
  dialog: {
    background: "white",
    color: "black",
  },
}));

function TeamsHeader({ teams, setTeams, selectedIndex, setSelectedIndex }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // redux state
  const searchText = useSelector(({ Operators }) => Operators.teams.searchText);
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  // local state
  const [dialOpen, setDailOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dialOpen === false) {
      setLoading(true);
      TeamService.getTeams()
        .then(res => {
          if (res.data.length > 0) {
            setTeams([...res.data]);
          } else {
            setTeams([{ name: "none", id: null }]);
          }
          setLoading(false);
        })
        .catch(err => {
          setTeams([{ name: "none", id: null }]);
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [dialOpen]);

  const saveRoom = () => {
    TeamService.addTeam({
      data: {
        name: teamName,
        description: teamDesc,
      },
    })
      .then(res => {
        dispatch(showMessage({ message: "New Team Added", variant: "success" }));
        setDailOpen(false);
        setTeamDesc(" ");
        setTeamName(" ");
      })
      .catch(err => {
        dispatch(showMessage({ message: "Failed to Add Team", variant: "error" }));
        setDailOpen(false);
        setTeamDesc(" ");
        setTeamName(" ");
      });
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">people</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Teams
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-24 mx-auto">
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation="transition.slideDownIn" delay={300}>
            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
              <Icon color="action">search</Icon>

              <Input
                placeholder="Search Operator"
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={ev => dispatch(Actions.setTeamsSearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>
      <FormControl variant="outlined" className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16">
        <List component="span" aria-label="Device settings" className="flex flex-1">
          <Tooltip title="List of Teams" arrow placement="left">
            <ListItem
              className={classes.dropdown}
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              onClick={event => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <ListItemText
                primary={<FuseLoading overlay={loading}>{teams[selectedIndex].name}</FuseLoading>}
              />
              <ArrowDropDownIcon style={{ color: "gray" }} />
            </ListItem>
          </Tooltip>
        </List>

        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          {teams.map((team, index) => (
            <MenuItem
              style={{ width: "250px" }}
              key={index}
              selected={index === selectedIndex}
              onClick={event => {
                setSelectedIndex(index);
                setAnchorEl(null);
              }}
            >
              {team.name}
            </MenuItem>
          ))}
        </Menu>
      </FormControl>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button
          onClick={() => {
            setDailOpen(true);
          }}
          className="whitespace-no-wrap normal-case"
          variant="contained"
          color="secondary"
        >
          <span className="hidden sm:flex">Add New Team</span>
          <span className="flex sm:hidden">New</span>
        </Button>
      </FuseAnimate>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={dialOpen}
        onClose={() => {
          setDailOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent className={classes.dialog}>
          <Typography variant="h6" style={{ marginBottom: "10px" }} component="h6">
            Add New Team
          </Typography>
          <Typography variant="subtitle2" component="h6">
            {"Team Name"}
            <Input
              className={classes.input}
              placeholder="team name"
              disableUnderline
              fullWidth
              value={teamName}
              inputProps={{
                "aria-label": "Search",
              }}
              onChange={e => setTeamName(e.target.value)}
            />
            {"Team Description"}
            <textarea
              className={classes.textArea}
              value={teamDesc}
              onChange={e => {
                setTeamDesc(e.target.value);
              }}
              placeholder="Enter Team Description"
            />
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button
            onClick={() => {
              setDailOpen(false);
            }}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
          <Button onClick={saveRoom} variant="contained" color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TeamsHeader;
