import clsx from "clsx";
import React from "react";
import Formsy from "formsy-react";
import { Link, useParams } from "react-router-dom";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import { useForm } from "@fuse/hooks";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
//redux
import { useDispatch } from "react-redux";
import * as authActions from "app/auth/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const formRef = React.useRef(null);
  const routeParams = useParams();
  const classes = useStyles();
  const { form, handleChange, resetForm } = useForm({
    password: "",
    password1: "",
  });

  function isFormValid() {
    return form.password === form.password1 && form.password.length > 0;
  }

  function handleSubmit(ev) {
    // ev.preventDefault();
    if (form.password1 === form.password) {
      dispatch(
        authActions.resetPassword(
          form.password,
          form.password1,
          routeParams.uidb64,
          routeParams.token
        )
      );
      resetForm();
    }
  }
  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 p-24 h-full md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo" />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h3" color="inherit" className="font-light">
            Welcome to Autovista Chatbot!
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={400}>
          <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
            Grow your business with our no-code conversational app builder . Engage leads, capture
            data and personalize client journeys in real-time.
          </Typography>
        </FuseAnimate>
      </div>

      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="md:w-full mb-32">
              RESET PASSWORD
            </Typography>

            <Formsy
              name="recoverForm"
              noValidate
              ref={formRef}
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit}
            >
              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="password"
                label="New Password"
                value={form.password}
                onChange={handleChange}
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
                variant="outlined"
                required
              />
              <TextFieldFormsy
                className="mb-16"
                type="password"
                name="password1"
                label="Confirm Password"
                value={form.password1}
                onChange={handleChange}
                validations={{
                  minLength: 4,
                }}
                validationErrors={{
                  minLength: "Min character length is 4",
                }}
                InputProps={{
                  className: "pr-2",
                  type: showPassword1 ? "text" : "password",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword1(!showPassword1)}>
                        <Icon className="text-20" color="action">
                          {showPassword1 ? "visibility" : "visibility_off"}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
              />

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Reset"
                disabled={!isFormValid()}
                type="submit"
              >
                SUBMIT
              </Button>
            </Formsy>

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <Link className="font-medium" to="/login">
                Go back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
}

export default ResetPasswordPage;
