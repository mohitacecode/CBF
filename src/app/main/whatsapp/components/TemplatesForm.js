import React, { useState, useEffect } from "react";
import clsx from "clsx";

//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import { Button, Icon, useTheme, makeStyles, Typography } from "@material-ui/core";
//redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
//formsy
import Formsy from "formsy-react";
//router
import { Link, useParams } from "react-router-dom";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  headerIcon: {
    position: "absolute",
    top: -64,
    left: 0,
    opacity: 0.5,
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
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "0 auto",
  },
  dropzone: {
    padding: "20px",
    border: "3px dashed #eeeeee",
    backgroundColor: "#ccccb3",
    color: "black",
  },
  center: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

function DetailsForm(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const routeParams = useParams();
  const theme = useTheme();
  //   let AccountDetails = useSelector(({ Accounts }) => Accounts.accountReducer.data);
  //   if (routeParams.account_id === undefined) {
  //     AccountDetails = null;
  //   }
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  const tabValue = 0;
  const loaderText = "Loading Profile...";
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticate) {
      props.history.push("/login");
    } else {
      if (routeParams.account_id !== undefined) {
        setLoading(true);
        dispatch(Actions.getTemplates(routeParams.account_id)).then(() => {
          setLoading(false);
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  const submitData = model => {
    // if (routeParams.account_id !== undefined) {
    //   dispatch(Actions.editDetails(model, routeParams.account_id));
    // } else {
    dispatch(Actions.saveTemplates(model, props.history));
    // }
  };

  return (
    <div>
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
              <Icon className={classes.headerIcon}> face </Icon>
              <Typography
                className="normal-case flex items-center sm:mb-12"
                component={Link}
                role="button"
                to="/whatsappTemplates"
                color="inherit"
              >
                <Icon className="text-20">
                  {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                </Icon>
                <span className="mx-4">Add New Whatsapp Templates </span>
              </Typography>
              <Typography
                className={clsx(
                  classes.headerText,
                  "text-24 whitespace-no-wrap items-center text-center max-w-full"
                )}
              >
                Enter Templates Details
              </Typography>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                disabled={!isFormValid}
                form="formsy"
                type="submit"
              >
                Save
              </Button>
            </FuseAnimate>
          </div>
        }
        content={
          !loading ? (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <div>
                  <Formsy
                    id="formsy"
                    onValidSubmit={submitData}
                    onValid={enableButton}
                    onInvalid={disableButton}
                  >
                    {/* Name */}
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="title"
                      label="Title"
                      //   value={AccountDetails ? AccountDetails.title : ""}
                      validations={{
                        minLength: 1,
                        maxLength: 50,
                        isWords: true,
                      }}
                      validationErrors={{
                        minLength: "Min character length is 1",
                        maxLength: "Max character length is 50",
                        isWords: "Only letters and spaces are allowed",
                      }}
                      autoComplete="current-name"
                      variant="outlined"
                      fullWidth
                      required
                    />
                    {/* Template Format */}
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="template_text"
                      label="Template Text"
                      //   value={AccountDetails ? AccountDetails.title : ""}
                      autoComplete="current-template_text"
                      variant="outlined"
                      fullWidth
                      multiline
                      rowsMax={5}
                      required
                      rows={5}
                    />
                  </Formsy>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <Typography color="textSecondary" className="text-24 my-24">
                {loaderText}
              </Typography>
            </div>
          )
        }
        innerScroll
      />
    </div>
  );
}

export default withReducer("Accounts", reducer)(DetailsForm);
