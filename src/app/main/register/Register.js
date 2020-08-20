// imports
import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

// material & fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";

// components
import RegisterForm from "./RegisterForm";

const useStyles = makeStyles(theme => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${
      theme.palette.primary.dark
    } 80%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function Register() {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img className="w-128 mb-32" src="static/assets/images/logos/fuse.svg" alt="logo" />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h4" color="inherit" className="font-light">
            Welcome to AutoVista Chatbot!
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
              CHOOSE REGISTRATION METHOD
            </Typography>

            <RegisterForm />

            <div className="my-24 flex items-center justify-center">
              <Divider className="w-32" />
              <span className="mx-8 font-bold">OR</span>
              <Divider className="w-32" />
            </div>

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <span className="font-medium">Already have an account?</span>
              <Link className="font-medium" to="/login">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
}

export default Register;
