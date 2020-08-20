import FuseAnimate from "@fuse/core/FuseAnimate";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { Link, useParams } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "app/auth/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${
      theme.palette.primary.dark
    } 80%)`,
    color: theme.palette.primary.contrastText,
  },
}));

function MailConfirmPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  React.useEffect(() => {
    dispatch(authActions.mailConfirm(routeParams.uidb64, routeParams.token));
  }, []);

  const register = useSelector(({ auth }) => auth.register);
  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 items-center h-full justify-center p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <FuseAnimate animation="transition.expandIn">
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <div className="m-32">
                <Icon className="text-96" color="action">
                  drafts
                </Icon>
              </div>

              <Typography variant="h5" className="text-center mb-16">
                Verifying your email address...
              </Typography>

              <Typography className="text-center mb-16 w-full" color="textSecondary">
                {register.data === null ? (
                  <b>Please Standby...</b>
                ) : register.data.user !== 406 ? (
                  <b>Verification Successful</b>
                ) : (
                  <b>Token Expired</b>
                )}
              </Typography>

              <Typography className="text-center w-full" color="textSecondary">
                {register.data === null ? (
                  <b>We'll be done with verification soon!</b>
                ) : register.data.user !== 406 ? (
                  <b>Proceed to Login!</b>
                ) : (
                  <b>Looks like you accessed an expired token link!</b>
                )}
              </Typography>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-medium" to="/login">
                  Go back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default MailConfirmPage;
