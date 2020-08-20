import React, { useState, useEffect } from "react";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useTheme, Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//router
import { Link, useParams } from "react-router-dom";
//formsy
import Formsy from "formsy-react";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";
import reducer from "../../store/reducers";
import { showMessage } from "app/store/actions/fuse";
import TeamService from "app/services/admin/teams";

const useStyles = makeStyles(theme => ({
  dropdown: {
    color: "black",
    background: "white",
    borderRadius: " 10px",
    width: "300px",
    height: "40px",
    border: "1px solid gray",
  },
}));

function OperatorForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const operatorDetails = useSelector(({ Operators }) => Operators.operator.data);
  const password_gen = useSelector(({ Operators }) => Operators.operator.password);
  const theme = useTheme();
  const tabValue = 0;
  const routeParams = useParams();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [teams, setTeams] = useState([{ name: "none" }]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  function disableButton() {
    setIsFormValid(false);
  }

  useEffect(() => {
    if (teams.length > 0 && operatorDetails) {
      teams.forEach((team, index) => {
        if (team.id === operatorDetails.team_member) {
          setSelectedIndex(index);
        }
      });
    } // eslint-disable-next-line
  }, [teams, operatorDetails]);

  useEffect(() => {
    if (isAuthenticate) {
      TeamService.getTeams()
        .then(res => {
          if (res.data.length > 0) {
            setTeams([{ name: "none" }, ...res.data]);
          } else {
            setTeams([{ name: "none" }]);
          }
        })
        .catch(err => {
          setTeams([{ name: "none" }]);
        });
    } else {
      props.history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  function enableButton() {
    setIsFormValid(true);
  }
  React.useEffect(() => {
    if (routeParams.id === "new") dispatch(Actions.newOperator());
    else dispatch(Actions.getOperator(routeParams.id));
  }, [dispatch, routeParams.id]);

  const submitData = model => {
    if (routeParams.id === "new") {
      if (model.password === model.password2) {
        model.avatar = null;
        let data = { ...model };
        if (selectedIndex !== 0) {
          data = { ...data, team_member: teams[selectedIndex].id };
        } else {
          data = { ...data, team_member: null };
        }
        dispatch(Actions.saveOperator(routeParams.id, data, props.history));
      } else {
        dispatch(showMessage({ message: "Password Does Not Match!!!" }));
      }
    } else {
      model.role = "AO";
      let data = { ...model };
      if (selectedIndex !== 0) {
        data = { ...data, team_member: teams[selectedIndex].id };
      } else {
        data = { ...data, team_member: null };
      }
      dispatch(Actions.saveOperator(routeParams.id, data, props.history));
    }
  };

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Typography
                className="normal-case flex items-center sm:mb-12"
                component={Link}
                role="button"
                to="/operators"
                color="inherit"
              >
                <Icon className="text-20">
                  {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                </Icon>
                <span className="mx-4">Operators</span>
              </Typography>
            </FuseAnimate>

            <div className="flex items-center max-w-full">
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    {operatorDetails
                      ? operatorDetails.first_name !== ""
                        ? operatorDetails.first_name
                        : "New Operator"
                      : "New Operator"}
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="caption">Operator Details</Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary"
              form="formsy"
              type="submit"
              disabled={!isFormValid}
            >
              Save
            </Button>
          </FuseAnimate>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 max-w-2xl">
          {tabValue === 0 && (
            <div>
              <Formsy
                id="formsy"
                onValidSubmit={submitData}
                onValid={enableButton}
                onInvalid={disableButton}
              >
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  required
                  variant="outlined"
                  fullWidth
                  value={operatorDetails ? operatorDetails.first_name : ""}
                  validations={{
                    minLength: 1,
                    maxLength: 50,
                    isWords: true,
                  }}
                  validationErrors={{
                    minLength: "Min character length is 1",
                    maxLength: "Max character length is 50",
                    isWords: "It should only contain letters",
                  }}
                  name="first_name"
                  label="First Name"
                  id="first_name"
                  autoComplete="current-username"
                />
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  required
                  variant="outlined"
                  fullWidth
                  value={operatorDetails ? operatorDetails.last_name : ""}
                  validations={{
                    minLength: 1,
                    maxLength: 50,
                    isWords: true,
                  }}
                  validationErrors={{
                    minLength: "Min character length is 1",
                    maxLength: "Max character length is 50",
                    isWords: "It should only contain letters",
                  }}
                  name="last_name"
                  label="Last Name"
                  id="last_name"
                  autoComplete="current-last_name"
                />
                <Typography variant="subtitle1" component="span">
                  Assign Team
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
                        <ListItemText primary={teams[selectedIndex].name} />
                        <ArrowDropDownIcon style={{ color: "gray" }} />
                      </ListItem>
                    </Tooltip>
                  </List>
                </Typography>

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
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  required
                  variant="outlined"
                  fullWidth
                  value={operatorDetails ? operatorDetails.email : ""}
                  validations={{
                    minLength: 1,
                    isEmail: true,
                  }}
                  validationErrors={{
                    minLength: "Min character length is 1",
                    isEmail: "Email is invalid",
                  }}
                  name="email"
                  label="Email Address"
                  id="email"
                  autoComplete="current-email"
                  disabled={operatorDetails ? true : false}
                />
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  required
                  variant="outlined"
                  fullWidth
                  value={operatorDetails ? operatorDetails.phone_number : ""}
                  validations={{
                    isLength: 10,
                    isNumeric: true,
                  }}
                  validationErrors={{
                    isLength: "Mobile number should be 10 digit long",
                    isNumeric: "It should be a Number",
                  }}
                  name="phone_number"
                  label="Phone Number"
                  id="phone_number"
                  autoComplete="current-phone-number"
                />
                <TextFieldFormsy
                  className="mt-8 mb-16"
                  required
                  variant="outlined"
                  fullWidth
                  value={operatorDetails ? operatorDetails.city : ""}
                  validations={{
                    minLength: 1,
                    maxLength: 50,
                    isWords: true,
                  }}
                  validationErrors={{
                    minLength: "Min character length is 10",
                    isWords: "It should not contain digits",
                    maxLength: "Max character length is 50",
                  }}
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="current-city"
                />
                {routeParams.id !== "new" ? (
                  <div></div>
                ) : (
                  <div>
                    <TextFieldFormsy
                      name="password"
                      className="mt-8 mb-16"
                      required
                      InputProps={{
                        className: "pr-2",
                        type: showPassword ? "text" : "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                              <Icon className="text-20" color="action">
                                {showPassword ? "visibility" : "visibility_off"}
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                      value={password_gen}
                      label="Password(Auto-Generated)"
                      id="password"
                      autoComplete="current-password"
                    />
                    <TextFieldFormsy
                      name="password2"
                      className="mt-8 mb-16"
                      value={password_gen}
                      required
                      validations={{
                        equalsField: "password",
                      }}
                      validationErrors={{
                        equalsField: "Passwords don't match",
                      }}
                      InputProps={{
                        className: "pr-2",
                        type: showPassword2 ? "text" : "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                              <Icon className="text-20" color="action">
                                {showPassword2 ? "visibility" : "visibility_off"}
                              </Icon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                      label="Confirm Password(Auto-Generated)"
                      id="password2"
                      autoComplete="current-password"
                    />
                  </div>
                )}
              </Formsy>
            </div>
          )}
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("Operators", reducer)(OperatorForm);
