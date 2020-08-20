// imports
import React, { Fragment } from "react";
import clsx from "clsx";
import _ from "@lodash";

//material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

// fuse
import { showMessage } from "app/store/actions/fuse";
import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseScrollbars from "@fuse/core/FuseScrollbars";

//components
import Buttons from "./components/Buttons";
import DateFormat from "./components/DateFormat";
import Link from "./components/Link";
import Messages from "./components/Messages";
import QuestionText from "./components/QuestionText";
import Variable from "./components/Variable";
import SendMail from "./components/SendMail";
import Media from "./components/Media";
import Carousel from "./components/Carousel";
import MultipleCheckBox from "./components/MultipleCheckBox";
import Rating from "./components/Rating";
import LeadSwitch from "./components/LeadSwitch";
import SubscribeEmailSwitch from "./components/SubscribeEmailSwitch";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../store/actions";

const useStyles = makeStyles(theme => ({
  nodeDetails: {
    width: "330px",
    left: "-340px",
    height: "100%",
    position: "absolute",
    zIndex: "9999",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexFlow: "column",
    background: "white",
    boxShadow: "0px 0px 10px 2px #8080807a",
  },
  header: {
    height: "50px",
    padding: theme.spacing(1, 2),
    paddingRight: "0px",
    borderBottom: "1px solid grey",
    width: "100%",
    background: theme.palette.primary.main,
    "& > *": {
      color: "white",
    },
  },
  footer: {
    height: "66px",
    padding: theme.spacing(1, 2),
    borderTop: "1px solid grey",
    width: "100%",
  },
  body: {
    padding: theme.spacing(1, 2),
    height: "100%",
    width: "100%",
    background: theme.palette.background.default,
  },
  valHeading: {
    marginBottom: theme.spacing(2),
  },
  valueBox: {
    background: "white",
  },
  divider: {
    margin: theme.spacing(2),
  },
  textArea: {
    height: "100px",
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.23)",
    padding: theme.spacing(1),
    borderWidth: "1px",
  },
  elementBox: {
    background: "#dbf2fb",
    padding: "16px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
export default function NodeDetail({ setSaveSuccess }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  //Redux
  const nodeDetails = useSelector(({ builder }) => builder.nodeDetail);

  const { node, open } = nodeDetails;
  const nodeData = node.options;
  const [disable, setDisable] = React.useState(false);

  const validSubmit = e => {
    if (nodeData.nodeType === "LINK") {
      if (false) {
        dispatch(showMessage({ message: "Invalid URL" }));
        return;
      }
    }

    let sendData = _.omitBy(
      {
        isLeadField: nodeData.isLeadField,
        subscribeEmail: nodeData.subscribeEmail,
        questionText: nodeData.questionText,
        variable: nodeData.variable,
        messages: nodeData.messages,
        portOpt: nodeData.portOpt,
        // link data
        urlMessage: nodeData.urlMessage,
        // date format
        dateFormat: nodeData.dateFormat,
        // send Mail
        sendMailObj: nodeData.sendMailObj,
        // Media
        media_url: nodeData.media_url,
        link_option: nodeData.link_option,
        link: nodeData.link,
        // Image Carousel
        carousel_url: nodeData.carousel_url,
        no_images: nodeData.no_images,
        link_carousel: nodeData.link_carousel,
        link_carousel_text: nodeData.link_carousel_text,
        // Multiple Chech Box
        choices: nodeData.choices,
        //Rating
        rating_type: nodeData.rating_type,
        rating_max: nodeData.rating_max,
        rating_variable: nodeData.rating_variable,
        feedback_input: nodeData.feedback_input,
      },
      _.isUndefined
    );
    if (nodeData.isLeadField && !nodeData.variable.replace("@", "")) {
      dispatch(showMessage({ message: "Enter variable name", variant: "warning" }));
    } else {
      dispatch(Actions.saveNodeDetails(sendData));
    }
  };

  const sidebarAnimation = {
    animation: open ? { left: "0px", opacity: 1 } : { left: "-330px", opacity: 0 },
    duration: 400,
  };

  const propObj = {
    nodeData: nodeData,
    parentClasses: classes,
  };
  const getComponents = function (nodeData) {
    let elementList = [];
    if (nodeData) {
      if (nodeData.questionText || nodeData.questionText === "") {
        elementList.push(<QuestionText key="q" {...propObj} />);
      }
      if (nodeData.message) {
        elementList.push(<Messages key="m" {...propObj} />);
      }
      if (nodeData.multiple) {
        elementList.push(<Buttons key="b" {...propObj} />);
      }
      if (nodeData.nodeType === "DATE") {
        elementList.push(<DateFormat key="d" {...propObj} />);
      }
      if (nodeData.nodeType === "SEND_EMAIL") {
        elementList.push(
          <SendMail key="sm" {...propObj} setSaveSuccess={setSaveSuccess} setDisable={setDisable} />
        );
      }
      if (nodeData.nodeType === "LINK") {
        elementList.push(<Link key="l" {...propObj} />);
      }
      if (nodeData.nodeType === "MEDIA") {
        elementList.push(<Media key="m" {...propObj} setDisable={setDisable} />);
      }
      if (nodeData.nodeType === "CAROUSEL") {
        elementList.push(<Carousel key="ic" {...propObj} setDisable={setDisable} />);
      }
      if (nodeData.nodeType === "MULTIPLE_CHECK_BOX") {
        elementList.push(<MultipleCheckBox key="cb" {...propObj} />);
      }
      if (nodeData.nodeType === "RATING") {
        elementList.push(<Rating key="rt" {...propObj} />);
      }
      elementList.push(<Variable key="v" {...propObj} text={null} />);
      elementList.push(<LeadSwitch key="ls" {...propObj} />);
      if (nodeData.nodeType === "AGENT_TRANSFER") {
        elementList.push(<SubscribeEmailSwitch key="ses" {...propObj} />);
      }
    }
    return elementList;
  };

  return (
    <Fragment>
      <FuseAnimate {...sidebarAnimation}>
        <div className={classes.nodeDetails}>
          <div className={clsx("flex justify-between", classes.header)}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {(nodeData && nodeData.primaryText) || "Edit"}
              </Typography>
            </div>
            <IconButton onClick={() => dispatch(Actions.closeNodeDetails())}>
              <Icon>{"close"}</Icon>
            </IconButton>
          </div>
          <FuseScrollbars className={classes.body}>{getComponents(nodeData)}</FuseScrollbars>
          <div className={classes.footer}>
            <div className={classes.btnGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(Actions.cancelNodeDetails())}
              >
                cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={validSubmit}
                disabled={disable}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </Fragment>
  );
}
