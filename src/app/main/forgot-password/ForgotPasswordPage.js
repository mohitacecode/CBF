import clsx from "clsx";
import React from "react";
import Formsy from "formsy-react";

import { Link } from "react-router-dom";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import { useForm } from "@fuse/hooks";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
//redux
import { useDispatch } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { showMessage } from "app/store/actions/fuse";

const useStyles = makeStyles(theme => ({
  root: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
      theme.palette.primary.dark,
      0.5
    )} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { form, handleChange, resetForm } = useForm({
    email: "",
  });

  function isFormValid() {
    return form.email.length > 0;
  }

  function handleSubmit(ev) {
    //ev.preventDefault();
    dispatch(showMessage({ message: "Please standby.." }));
    dispatch(authActions.forgotPassword(form.email));
    resetForm();
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 p-2 h-full md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo" />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h4" color="inherit" className="font-light">
            Welcome to Autovista Chatbot!
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={400}>
          <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
            Grow your business with our no-code conversational app builder . Engage leads, capture
            data and personalize client journeys in real-time.{" "}
          </Typography>
        </FuseAnimate>
      </div>

      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="md:w-full mb-32">
              RECOVER YOUR PASSWORD
            </Typography>

            <Formsy
              name="recoverForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit}
            >
              <TextFieldFormsy
                className="mb-16"
                label="Email"
                autoFocus
                type="email"
                name="email"
                validations={{
                  isEmail: true,
                }}
                validationErrors={{
                  isEmail: "Not a valid email address",
                }}
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16 normal-case"
                aria-label="Reset"
                disabled={!isFormValid}
                type="submit"
              >
                SEND RESET LINK
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

export default ForgotPasswordPage;
