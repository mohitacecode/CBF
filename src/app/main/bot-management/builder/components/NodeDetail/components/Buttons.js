// imports
import React, { Fragment } from "react";
import _ from "@lodash";

//material
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

import { useDispatch } from "react-redux";
import * as Actions from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  messageInput: {
    padding: "6px 8px",
    background: "#39c7f5",
    color: "white",
    border: "none !important",
    outline: "none !important",
    width: "100%",
    marginBottom: theme.spacing(1),
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
  messageInputAction: {
    background: "#39c7f5",
    height: "100%",
    "& > button": {
      color: "white",
    },
  },
  elementAddBtn: {
    opacity: "0.8",
  },
}));

export default function Buttons({ nodeData, parentClasses }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const portOpt = nodeData.portOpt;

  const setPortOpt = function (newPortOpt) {
    dispatch(Actions.setNodeProperties({ portOpt: newPortOpt }));
  };

  const updatePortOpt = function (val, i) {
      let newPortOpt = [...portOpt];
      newPortOpt[i].componentProps.text = val;
      setPortOpt(newPortOpt);
    },
    addPortOpt = function () {
      let newPortOpt = [
        ...portOpt,
        {
          linkType: "out",
          componentProps: { type: "Button", text: "" },
          name: `out-${_.getUID()}`,
          in: false,
        },
      ];
      setPortOpt(newPortOpt);
    },
    deletePortOpt = function (i) {
      let newPortOpt = [...portOpt];
      newPortOpt.splice(i, 1);
      setPortOpt(newPortOpt);
    };

  return (
    <Fragment>
      <Divider className={parentClasses.divider} />
      <div className={parentClasses.elementBox}>
        <div>
          <div>
            {portOpt &&
              portOpt.map((obj, i) => {
                if (obj.componentProps) {
                  return (
                    <div key={`c-${i}`} className="flex">
                      <input
                        placeholder="Click here to edit"
                        className={classes.messageInput}
                        onChange={e => updatePortOpt(e.target.value, i)}
                        value={obj.componentProps.text}
                      />
                      {nodeData.nodeType === "YES_NO" ? null : (
                        <div className={classes.messageInputAction}>
                          <IconButton size="small" onClick={() => deletePortOpt(i)}>
                            <Icon>{"delete"}</Icon>
                          </IconButton>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
          {nodeData.nodeType === "YES_NO" ? null : (
            <Fragment>
              <Divider className={parentClasses.divider} />
              <Button
                fullWidth={true}
                variant="contained"
                color="primary"
                onClick={() => addPortOpt()}
                className={classes.elementAddBtn}
                startIcon={<Icon>{"add"}</Icon>}
              >
                Add Button
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
