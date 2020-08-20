import React from "react";
import clsx from "clsx";
import Formsy from "formsy-react";

//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useForm } from "@fuse/hooks";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import {
  makeStyles,
  Icon,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import { showMessage } from "app/store/actions/fuse";

const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  headerIcon: {
    position: "absolute",
    top: -84,
    left: 0,
    opacity: 0.3,
    fontSize: 200,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
  headerText: {
    position: "absolute",
    top: -14,
    left: 500,
  },
}));
function ChangePass(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const tabValue = 0;
  const { form, handleChange, resetForm } = useForm({
    password: "",
    re_password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  React.useEffect(() => {
    if (isAuthenticate);
    else props.history.push("/login");
  }, [dispatch, isAuthenticate, props.history]);
  const submitData = () => {
    dispatch(showMessage({ message: "Please standby.." }));
    if (form.password === form.re_password) {
      dispatch(Actions.savePassword({ ...form }));
      resetForm();
    } else
      dispatch(
        showMessage({
          message: "Passwords Don't Match",
          variant: "error",
        })
      );
  };

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div
            className={clsx(
              classes.header,
              "relative self-center max-w-full items-center justify-center text-center"
            )}
          >
            <Icon className={classes.headerIcon}> vpn_key </Icon>
            <Typography
              className={clsx(
                classes.headerText,
                "text-24 whitespace-no-wrap items-center text-center max-w-full"
              )}
            >
              Change Password
            </Typography>
          </div>
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary"
              onClick={submitData}
            >
              Save
            </Button>
          </FuseAnimate>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 max-w-2xl">
          {tabValue === 0 && (
            <Formsy>
              <TextFieldFormsy
                className="mt-8 mb-16 max-w-2xl"
                required
                value={form.password}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="password"
                validations={{
                  minLength: 4,
                }}
                validationErrors={{
                  minLength: "Min character length is 4",
                }}
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
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextFieldFormsy
                className="mt-8 mb-16 max-w-2xl"
                required
                value={form.re_password}
                variant="outlined"
                fullWidth
                validations={{
                  minLength: 4,
                }}
                validationErrors={{
                  minLength: "Min character length is 4",
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
                onChange={handleChange}
                name="re_password"
                label="New Password Again"
                type="password"
                id="re_password"
                autoComplete="current-password"
              />
            </Formsy>
          )}
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer("Profile", reducer)(ChangePass);
