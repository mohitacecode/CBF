// imports
import React, { Fragment, useState, useEffect } from "react";
import _ from "@lodash";
import { PortWidget } from "@projectstorm/react-diagrams";
import clsx from "clsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// fuse && material
import { useDebounce } from "@fuse/hooks";
import FuseAnimate from "@fuse/core/FuseAnimate";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

// redux
import { useDispatch } from "react-redux";
import * as Actions from "app/main/bot-management/builder/store/actions";

// components
import Application from "app/main/bot-management/builder/Application";

const useStyles = makeStyles(theme => ({
  circlePort: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
    borderRadius: "50%",
  },
  port: {
    position: "absolute",
    border: "5px solid white",
    borderRadius: "50%",
    height: "20px",
    width: "20px",
    "&.in-port": {
      top: "-11px",
      boxShadow: "0px -2px 3px 0px #80808070",
      "&>div": {
        background: "rgb(192,255,0)",
      },
    },
    "&.out-port": {
      bottom: "-11px",
      boxShadow: "0px 3px 3px 0px #80808070",
      "&>div": {
        background: "rgb(0,192,255)",
      },
    },
  },
  elementPort: {
    padding: theme.spacing(1),
    width: "100%",
    backgroundColor: "#dbf1fb",
  },
  messageInputContainer: {
    position: "relative",
    marginBottom: theme.spacing(0.5),
  },
  messageInput: {
    padding: "6px 8px",
    background: "#39c7f5",
    color: "white",
    border: "none !important",
    outline: "none !important",
    width: "100%",
    "&::-webkit-input-placeholder": {
      /* WebKit, Blink, Edge */
      color: "#ffffffb0",
    },
    "&:-moz-placeholder": {
      /* Mozilla Firefox 4 to 18 */
      color: "#ffffffb0",
    },
    "&::-moz-placeholder": {
      /* Mozilla Firefox 19+ */
      color: "#ffffffb0",
    },
    "&:-ms-input-placeholder": {
      /* Internet Explorer 10-11 */
      color: "#ffffffb0",
    },
  },
  actionDiv: {
    position: "absolute",
    background: "#f2f0f0",
    minWidth: "28px",
    height: "30px",
    left: "-57px",
    top: 0,
    borderRadius: "10px",
    border: "1px solid #c1c0c0",
    display: "flex",
    alignItems: "center",
    padding: "2px 6px",
    "&>button": {
      padding: "0px",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    width: "100%",
  },
  headerListItem: {
    padding: "0px",
  },
  list: {
    padding: "0px",
  },
  listAvtar: {
    minWidth: "46px",
    "&>div": {
      width: "30px",
      height: "30px",
    },
    "& .icon": {
      fontSize: "20px",
    },
  },
  listAction: {
    position: "relative",
    right: "0px",
    transform: "none",
    "& button": {
      padding: "7px",
      margin: "0",
      "& .material-icons": {
        fontSize: "17px",
      },
    },
  },
  listGroup: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "250px",
  },
  optionBtn: {
    position: "relative",
    "&>.port": {
      top: "calc(50% - 11px)",
      "&.in-port": {
        left: "-16px",
        boxShadow: "-2px 0px 3px 0px #80808070",
      },
      "&.out-port": {
        right: "-16px",
        boxShadow: "2px 0px 3px 0px #80808070",
      },
    },
  },
  imageUpload: {
    width: "200px",
    height: "auto",
    maxHeight: "200px",
    background: "silver",
    fontSize: "20px",
    "& > *": {
      width: "100%",
      height: "100%",
    },
  },
  carousel: {
    width: "220px",
    height: "200px",
  },
}));
const getPort = function ({ index, obj, classes, engine, node }) {
  let ports = null;
  switch (obj.linkType) {
    case "in":
      ports = (
        <Fragment key={`p-${index}`}>
          <PortWidget
            className={clsx("in-port", classes.port)}
            engine={engine}
            port={node.getPort(obj.name)}
          >
            <div className={classes.circlePort} />
          </PortWidget>
        </Fragment>
      );
      break;
    case "out":
      ports = (
        <Fragment key={`p-${index}`}>
          <PortWidget
            className={clsx("out-port", classes.port)}
            engine={engine}
            port={node.getPort(obj.name)}
          >
            <div className={classes.circlePort} />
          </PortWidget>
        </Fragment>
      );
      break;
    default:
      break;
  }
  return ports;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const InputButton = function ({
  node,
  nodeType,
  classes,
  message,
  addNewMessage,
  removeMessage,
  updateData,
  checkBox,
}) {
  //const [opened, setOpened] = useState(false);
  const [opened] = useState(false);
  const [value, setValue] = useState(message);
  const handleToggle = useDebounce(open => {
    //setOpened(open);
  }, 150);

  useEffect(() => {
    setValue(message);
  }, [message]);

  return (
    <div
      className={classes.messageInputContainer}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      {opened && nodeType !== "YES_NO" ? (
        <FuseAnimate animation="transition.slideLeftIn">
          <div className={classes.actionDiv}>
            <IconButton onClick={() => addNewMessage()}>
              <Icon fontSize="small">{"add"}</Icon>
            </IconButton>
            <IconButton onClick={() => removeMessage()}>
              <Icon fontSize="small">{"delete"}</Icon>
            </IconButton>
          </div>
        </FuseAnimate>
      ) : null}

      <input
        onFocus={() => {
          node.setLocked(true);
        }}
        onBlur={() => {
          if (updateData) {
            updateData(value);
          }
          node.setLocked(false);
        }}
        placeholder="Click here to edit"
        className={classes.messageInput}
        onClick={e => e.stopPropagation()}
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};
export default function CommonLayout({ engine, node }) {
  let app = Application;
  const classes = useStyles();
  const dispatch = useDispatch();
  let nodeOpt = node.options,
    portObj = nodeOpt.portOpt || [],
    elementPort = [];

  const deleteNode = () => {
    app.deleteNode(node, engine.getModel().activeLinkLayer.models);
  };

  const openNodeDetail = function () {
    node.setLocked(true);
    dispatch(
      Actions.showNodeDetails({
        node,
        afterSave: (newData = {}) => {
          if (node.options.message === undefined) {
            delete newData.messages;
          } else {
            // delete newData.variable;
          }
          if (node.options.multiple === true) {
            var portObj = { ...node.__getPorts() };
            if (newData.portOpt.length) {
              newData.portOpt.forEach(function (obj) {
                if (portObj[obj.name] === undefined) {
                  node.__setPort(obj);
                } else {
                  delete portObj[obj.name];
                }
              });
            }
            _.keys(portObj).forEach(function (name) {
              node.__removePort(name);
            });
            node.options.portOpt = [...newData.portOpt];
          }
          delete newData.portOpt;
          node.options = { ...node.options, ...newData };
          node.setLocked(false);
          engine.repaintCanvas();
        },
        cancel: () => {
          node.setLocked(false);
        },
      })
    );
  };

  const isURLVideo = function (url) {
    return url.match(/\.(mp4|ogg)$/) != null;
  };

  const getMediaElement = function (url) {
    if (isURLVideo(url)) {
      return (
        <video controls>
          <source src={url}></source>
        </video>
      );
    } else {
      return <img src={url} alt="Click to Upload Media" />;
    }
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <List className={classes.list}>
          <ListItem className={classes.headerListItem}>
            <ListItemAvatar className={classes.listAvtar}>
              <Avatar>
                <Icon className="icon">{nodeOpt.icon}</Icon>
              </Avatar>
            </ListItemAvatar>
            <div className={classes.listGroup}>
              <ListItemText primary={nodeOpt.primaryText} secondary={nodeOpt.questionText} />
              <ListItemSecondaryAction className={classes.listAction} onClick={deleteNode}>
                <IconButton edge="end" aria-label="edit">
                  <Icon>{"delete"}</Icon>
                </IconButton>
              </ListItemSecondaryAction>
              <ListItemSecondaryAction
                className={classes.listAction}
                onClick={() => openNodeDetail()}
              >
                <IconButton edge="end" aria-label="edit">
                  <Icon>{"more_vert"}</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </div>
          </ListItem>
        </List>
      </div>
      {portObj.map((obj, i) => {
        let element = getPort({ index: i, obj, classes, engine, node });
        if (obj.componentProps) {
          elementPort.push(
            <div key={`c-${i}`} className={classes.optionBtn}>
              <InputButton
                classes={classes}
                node={node}
                nodeType={nodeOpt.nodeType}
                message={obj.componentProps.text}
                updateData={val => {
                  portObj[i].componentProps.text = val;
                  //engine.repaintCanvas();
                }}
                addNewMessage={() => {
                  let obj = {
                    linkType: "out",
                    componentProps: { type: "Button", text: "" },
                    name: `out-${_.getUID()}`,
                    in: false,
                  };
                  node.__setPort(obj);
                  portObj.push(obj);
                }}
                removeMessage={() => {
                  node.__removePort(portObj[i]);
                  portObj.splice(i, 1);
                }}
              />
              {element}
            </div>
          );
          return null;
        } else {
          return element;
        }
      })}
      {nodeOpt.messages || elementPort.length ? (
        <div className={classes.elementPort}>
          {nodeOpt.messages
            ? nodeOpt.messages.map((message, i) => (
                <InputButton
                  key={i}
                  node={node}
                  message={message}
                  updateData={val => {
                    nodeOpt.messages[i] = val;
                    //engine.repaintCanvas();
                  }}
                  addNewMessage={() => {
                    nodeOpt.messages.push("");
                  }}
                  removeMessage={() => {
                    nodeOpt.messages.splice(i, 1);
                  }}
                  classes={classes}
                />
              ))
            : null}
          {elementPort.length ? elementPort : null}
        </div>
      ) : null}
      {nodeOpt.nodeType === "MULTIPLE_CHECK_BOX" ? (
        <div className={classes.elementPort}>
          {nodeOpt.choices
            ? nodeOpt.choices.map((choice, i) => (
                <InputButton
                  key={i}
                  node={node}
                  message={choice}
                  checkBox={true}
                  updateData={val => {
                    nodeOpt.choices[i] = val;
                    //engine.repaintCanvas();
                  }}
                  addNewMessage={() => {
                    nodeOpt.choices.push("");
                  }}
                  removeMessage={() => {
                    nodeOpt.choices.splice(i, 1);
                  }}
                  classes={classes}
                />
              ))
            : null}
          {elementPort.length ? elementPort : null}
        </div>
      ) : null}
      {nodeOpt.nodeType === "MEDIA" && nodeOpt.media_url !== "" ? (
        <div className={classes.elementPort}>
          <div className={classes.imageUpload}>{getMediaElement(nodeOpt.media_url)}</div>
          {elementPort.length ? elementPort : null}
        </div>
      ) : null}
      {nodeOpt.nodeType === "CAROUSEL" &&
      nodeOpt.carousel_url.length > 0 &&
      nodeOpt.carousel_url[0] !== " " ? (
        <div className={classes.elementPort}>
          <Carousel
            className={classes.carousel}
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            deviceType={"desktop"}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {nodeOpt.carousel_url.map((img, i) => {
              return img !== "" ? (
                <div key={`img${i}`}>
                  <img src={img} alt="Click to Upload Media" className={classes.carousel} />
                </div>
              ) : null;
            })}
          </Carousel>
          {elementPort.length ? elementPort : null}
        </div>
      ) : null}
    </Fragment>
  );
}
