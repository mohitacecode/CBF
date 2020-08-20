// imports
import React, { Fragment, useState, useEffect } from "react";

//fuse
import FusePageSimple from "@fuse/core/FusePageSimple";
import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseLoading from "@fuse/core/FuseLoading";
import { useDebounce } from "@fuse/hooks";

//material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { ThemeProvider } from "@material-ui/core/styles";

//components
import Application from "./Application";
import BotDesign from "./components/design/BotDesign";
import Publish from "./components/Publish";

import { BodyWidget, TrayWidget, BuilderStepper, NodeDetail, Preview } from "./components";

// store
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import { useDispatch, useSelector } from "react-redux";

//service
import BotDetailService from "app/services/bot/BotDetailService";

import * as Actions from "./store/actions";
import { showMessage } from "app/store/actions";

const useStyles = makeStyles(theme => ({
  body: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 85px)",
  },
  header: {
    height: "60px",
    display: "flex",
    background: "white",
    "&>div": {
      display: "flex",
      padding: theme.spacing(1, 2),
    },
  },
  content: {
    display: "flex",
    flexGrow: 1,
    position: "relative",
    height: "100%",
  },
  stepperButton: {
    padding: theme.spacing(1, 2),
  },
  stepper: {
    width: "100%",
  },
  toggleButton: {
    width: "35px",
    height: "35px",
    position: "absolute",
    background: "#eaeaea",
    zIndex: "100",
    top: "54px",
    left: "274px",
    boxShadow: "4px 4px 7px 0px #80808052",
  },
  btnGroup: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  layoutRoot: {},
}));

const themeObject = {
  color: {
    background: "#273240",
    error: {
      background: "#ff7961",
    },
  },
  widPos: { right: "1%" },
};

