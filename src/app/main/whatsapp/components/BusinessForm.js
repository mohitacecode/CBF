import React from "react";
import clsx from "clsx";
import "./styles.css";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { SelectFormsy } from "@fuse/core/formsy";
//material-ui
import {
  Button,
  Icon,
  MenuItem,
  Switch,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
  FormControl,
  Divider,
  Typography,
  TextField,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
// import DeleteIcon from "@material-ui/icons/Delete";
//router
import { Link, useParams } from "react-router-dom";
//formsy
import Formsy from "formsy-react";
//redux
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import reducer from "../store/reducers";
// import { showMessage } from "app/store/actions/fuse";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputForm: {
    width: "300px",
  },
  phoneInput: {
    width: "450px",
    marginLeft: "20px",
  },
  group: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "20px",
  },
}));
function BusinessForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const theme = useTheme();
  // redux state
  const AccountDetails = useSelector(({ Business }) => Business.accountReducer.data);
  console.log(AccountDetails);
  const okStatus = useSelector(({ Business }) => Business.accountReducer.status);
  const botList = useSelector(({ Business }) => Business.channelReducer.botList);
  // local state
  const [accountStatus, setAccountStatus] = React.useState(
    AccountDetails ? AccountDetails.published : false
  );

  const [loading, setLoading] = React.useState(false);

  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  React.useEffect(() => {
    setLoading(true);
    if (isAuthenticate) {
      dispatch(Actions.getBotList());
      if (routeParams.account_id === undefined) {
        dispatch(Actions.newAccount()).then(() => {
          setLoading(false);
        });
      } else {
        dispatch(Actions.getAccount(routeParams.account_id)).then(() => {
          setLoading(false);
        });
        setAccountStatus(AccountDetails ? AccountDetails.published : false);
      }
    } else props.history.push("/login");
    // eslint-disable-next-line
  }, []);

  const saveChanges = model => {
    dispatch(
      Actions.updateAccount(model.project_id, "BACK2BACK", accountStatus, AccountDetails.wab_hash)
    );
  };

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-120 h-120 sm:h-136 sm:min-h-136",
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
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
            </FuseAnimate>

            <div className="flex items-center max-w-full">
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    {AccountDetails
                      ? AccountDetails.title !== ""
                        ? AccountDetails.title
                        : "New WhatsApp Business Account"
                      : "New WhatsApp Business Account"}
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="caption">Business Account Details</Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24">
          {!loading ? (
            <div>
              <div className={classes.formControl}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    className={classes.inputForm}
                    variant="outlined"
                    disabled={true}
                    value={AccountDetails ? AccountDetails.title : ""}
                    name="title"
                    label="Business Account Name"
                    id="account_name"
                    autoComplete="current-account_name"
                  />
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    className={classes.inputForm}
                    variant="outlined"
                    disabled={true}
                    value={AccountDetails ? AccountDetails.wab_num : ""}
                    name="wab_number"
                    label="Business Account Number"
                    id="account_number"
                    autoComplete="current-account_number"
                  />
                </FormControl>
              </div>

              <Divider className="w-1280 justify-between text-grey" />
              <Typography style={{ marginTop: "10px" }} variant="h6" component="h5">
                Choose WhatsApp Bot For Automated Conversation
              </Typography>
              <Typography variant="caption" component="h6">
                Link your WhatsApp bot to this account, and your phone number above can respond to
                the client, using the bot seleceted. After saving changes, please publish your
                account in the next step to activate the account.
              </Typography>
              <Formsy style={{ marginTop: "10px" }} id="formsy2" onValidSubmit={saveChanges}>
                <FormControl
                  disabled
                  //disabled={okStatus !== 201 && AccountDetails === null}
                  className={clsx(classes.formControl, "w-320")}
                >
                  <SelectFormsy
                    disabled={
                      (okStatus !== 201 && AccountDetails === null) || AccountDetails.published
                    }
                    className="w-320"
                    id="project_id"
                    label="Linked Bot"
                    labelId="project_id"
                    name="project_id"
                    variant="outlined"
                    value={AccountDetails ? AccountDetails.project_id : ""}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {botList.map((bots, i) => (
                      <MenuItem key={i} value={bots.bot_hash}>
                        {bots.title}
                      </MenuItem>
                    ))}
                  </SelectFormsy>
                </FormControl>
                <div
                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    marginLeft: "5px",
                  }}
                >
                  <Typography variant="subtitle2" component="span">
                    Publish Account
                  </Typography>
                  <Switch
                    size="small"
                    disabled={AccountDetails === null}
                    checked={AccountDetails ? AccountDetails.published : false}
                    onChange={event => {
                      setAccountStatus(event.target.checked);
                      dispatch(
                        Actions.changeAccountStatus(event.target.checked, AccountDetails.wab_hash)
                      );
                    }}
                    label="Account Publish Status"
                    name="published"
                    id="published"
                    labelplacement="start"
                  />
                </div>
                <div>
                  <Button
                    className="whitespace-no-wrap normal-case mt-20 ml-12 m-8"
                    variant="contained"
                    color="secondary"
                    // disabled={okStatus !== 201 && AccountDetails === null}
                    onClick={model => saveChanges(model)}
                    form="formsy2"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </Formsy>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <Typography color="textSecondary" className="text-24 my-24">
                Loading...
              </Typography>
            </div>
          )}
        </div>
      }
    />
  );
}

export default withReducer("Business", reducer)(BusinessForm);
