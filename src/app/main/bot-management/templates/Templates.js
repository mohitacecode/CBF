import React, { useState, Fragment, useEffect } from "react";
import clsx from "clsx";
import _ from "@lodash";
//fuse
import FuseAnimate from "@fuse/core/FuseAnimate";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
//material-ui
import {
  makeStyles,
  TextField,
  Typography,
  Icon,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
//Redux
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import reducer from "./store/reducers";
import withReducer from "app/store/withReducer";
//component
import TemplatesCard from "./components/TemplatesCard";
const useStyles = makeStyles(theme => ({
  header: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  headerIcon: {
    position: "absolute",
    top: -54,
    left: 0,
    opacity: 0.04,
    fontSize: 200,
    width: 512,
    height: 512,
    pointerEvents: "none",
  },
}));

function Templates(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  //local state
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [botType, setBotType] = React.useState("all");
  const Templates = useSelector(({ Template }) => {
    return Template.templatesReducer.data;
  });
  const isAuthenticate = useSelector(({ auth }) => {
    return auth.user.isAuthenticate;
  });
  useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0) {
        if (botType === "all") {
          return Templates;
        } else {
          return _.filter(Templates, item => {
            return item.chatbot_type === botType;
          });
        }
      }
      return _.filter(Templates, item => {
        if (botType === "all") {
          return item.title.toLowerCase().includes(searchText.toLowerCase());
        } else {
          return (
            item.title.toLowerCase().includes(searchText.toLowerCase()) &&
            item.chatbot_type === botType
          );
        }
      });
    }
    if (Templates) {
      setFilteredData(getFilteredArray());
    }
  }, [Templates, searchText, botType]);
  useEffect(() => {
    if (isAuthenticate) {
      setLoading(true);
      dispatch(Actions.getTemplates()).then(() => setLoading(false));
    } else {
      props.history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  const handleBotType = e => {
    setBotType(e.target.value);
  };

  return (
    <div className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div
        className={clsx(
          classes.header,
          "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-100"
        )}
      >
        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
          <Typography color="inherit" className="text-12 sm:text-20 font-light">
            List of Templates
          </Typography>
        </FuseAnimate>
        <Icon className={classes.headerIcon}> color_lens </Icon>
      </div>
      {loading ? (
        <FuseLoading />
      ) : (
        <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
          {Templates && Templates.length > 0 ? (
            <Fragment>
              <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                <TextField
                  label="Search for Template Title"
                  placeholder="Enter a keyword..."
                  className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                  value={searchText}
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  onChange={handleSearchText}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl
                  variant="outlined"
                  className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                >
                  <Select
                    labelId="controlled-open-select-label"
                    id="bot_type"
                    open={openDropdown}
                    onClose={handleCloseDropdown}
                    onOpen={handleOpenDropdown}
                    value={botType}
                    onChange={handleBotType}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="website">Website</MenuItem>
                    <MenuItem value="whatsapp">WhatsApp</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {filteredData && filteredData.length > 0 ? (
                <FuseAnimateGroup
                  enter={{
                    animation: "transition.slideUpBigIn",
                  }}
                  className="flex flex-wrap py-24"
                >
                  <Grid container spacing={2}>
                    {filteredData.map((template, i) => (
                      <TemplatesCard key={i} template={template} />
                    ))}
                  </Grid>
                </FuseAnimateGroup>
              ) : (
                <Typography color="textSecondary" className="text-24 my-24">
                  No Templates Available
                </Typography>
              )}
            </Fragment>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default withReducer("Template", reducer)(Templates);
