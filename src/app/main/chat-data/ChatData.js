import React, { useEffect } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import ChatDataTable from "./components/ChatData";
import Header from "./components/Header";
// import ChatDataTable from "./components/ChatData";

import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";

const ChatData = props => {
  const dispatch = useDispatch();
  const botList = useSelector(({ chatdata }) => chatdata.botList.data);
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  useEffect(() => {
    if (isAuthenticate) {
      dispatch(Actions.getListing());
    } else {
      props.history.push("/login");
    }
  }, [dispatch, isAuthenticate, props.history]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<Header botList={botList} />}
      content={<ChatDataTable botList={botList} props={props} />}
      // innerScroll
    />
  );
};

export default withReducer("chatdata", reducer)(ChatData);
