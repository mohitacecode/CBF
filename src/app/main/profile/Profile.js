import React, { useEffect, useState } from "react";
import clsx from "clsx";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { TextFieldFormsy } from "@fuse/core/formsy";
//material-ui
import {
  Button,
  Icon,
  makeStyles,
  Typography,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
} from "@material-ui/core";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
//formsy
import Formsy from "formsy-react";
//dropzone
import Dropzone from "react-dropzone";
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

function Profile(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [fileChoosen, setFileChoosen] = useState("");
  let profileDetails = useSelector(({ profile }) => profile.profileReducer.data);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  const tabValue = 0;
  const loaderText = "Loading Profile...";
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isAuthenticate) dispatch(Actions.getProfile());
    else props.history.push("/login");
    // eslint-disable-next-line
  }, []);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (profileDetails.avatar) {
      let index = profileDetails.avatar.lastIndexOf("/") + 1;
      setFileName(profileDetails.avatar.substr(index));
    }

    setOpen(true);
  };

  const handleClose = () => {
    setFileChoosen("");
    setOpen(false);
  };

  const handleUpload = () => {
    setOpen(false);
    dispatch(
      Actions.uploadAvatar({ paramName: "avatar", fileObj: fileChoosen }, profileDetails.id)
    );
  };
  const onDrop = files => {
    setFileChoosen(files[0]);
    setFileName(files[0].path);
  };

  const submitData = model => {
    dispatch(Actions.saveProfile(1, model));
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
                className={clsx(
                  classes.headerText,
                  "text-24 whitespace-no-wrap items-center text-center max-w-full"
                )}
              >
                Update Profile Details
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
          profileDetails ? (
            <div className="p-16 sm:p-24 max-w-2xl">
              {tabValue === 0 && (
                <div>
                  <Formsy
                    id="formsy"
                    onValidSubmit={submitData}
                    onValid={enableButton}
                    onInvalid={disableButton}
                  >
                    <Container className={classes.center}>
                      <IconButton onClick={handleClickOpen}>
                        {profileDetails ? (
                          <Avatar
                            alt="Remy Sharp"
                            src={profileDetails.avatar}
                            id="avatar"
                            className={classes.avatar}
                          />
                        ) : (
                          <Avatar alt="Remy Sharp" id="avatar" className={classes.avatar} />
                        )}
                      </IconButton>
                    </Container>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Upload Avatar</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Drag'n'drop images, or click to select files
                        </DialogContentText>

                        <DialogContentText>Current Image : {fileName}</DialogContentText>
                        <Dropzone
                          onDrop={acceptedFiles => onDrop(acceptedFiles)}
                          accept="image/*"
                          minSize={1024}
                          maxSize={3072000}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className={classes.dropzone}>
                              <input {...getInputProps()} />
                              <p>Drag'n'drop images, or click to select files</p>
                            </div>
                          )}
                        </Dropzone>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleUpload} color="primary">
                          Upload
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="first_name"
                      label="First Name"
                      value={profileDetails ? profileDetails.first_name : ""}
                      validations={{
                        minLength: 1,
                        maxLength: 50,
                      }}
                      validationErrors={{
                        minLength: "Min character length is 1",
                        maxLength: "Max character length is 50",
                        isWords: "It should not contain digits",
                      }}
                      autoComplete="current-username"
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="last_name"
                      label="Last Name"
                      value={profileDetails ? profileDetails.last_name : ""}
                      validations={{
                        minLength: 1,
                        maxLength: 50,
                      }}
                      validationErrors={{
                        minLength: "Min character length is 1",
                        maxLength: "Max character length is 50",
                        isWords: "It should not contain digits",
                      }}
                      autoComplete="current-last_name"
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="email"
                      name="email"
                      label="Email Address"
                      value={profileDetails ? profileDetails.email : ""}
                      validations={{
                        minLength: 1,
                        isEmail: true,
                      }}
                      validationErrors={{
                        minLength: "Min character length is 1",
                        isEmail: "Email is invalid",
                      }}
                      variant="outlined"
                      fullWidth
                      required
                      autoComplete="current-email"
                      disabled
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="phone_number"
                      label="Phone Number"
                      value={profileDetails ? profileDetails.phone_number : ""}
                      validations={{
                        isLength: 10,
                        isNumeric: true,
                      }}
                      validationErrors={{
                        isLength: "Mobile number should be 10 digit long",
                        isNumeric: "It should be a Number",
                      }}
                      autoComplete="current-phone-number"
                      variant="outlined"
                      fullWidth
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="website"
                      label="Website"
                      value={profileDetails ? profileDetails.website : ""}
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
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="city"
                      label="City"
                      value={profileDetails ? profileDetails.city : ""}
                      validations={{
                        maxLength: 50,
                        isWords: true,
                      }}
                      validationErrors={{
                        isWords: "It should not contain digits",
                        maxLength: "Max character length is 50",
                      }}
                      autoComplete="current-city"
                      variant="outlined"
                      fullWidth
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="address"
                      label="Address"
                      value={profileDetails ? profileDetails.address : ""}
                      validations={{
                        maxLength: 100,
                      }}
                      validationErrors={{
                        maxLength: "Max character length is 100",
                      }}
                      autoComplete="current-address"
                      variant="outlined"
                      fullWidth
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="state"
                      label="State"
                      value={profileDetails ? profileDetails.state : ""}
                      validations={{
                        maxLength: 50,
                        isWords: true,
                      }}
                      validationErrors={{
                        maxLength: "Max character length is 50",
                        isWords: "It should not contain digits",
                      }}
                      autoComplete="current-state"
                      variant="outlined"
                      fullWidth
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="zipcode"
                      label="Zipcode"
                      value={profileDetails ? profileDetails.zipcode : ""}
                      validations={{
                        isNumeric: true,
                        isLength: 6,
                      }}
                      validationErrors={{
                        isNumeric: "It should be a number",
                        isLength: "It should be of length 6",
                      }}
                      autoComplete="current-zipcode"
                      variant="outlined"
                      fullWidth
                    />
                    <TextFieldFormsy
                      className="mt-8 mb-16"
                      type="text"
                      name="country"
                      label="Country"
                      value={profileDetails ? profileDetails.country : ""}
                      validations={{
                        maxLength: 50,
                        isWords: true,
                      }}
                      validationErrors={{
                        isWords: "It should not contain digits",
                        maxLength: "Max character length is 50",
                      }}
                      autoComplete="current-country"
                      variant="outlined"
                      fullWidth
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

export default withReducer("profile", reducer)(Profile);
