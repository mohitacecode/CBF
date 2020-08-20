import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { CircularProgress, Chip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";

const ChatData = ({ botList, props }) => {
  const dispatch = useDispatch();
  const chatdata = useSelector(({ chatdata }) => chatdata.chatdata);
  const activeBot = useSelector(({ chatdata }) => chatdata.botList.active);
  const visitor = useSelector(({ chatData }) => chatdata.visitors);
  const lead = useSelector(({ chatData }) => chatdata.leads);
  const [loading, setLoading] = useState(false);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  useEffect(() => {
    if (isAuthenticate) {
      setLoading(true);
      if (botList.length && activeBot) {
        dispatch(Actions.getData(activeBot)).then(() => setLoading(false));
        dispatch(Actions.getVisitors(activeBot));
        dispatch(Actions.getLeads(activeBot));
      }
    } else props.history.push("/login");
    // eslint-disable-next-line
  }, [activeBot, botList]);

  if (loading) {
    if (botList.length === 0) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <h2>No bot available to show data</h2>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress color="secondary" />
        </div>
      );
    }
  } else {
    if (!chatdata.data.length) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <h2>The selected bot does not have any chat history yet</h2>
        </div>
      );
    }
    return (
      <div className="w-full">
        <MaterialTable
          style={{ minHeight: "100%" }}
          columns={chatdata.headers}
          data={chatdata.data}
          title="Chat Data"
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: "0px 10px" }}>
                  <Chip
                    label={`Visitors - ${visitor}`}
                    color="secondary"
                    style={{ marginRight: 5 }}
                  />
                  <Chip label={`Leads - ${lead}`} color="primary" style={{ marginRight: 5 }} />
                </div>
              </div>
            ),
          }}
          options={{
            sorting: true,
          }}
        />
      </div>
    );
  }
};

export default ChatData;