function Builder(props) {
  const classes = useStyles();
  const botID = props.match.params.id;
  let app = Application;
  //Local State
  const [open, setOpened] = useState(true);
  const handleToggle = useDebounce(open => {
    setOpened(open);
  }, 10);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [nodeDetail, setNodeDetail] = useState({ loading: true, data: null });
  const [botTitle, setBotTitle] = useState("");
  const [newComp, setNewComp] = useState(false);
  const [type, setType] = useState("whatsapp");
  const [saveSuccess, setSaveSuccess] = useState(true);
  // Redux State
  const dispatch = useDispatch();
  const activeStep = useSelector(({ builder }) => builder.stepper.activeStep);

  const makeBuilderCall = function (data) {
    BotDetailService.updateBotDetails({
      pathParam: {
        id: botID,
      },
      errorNotify: false,
      data: data,
    })
      .then(data => {
        dispatch(
          showMessage({
            message: "Builder Updated Successfully",
            variant: "success",
          })
        );
        console.log("data", data.data);
        setNodeDetail({ loading: false, data: data.data });
      })
      .catch(err => {
        dispatch(
          showMessage({
            message: `Please check whether every component is connected or not / incorrect connection `,
            variant: "error",
          })
        );
        setNodeDetail({ loading: false, data: data });
      });
  };

  const updateBuilderName = function (val) {
    makeBuilderCall({ id: nodeDetail.data.id, title: val });
  };

  const updateBuilderData = function (newData) {
    setNodeDetail({ ...nodeDetail, data: { ...nodeDetail.data, ...newData } });
  };

  const checkForDuplicateVariables = nodes => {
    const models = nodes.layers[1].models;
    const modelsArr = Object.keys(models);
    const variables = {};
    let duplicateFound = false;
    modelsArr.forEach(model => {
      const variable = models[model].nodeData.variable;
      if (variables[variable]) {
        duplicateFound = true;
      }
      if (variable) variables[variable] = variable;
    });
    return duplicateFound;
  };

  const saveBuilder = function () {
    if (saveSuccess) {
      let engine = app.getDiagramEngine(),
        model = engine.getModel(),
        modelData = model.serialize();
      const hasDuplicateVariables = checkForDuplicateVariables(modelData);
      if (hasDuplicateVariables) {
        return dispatch(
          showMessage({
            message: "Your bot contains duplicate variables",
            variant: "warning",
          })
        );
      }
      setNodeDetail({ ...nodeDetail, loading: true });
      makeBuilderCall({ id: nodeDetail.data.id, bot_full_json: modelData });
      setNewComp(false);
    } else {
      dispatch(
        showMessage({
          message: "Please Fill Send Mail Components Fields Properly",
          variant: "error",
        })
      );
    }
  };

  const refresh = e => {
    app.clearModel();
    setNodeDetail({ ...nodeDetail, loading: true });
    BotDetailService.getBotDetails({
      pathParam: {
        id: botID,
      },
    })
      .then(data => {
        if (data && data.data) {
          setType(data.data.chatbot_type);
          if (data.data.bot_variable_json) {
            dispatch(Actions.setBotVariable(data.data.bot_variable_json));
          }
          setNodeDetail({ loading: false, data: data.data });
          setBotTitle(data.data.title);
        }
      })
      .catch(() => {
        props.history.push("/botList");
        setNodeDetail({ loading: false });
      });
  };

  useEffect(() => {
    refresh();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (nodeDetail.loading === false && nodeDetail.data) {
      app.updateModelUsingJSON(nodeDetail.data.bot_full_json);
    }
  }, [nodeDetail, app]);

  const animateButton = {
    animation: open ? { left: "274px" } : { left: "0px" },
    duration: 400,
    delay: 10,
  };
  const animateTray = {
    animation: open ? { width: "290px" } : { width: "0px" },
    duration: 400,
  };

  const togglePreview = e => {
    setPreviewOpen(!isPreviewOpen);
  };

  const ActiveComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className={classes.body}>
            <div className={classes.content}>
              <FuseAnimate {...animateButton}>
                <div className={classes.toggleButton} onClick={() => handleToggle(!open)}>
                  {open ? (
                    <ArrowBackIcon fontSize="large" />
                  ) : (
                    <ArrowForwardIcon fontSize="large" />
                  )}
                </div>
              </FuseAnimate>
              <FuseAnimate {...animateTray}>
                <TrayWidget
                  type={type}
                  onClickAddNode={model => {
                    app.getNodeModel({
                      ...model,
                      addToModel: true,
                      position: { x: 520, y: 213 },
                    });
                    setNewComp(true);
                    app.getDiagramEngine().repaintCanvas();
                  }}
                  setTrayNode={(event, model) => app.setTrayNode(event, model)}
                />
              </FuseAnimate>
              <BodyWidget app={app} />
            </div>
          </div>
        );
      case 1:
        return <BotDesign botID={botID} />;
      case 2:
        return (
          <Publish
            botID={botID}
            nodeDetail={nodeDetail.data || {}}
            updateBuilderData={updateBuilderData}
          />
        );
      default:
        break;
    }
  };

  const ButtomsComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className={classes.btnGroup}>
            <Button variant="contained" color="secondary" onClick={() => refresh()}>
              Reset
            </Button>
            <Button variant="contained" color="primary" onClick={togglePreview}>
              Preview
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                saveBuilder();
              }}
            >
              Save
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      content={
        <FuseLoading overlay={nodeDetail.loading}>
          <Fragment>
            <NodeDetail setSaveSuccess={setSaveSuccess} />
            <div className={classes.header}>
              <BuilderStepper
                botTitle={botTitle}
                setBotTitle={setBotTitle}
                type={type}
                newComp={newComp}
                updateBuilderName={updateBuilderName}
                data={nodeDetail.data || {}}
              />
              <ButtomsComponent />
            </div>
            <ThemeProvider theme={themeObject}>
              {isPreviewOpen && (
                <Preview
                  open={true}
                  botID={botID}
                  togglePreview={togglePreview}
                  diagramEngine={app.getDiagramEngine()}
                />
              )}
            </ThemeProvider>
            <div className="p-12">
              <ActiveComponent />
            </div>
          </Fragment>
        </FuseLoading>
      }
    />
  );
}

export default withReducer("builder", reducer)(Builder);
