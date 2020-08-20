// imports
import React, { useMemo, useState, useEffect } from "react";

// material & fuse
import { makeStyles } from "@material-ui/core/styles";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseUtils from "@fuse/utils";
import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Pagination from "@material-ui/lab/Pagination";

// components
import ContactListItem from "./ContactListItem";
import FilterList from "./FilterList";

//services
import BotDetailService from "app/services/bot/BotDetailService";

const useStyles = makeStyles(theme => ({
  page: {
    marginTop: "5px",
  },
}));

function ChatsSidebar(props) {
  const classes = useStyles();
  const channels = ["website", "whatsapp"];
  const statuses = ["unassgined", "pending", "resolve", "disconnected"];

  const [activeChat, setActiveChat] = useState([]);
  const [histChat, setHistChat] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [operators, setOperators] = useState([]);
  const [botName, setBotName] = useState([]);
  const [selectedIndex1, setSelectedIndex1] = useState([]);
  const [selectedIndex2, setSelectedIndex2] = useState([]);
  const [selectedIndex3, setSelectedIndex3] = useState([]);
  const [chatStatuses, setChatStatuses] = useState([]);
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [getHist, setGetHist] = useState(false);
  const [filters, setFilters] = useState({});
  const [pageActive, setPageActive] = useState(1);
  const [rowsPerPageActive, setRowsPerPageActive] = useState(1);
  const [pageHist, setPageHist] = useState(1);
  const [rowsPerPageHist, setRowsPerPageHist] = useState(1);

  if (activeChat.length < 1 && histChat.length < 1) {
    props.toggleChat(0);
  }

  useEffect(() => {
    const data = { ...filters, page: pageActive };
    if (props.takeover) data.takeover = true;
    BotDetailService.getFilteredActiveBots({ data })
      .then(res => {
        setActiveChat([...res.data.data]);
        let length = res.data.total_length;
        if (length < 5) {
          setRowsPerPageActive(1);
        } else {
          let no = length / 5;
          let page = Math.ceil(no);
          setRowsPerPageActive(page);
        }
      })
      .catch(err => {
        setLoading(false);
      });

    if (getHist) {
      setLoading(true);
      BotDetailService.getFilteredHistBots({ data: { ...filters, page: pageHist } })
        .then(res => {
          setLoading(false);
          setHistChat([...res.data.data]);
          let length = res.data.total_length;
          if (length < 5) {
            setRowsPerPageHist(1);
          } else {
            let no = length / 5;
            let page = Math.ceil(no);
            setRowsPerPageHist(page);
          }
        })
        .catch(err => {
          setLoading(false);
        });
    }

    const interval = setInterval(() => {
      BotDetailService.getFilteredActiveBots({ data }).then(res => {
        setActiveChat([...res.data.data]);
        let length = res.data.total_length;
        if (length < 5) {
          setRowsPerPageActive(1);
        } else {
          let no = length / 5;
          let page = Math.ceil(no);
          setRowsPerPageActive(page);
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [filters, pageActive, pageHist]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const handleApply = e => {
    let filt = {};
    if (
      !chatStatuses.length &&
      !selectedIndex3.length &&
      !selectedIndex2.length &&
      !selectedIndex1.length &&
      !selectedFromDate
    ) {
      setFilters({});
      return;
    }
    if (selectedIndex3.length) {
      const bot_hash = selectedIndex3.map(index => {
        return botName[index].bot_hash;
      });
      filt = { ...filt, bot_hash: bot_hash };
    }
    if (selectedIndex2.length) {
      const operator = selectedIndex2.map(index => {
        return operators[index].email;
      });
      filt = { ...filt, operator: operator };
    }
    if (selectedIndex1.length) {
      const channel = selectedIndex1.map(index => {
        return channels[index];
      });
      filt = { ...filt, channels: channel };
    }
    if (chatStatuses.length) {
      const filterField = chatStatuses.map(index => {
        return statuses[index];
      });
      filt = { ...filt, statuses: filterField };
    }
    if (selectedFromDate) {
      filt = { ...filt, date_range: [selectedFromDate] };
      if (selectedToDate) {
        filt = { ...filt, date_range: [selectedFromDate, selectedToDate] };
      }
    }
    setFilters({ ...filt });
    setOpenFilter(false);
  };

  return (
    <div className="flex flex-col flex-auto h-full">
      <AppBar position="static" color="default" elevation={1} className="">
        <Toolbar className="px-16 pt-16 flex flex-col">
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
            <Tooltip title="open / close filter" arrow>
              <IconButton
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
                style={{ marginLeft: "5px" }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                size="small"
              >
                <Icon color="primary">filter_list_rounded</Icon>
              </IconButton>
            </Tooltip>
          </Paper>
          <Dialog
            fullWidth
            maxWidth={"sm"}
            open={openFilter}
            onClose={() => {
              setOpenFilter(false);
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{`Filter Active Chats`}</DialogTitle>
            <DialogContent>
              <FilterList
                setGetHist={setGetHist}
                getHist={getHist}
                setOperators={setOperators}
                setBotName={setBotName}
                channels={channels}
                operators={operators}
                botName={botName}
                selectedIndex1={selectedIndex1}
                setSelectedIndex1={setSelectedIndex1}
                selectedIndex2={selectedIndex2}
                setSelectedIndex2={setSelectedIndex2}
                selectedIndex3={selectedIndex3}
                setSelectedIndex3={setSelectedIndex3}
                statuses={statuses}
                chatStatuses={chatStatuses}
                setChatStatuses={setChatStatuses}
                selectedFromDate={selectedFromDate}
                setSelectedFromDate={setSelectedFromDate}
                selectedToDate={selectedToDate}
                setSelectedToDate={setSelectedToDate}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenFilter(false);
                }}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setSelectedIndex1([]);
                  setSelectedIndex2([]);
                  setSelectedIndex3([]);
                  setChatStatuses([]);
                  setSelectedFromDate("");
                  setSelectedToDate("");
                  setFilters({});
                  setGetHist(false);
                  setPageActive(1);
                  setPageHist(1);
                  setRowsPerPageActive(1);
                  setRowsPerPageHist(1);
                }}
                variant="contained"
                color="primary"
              >
                Clear Filter
              </Button>
              <Button
                onClick={() => {
                  handleApply();
                  setPageActive(1);
                  setPageHist(1);
                  setRowsPerPageActive(1);
                  setRowsPerPageHist(1);
                }}
                variant="contained"
                color="secondary"
              >
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
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
                      type={contact.bot_info.chatbot_type}
                      selectedIndex={props.selectedIndex}
                      key={`active${index}`}
                      contact={contact}
                      time={contact.created_on}
                      status={contact.status}
                      callBack={props.callBack}
                    />
                  ))}
                  {chatListArr.length > 0 && (
                    <Pagination
                      className={classes.page}
                      count={rowsPerPageActive}
                      page={pageActive}
                      onChange={(e, val) => {
                        setPageActive(val);
                      }}
                    />
                  )}

                  {getHist && histChatListArr.length > 0 ? (
                    <Typography className="font-300 text-20 px-16 py-24" color="secondary">
                      Historic Chats
                    </Typography>
                  ) : null}

                  {getHist
                    ? histChatListArr.map((contact, index) => (
                        <ContactListItem
                          type={contact.bot_info.chatbot_type}
                          selectedIndex={props.selectedIndex}
                          key={`hist${index}`}
                          contact={contact}
                          time={contact.created_on}
                          callBack={props.callBack}
                        />
                      ))
                    : null}

                  {getHist && histChatListArr.length > 0 ? (
                    <Pagination
                      className={classes.page}
                      count={rowsPerPageHist}
                      page={pageHist}
                      onChange={(e, val) => {
                        setPageHist(val);
                      }}
                    />
                  ) : null}
                  {chatListArr.length === 0 && histChatListArr.length === 0 ? (
                    <Typography variant="h6" style={{ padding: "20px" }}>
                      No Data
                    </Typography>
                  ) : null}
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
