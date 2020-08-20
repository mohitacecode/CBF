// imports
import React from "react";
import { useMemo, useState, useEffect } from "react";

// material & fuse
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseUtils from "@fuse/utils";
import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// components
import ContactListItem from "./ContactListItem";

//services
import BotDetailService from "app/services/bot/BotDetailService";

function ChatsSidebar(props) {
  const [activeChat, setActiveChat] = useState([]);
  const [histChat, setHistChat] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  if (activeChat.length < 1 && histChat.length < 1) {
    props.toggleChat(0);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    setLoading(true);
    BotDetailService.getActiveBots().then(res => {
      setActiveChat([...res.data]);
    });
    BotDetailService.getHistBots().then(res => {
      setLoading(false);
      setHistChat([...res.data]);
    });

    const interval = setInterval(() => {
      BotDetailService.getActiveBots().then(res => {
        setActiveChat([...res.data]);
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={1} className="">
        {useMemo(
          () => (
            <Toolbar className="px-16">
              <Paper className="flex p-4 items-center w-full px-8 py-4 rounded-8" elevation={1}>
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search Room Name"
                  className="flex flex-1 px-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    "aria-label": "Search Room Name",
                  }}
                  onChange={handleSearchText}
                />
              </Paper>
            </Toolbar>
          ),
          [searchText]
        )}
      </AppBar>
      <FuseLoading overlay={loading}>
        <FuseScrollbars className="overflow-y-auto flex-1">
          <List className="w-full">
            {useMemo(() => {
              function getFilteredArray(arr, _searchText) {
                if (_searchText.length === 0) {
                  return arr;
                }
                return FuseUtils.filterArrayByString(arr, _searchText);
              }
              function getFilteredHistArray(arr, _searchText) {
                if (_searchText.length === 0) {
                  return arr;
                }
                return FuseUtils.filterArrayByString(arr, _searchText);
              }

              const chatListArr = getFilteredArray([...activeChat], searchText);
              const histChatListArr = getFilteredHistArray([...histChat], searchText);

              return (
                <FuseAnimateGroup
                  enter={{
                    animation: "transition.expandIn",
                  }}
                  className="flex flex-col flex-shrink-0"
                >
                  {chatListArr.length > 0 && (
                    <Typography className="font-300 text-20 px-16 py-24" color="secondary">
                      Active Chats
                    </Typography>
                  )}

                  {chatListArr.map((contact, index) => (
                    <ContactListItem
                      status={contact.status}
                      type={contact.bot_info.chatbot_type}
                      selectedIndex={props.selectedIndex}
                      key={`active${index}`}
                      contact={contact}
                      time={contact.created_on}
                      callBack={props.callBack}
                    />
                  ))}
                  {histChatListArr.length > 0 && (
                    <Typography className="font-300 text-20 px-16 py-24" color="secondary">
                      Historic Chats
                    </Typography>
                  )}

                  {histChatListArr.map((contact, index) => (
                    <ContactListItem
                      status={contact.status}
                      type={contact.bot_info.chatbot_type}
                      selectedIndex={props.selectedIndex}
                      key={`hist${index}`}
                      contact={contact}
                      time={contact.created_on}
                      callBack={props.callBack}
                    />
                  ))}
                </FuseAnimateGroup>
              );
              // eslint-disable-next-line
            }, [activeChat, histChat, searchText])}
          </List>
        </FuseScrollbars>
      </FuseLoading>
    </div>
  );
}

export default ChatsSidebar;
