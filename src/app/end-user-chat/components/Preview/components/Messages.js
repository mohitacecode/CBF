import React, { Fragment, useState, useEffect } from "react";
import clsx from "clsx";
import _ from "@lodash";

//material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

// components
import Rating from "./Rating";
import Carousel from "./Carousel";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "20px",
  },
  width100: {
    width: "calc(80% - 16px)",
    maxWidth: "100% !important",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  link: {
    fontSize: "14px",
    color: "#0085f7 !important",
    textDecoration: "none",
  },
  chatPop: {
    display: "flex",
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1),
    maxWidth: "70%",
    borderBottomLeftRadius: "10px",
    borderTopRightRadius: "10px",
    wordBreak: "break-word",
  },
  botPop: {
    background: theme.palette.grey[300],
    "&.start": {
      alignSelf: "flex-start",
    },
    "&.end": {
      alignSelf: "flex-end",
    },
  },
  userPop: {
    background: theme.color ? theme.color.background : "#273240",
    color: "white",
    "&.start": {
      alignSelf: "flex-start",
    },
    "&.end": {
      alignSelf: "flex-end",
    },
  },
  buttons: {
    margin: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  mediaBox: {
    padding: "0px",
  },
  imageUpload: {
    width: "100%",
    height: "auto",
    maxHeight: "300px",
    minHeight: "34px",
    fontSize: "18px",
  },
  check: {
    display: "flex",
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1),
    flexDirection: "column",
    background: theme.palette.grey[300],
    borderBottomLeftRadius: "10px",
    borderTopRightRadius: "10px",
    maxWidth: "70%",
  },
  carousel: {
    width: "300px",
    height: "300px",
  },
}));

const useLoadingStyles = makeStyles(theme => ({
  spinner: {
    width: "100%",
    textAlign: "center",
    "& > div": {
      width: "7px",
      height: "7px",
      marginRight: "4px",
      background: theme.color ? theme.color.background : "#333",
      borderRadius: "100%",
      display: "inline-block",
      animation: "$sk-bouncedelay 1.4s infinite ease-in-out both",
    },
    "& > .bounce1": {
      animationDelay: "-0.32s",
    },
    "& > .bounce2": {
      animationDelay: "-0.16s",
    },
  },
  "@keyframes sk-bouncedelay": {
    "0%, 80%, 100%": {
      transform: "scale(0)",
    },
    "40%": {
      transform: "scale(1.0)",
    },
  },
}));

const Loading = function () {
  const classes = useLoadingStyles();
  return (
    <div className={classes.spinner}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};

const Message = function ({
  obj,
  buttonClick,
  admin,
  setUserInputVal,
  setPlaceholder,
  setRating,
  handelChange,
}) {
  const classes = useStyles();
  const [choices, setChoices] = useState([]);

  const setCheck = value => {
    if (choices.indexOf(value) === -1) {
      setChoices([...choices, value]);
    } else {
      let index = choices.indexOf(value);
      let temp = [...choices];
      temp.splice(index, 1);
      setChoices([...temp]);
    }
  };

  useEffect(() => {
    if (setUserInputVal) {
      setUserInputVal(choices.join());
    }
    // eslint-disable-next-line
  }, [choices]);

  const getBotChatElement = function ({ obj, i, fullWidth, className }) {
    let opt = {
      className: clsx(
        classes.chatPop,
        classes.botPop,
        [admin ? "end" : "start"],
        {
          [classes.width100]: fullWidth,
        },
        className
      ),
    };
    if (i !== undefined) {
      opt["key"] = `q-${i}`;
    }
    return <span {...opt}>{obj}</span>;
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
      return <img src={url} alt="media" />;
    }
  };

  return (
    <Fragment>
      {setPlaceholder ? setPlaceholder("Type Text Here...") : null}
      {_.isString(obj) ? getBotChatElement({ obj: obj }) : null}
      {obj.messages && obj.messages.length
        ? obj.messages.map((text, i) => getBotChatElement({ obj: text, i }))
        : null}
      {obj.questionText && obj.questionText.length
        ? getBotChatElement({ obj: obj.questionText })
        : null}
      {obj.nodeType === "LINK"
        ? getBotChatElement({
            obj: (
              <Link target="_blank" className={classes.link} href={obj.urlMessage}>
                {obj.urlMessage}
              </Link>
            ),
            fullWidth: true,
          })
        : null}
      {obj.nodeType === "MEDIA" && obj.media_url !== ""
        ? obj.link_option && obj.link !== ""
          ? getBotChatElement({
              obj: (
                <Link target="_blank" className={classes.link} href={obj.link}>
                  <div className={classes.imageUpload}>{getMediaElement(obj.media_url)}</div>
                </Link>
              ),
              fullWidth: true,
              className: classes.mediaBox,
            })
          : getBotChatElement({
              obj: <div className={classes.imageUpload}>{getMediaElement(obj.media_url)}</div>,
              fullWidth: true,
              className: classes.mediaBox,
            })
        : null}

      {obj.nodeType === "CAROUSEL" && obj.carousel_url[0] !== " "
        ? getBotChatElement({
            obj: (
              <Carousel
                images={obj.carousel_url}
                linkTexts={obj.link_carousel_text}
                links={obj.link_carousel}
              />
            ),
            fullWidth: true,
            className: classes.mediaBox,
          })
        : null}

      {obj.nodeType === "MULTIPLE_CHECK_BOX" ? (
        <div className={classes.check}>
          {obj.choices.map((text, i) => (
            <div className={classes.checkBox} key={i}>
              <Checkbox color="primary" value={text} onChange={e => setCheck(e.target.value)} />
              <Typography variant="subtitle1" component="span">
                {text}
              </Typography>
            </div>
          ))}
        </div>
      ) : null}
      {obj.nodeType === "RATING" ? (
        <Fragment>
          <Rating
            node={obj}
            setUserInputVal={setUserInputVal}
            setRating={setRating}
            handelChange={handelChange}
          />
          {obj.feedback_input ? setPlaceholder("Enter Feedback...") : null}
        </Fragment>
      ) : null}
      {obj.nodeType === "ADDRESS" ? setPlaceholder("Enter Address...") : null}
      {obj.buttons ? (
        <div className={classes.buttons}>
          {obj.buttons.map((obj, i) => (
            <Button
              key={`b-${i}`}
              variant="outlined"
              color="primary"
              onClick={() => buttonClick(obj)}
            >
              {obj.text}
            </Button>
          ))}
        </div>
      ) : null}

      {obj.userInputVal ? (
        <span className={clsx(classes.chatPop, classes.userPop, [admin ? "start" : "end"])}>
          {obj.userInputVal}
        </span>
      ) : null}
    </Fragment>
  );
};

function Messages({ messages, loadingMessage, ...rest }) {
  const classes = useStyles();
  const [messageList, setMessageList] = useState(messages);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  return (
    <Fragment>
      {messageList.map((obj, i) => (
        <Message key={`m-${i}`} obj={obj} {...rest} />
      ))}
      {loadingMessage ? (
        <div className={clsx(classes.chatPop, classes.botPop, [rest.admin ? "end" : "start"])}>
          <Loading />
        </div>
      ) : null}
    </Fragment>
  );
}
export default Messages;
