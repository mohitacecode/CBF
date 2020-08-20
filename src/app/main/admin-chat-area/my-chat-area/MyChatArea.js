// imports
import React, { useEffect, useState } from "react";
import clsx from "clsx";

// material
import { showMessage } from "app/store/actions/fuse/message.actions";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//components
import LiveChat from "./components/LiveChat";
import ChatsSidebar from "./components/ChatsSidebar";
import ContactSidebar from "./components/ContactSidebar";

// redux
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";

// services
import BotDetailService from "app/services/bot/BotDetailService";
import ChatManagementService from "app/services/chat-management";

const drawerWidth = 400;
const headerHeight = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100%",
    position: "relative",
    flex: "1 1 auto",
    height: "auto",
    backgroundColor: theme.palette.background.default,
  },
  topBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: headerHeight,
    backgroundImage: 'url("../../static/assets/images/backgrounds/header-bg.png")',
    backgroundColor: theme.palette.primary.dark,
    backgroundSize: "cover",
    pointerEvents: "none",
  },
  contentCardWrapper: {
    position: "relative",
    padding: 24,
    maxWidth: 1400,
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
    width: "100%",
    minWidth: "0",
    maxHeight: "100%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      padding: 16,
    },
    [theme.breakpoints.down("xs")]: {
      padding: 12,
    },
  },
  contentCard: {
    display: "flex",
    position: "relative",
    flex: "1 1 100%",
    flexDirection: "row",
    backgroundImage: 'url("/static/assets/images/patterns/rain-grey.png")',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: 8,
    minHeight: 0,
    overflow: "hidden",
  },
  drawerPaper: {
    width: drawerWidth,
    maxWidth: "100%",
    overflow: "hidden",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    zIndex: 10,
    background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
      theme.palette.background.paper,
      0.6
    )} 20%,${fade(theme.palette.background.paper, 0.8)})`,
  },
  content: {
    display: "flex",
    flex: "1 1 100%",
    minHeight: 0,
  },
}));

function MyChatArea(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  // redux state
  const contact = useSelector(({ chat }) => chat.contact);
  const isAuthenticate = useSelector(({ auth }) => auth.user.isAuthenticate);
  // local state
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactSidebarOpen, setContactSidebar] = useState(false);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [variables, setVariables] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [roomId, setRoomId] = useState(contact.room_id);
  const [roomName, setRoomName] = useState(contact.room_name);
  const [review, setReview] = useState([]);

  useEffect(() => {
    if (isAuthenticate === false) {
      props.history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const contactClick = contactData => {
    setChatOpen(false);
    setRoomId(contactData.room_id);
    setRoomName(contactData.room_name);
    setSelectedIndex(contactData.room_id);
    dispatch(Actions.saveContact({ ...contactData }));
    setTimeout(() => {
      setChatOpen(true);
    }, 500);
    setMobileSideBar(!mobileSideBar);
  };

  const toggleChat = e => {
    if (e !== 0) {
      setChatOpen(!chatOpen);
    } else {
      setChatOpen(false);
    }
  };

  const toggleContactSidebar = e => {
    if (!contactSidebarOpen) {
      setLoading(true);
      ChatManagementService.getChatReview({ pathParam: { room_id: contact.room_id } })
        .then(res => {
          setReview([...res.data.status]);
          setLoading(false);
        })
        .catch(err => {
          dispatch(showMessage({ message: "Failed to Get Review", variant: "error" }));
        });
      if (contact.bot_is_active) {
        BotDetailService.getSessionVariables({ pathParam: { room_id: contact.room_id } })
          .then(res => {
            console.log(res.data);
            setVariables({ ...res.data });
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            dispatch(showMessage({ message: "error", variant: "error" }));
          });
      } else {
        BotDetailService.getChatVariables({ pathParam: { room_id: contact.room_id } })
          .then(res => {
            console.log(res.data);
            setVariables({ ...res.data });
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            dispatch(showMessage({ message: "error", variant: "error" }));
          });
      }
    }

    setContactSidebar(!contactSidebarOpen);
  };

  return (
    <div className={clsx(classes.root)}>
      <div className={classes.topBg} />

      <div className={clsx(classes.contentCardWrapper, "container")}>
        <div className={classes.contentCard}>
          <Hidden mdUp>
            <Drawer
              className="h-full absolute z-20"
              variant="temporary"
              anchor="left"
              open={mobileSideBar}
              onClose={() => setMobileSideBar(!mobileSideBar)}
              classes={{
                paper: clsx(classes.drawerPaper, "absolute ltr:left-0 rtl:right-0"),
              }}
              style={{ position: "absolute" }}
              ModalProps={{
                keepMounted: true,
                disablePortal: true,
                BackdropProps: {
                  classes: {
                    root: "absolute",
                  },
                },
              }}
            >
              <ChatsSidebar
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                callBack={contactClick}
                toggleChat={toggleChat}
              />
            </Drawer>
          </Hidden>
          <Hidden smDown>
            <Drawer
              className="h-full z-20"
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <ChatsSidebar
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                callBack={contactClick}
                toggleChat={toggleChat}
              />
            </Drawer>
          </Hidden>

          <main className={clsx(classes.contentWrapper, "z-10")}>
            {chatOpen ? (
              <div className={classes.content}>
                <LiveChat
                  roomName={roomName}
                  roomId={roomId}
                  callBack={toggleContactSidebar}
                  close={() => {
                    setChatOpen(!chatOpen);
                    setSelectedIndex(null);
                  }}
                  type="bot"
                />
              </div>
            ) : (
              <div className="flex flex-col flex-1 items-center justify-center p-24">
                <Paper className="rounded-full p-48">
                  <Icon className="block text-64" color="secondary">
                    chat
                  </Icon>
                </Paper>
                <Typography variant="h6" className="my-24">
                  Chat App
                </Typography>
                <Typography
                  className="hidden md:flex px-16 pb-24 mt-24 text-center"
                  color="textSecondary"
                >
                  Select a contact to start a conversation!..
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  className="flex md:hidden normal-case"
                  onClick={() => setMobileSideBar(!mobileSideBar)}
                >
                  Select a contact to start a conversation!..
                </Button>
              </div>
            )}
          </main>

          <Drawer
            className="h-full absolute z-30"
            variant="temporary"
            anchor="right"
            open={contactSidebarOpen}
            onClose={() => toggleContactSidebar()}
            classes={{
              paper: clsx(classes.drawerPaper, "absolute ltr:right-0 rtl:left-0"),
            }}
            style={{ position: "absolute" }}
            ModalProps={{
              keepMounted: true,
              disablePortal: true,
            }}
          >
            <ContactSidebar
              loading={loading}
              close={toggleContactSidebar}
              review={review}
              variables={variables}
            />
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default withReducer("chat", reducer)(MyChatArea);
