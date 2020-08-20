import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import { Button, Icon, useTheme, makeStyles, Typography, Tooltip } from "@material-ui/core";
//redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
//formsy
import Formsy from "formsy-react";
//router
import { Link, useParams } from "react-router-dom";
import withReducer from "app/store/withReducer";
import reducer from "../store/reducers";
//icons
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
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
  let AccountDetails = useSelector(({ Accounts }) => Accounts.accountReducer.data);
  if (routeParams.account_id === undefined) {
    AccountDetails = null;
  }
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  const tabValue = 0;
  const loaderText = "Loading Profile...";
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = React.useState();
  const [wabPhone, setWabPhone] = React.useState();

  useEffect(() => {
    if (!isAuthenticate) {
      props.history.push("/login");
    } else {
      if (routeParams.account_id !== undefined) {
        setLoading(true);
        dispatch(Actions.getAccount(routeParams.account_id)).then(() => {
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
    model = { company_contact: phone, wab_num: wabPhone, ...model };
    console.log(model);
    if (routeParams.account_id !== undefined) {
      dispatch(Actions.editDetails(model, routeParams.account_id));
    } else {
      dispatch(Actions.saveDetails(model));
    }
    model = {};
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
                to="/whatsappBusiness"
                color="inherit"
              >
                <Icon className="text-20">
                  {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
                </Icon>
                <span className="mx-4">WhatsApp Business</span>
              </Typography>
              <Typography
                className={clsx(
                  classes.headerText,
                  "text-24 whitespace-no-wrap items-center text-center max-w-full"
                )}
              >
                Enter Your Details
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
                      label="Name"
                      value={AccountDetails ? AccountDetails.title : ""}
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
                    {/* Contact Number */}
                    Contact Number
                    <Tooltip title="Enter your company contact number">
                      <HelpOutlineIcon style={{ marginLeft: "5px" }} />
                    </Tooltip>
                    <ReactPhoneInput
                      inputExtraProps={{
                        name: "company_contact",
                        required: true,
                        autoFocus: true,
                        placeholder: "Number",
                        title: "number",
                        lable: "number",
                      }}
                      title="number"
                      lable="number"
                      placeholder="Number"
                      country={"in"}
                      value={AccountDetails ? AccountDetails.company_contact : phone}
                      onChange={setPhone}
                      inputStyle={{
                        width: "100%",
                        height: "50px",
                        title: "Number",
                        label: "Number",
                      }}
                      containerStyle={{ marginTop: "6px", marginBottom: "10px" }}
                    />
                    {/* Email-Id */}
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="email"
                      name="company_email"
                      label="Email Address"
                      value={AccountDetails ? AccountDetails.company_email : ""}
                      validations={{
                        isEmail: true,
                      }}
                      validationErrors={{
                        isEmail: "Email is invalid",
                      }}
                      variant="outlined"
                      fullWidth
                      required
                      autoComplete="current-email"
                    />
                    {/* Company Name */}
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="company_name"
                      label="Company Name"
                      value={AccountDetails ? AccountDetails.company_name : ""}
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
                    {/* Company website  */}
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="company_website"
                      label="Website"
                      value={AccountDetails ? AccountDetails.company_website : ""}
                      validations={{
                        isUrl: true,
                      }}
                      validationErrors={{
                        isUrl: "Enter a valid url",
                      }}
                      autoComplete="current-website"
                      variant="outlined"
                      fullWidth
                    />
                    {/* FB BMID  */}
                    FB BMID
                    <Tooltip
                      title="*Facebook Business Manager ID: Enter your FBMID here. 
                    If you haven't already received FBMID from Facebook, otherwise kindly 
                    go through this link to register your company on Facebook and get FBMID.
                    Link : (https://business.facebook.com/settings/security) "
                    >
                      <HelpOutlineIcon style={{ marginLeft: "5px" }} />
                    </Tooltip>
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="fb_bmid"
                      label="Facebook Business Manager ID"
                      value={AccountDetails ? AccountDetails.fb_bmid : ""}
                      validations={{
                        minLength: 1,
                        maxLength: 50,
                        isAlphanumeric: true,
                      }}
                      validationErrors={{
                        minLength: "Min character length is 1",
                        maxLength: "Max character length is 50",
                        isAlphanumeric: "Only letters and numbers are allowed",
                      }}
                      autoComplete="current-name"
                      variant="outlined"
                      fullWidth
                      required
                    />
                    {/* Empty Mobile Number  */}
                    Number to be linked with bot
                    <Tooltip title="This number should not have any whatsapp account">
                      <HelpOutlineIcon style={{ marginLeft: "5px" }} />
                    </Tooltip>
                    <ReactPhoneInput
                      inputExtraProps={{
                        name: "wab_num",
                        required: true,
                        autoFocus: true,
                      }}
                      country={"in"}
                      value={AccountDetails ? AccountDetails.wab_num : wabPhone}
                      onChange={setWabPhone}
                      inputStyle={{ width: "100%", height: "50px" }}
                      containerStyle={{ marginTop: "6px", marginBottom: "10px" }}
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
