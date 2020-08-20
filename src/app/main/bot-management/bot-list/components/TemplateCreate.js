import React, { useState, Fragment, useEffect } from "react";
import _ from "@lodash";

// fuse && Material
import FuseAnimateGroup from "@fuse/core/FuseAnimateGroup";
import FuseLoading from "@fuse/core/FuseLoading";
import { makeStyles, Typography, Grid, MenuItem, Select, FormControl } from "@material-ui/core";

//component
import TemplatesCard from "../../templates/components/TemplatesCard";

//services
import TemplatesService from "app/services/templates/TemplatesService";

const useStyles = makeStyles(theme => ({
  filter: {
    marginTop: "0px",
  },
}));

function TemplateCreate(props) {
  const classes = useStyles();

  //local state
  const [filteredData, setFilteredData] = useState(null);
  const [templates, setTemplates] = useState(null);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [botType, setBotType] = React.useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    TemplatesService.getTemplates()
      .then(res => {
        setTemplates([...res.data]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function getFilteredArray() {
      if (botType === "all") {
        return templates;
      } else {
        return _.filter(templates, item => {
          return item.chatbot_type === botType;
        });
      }
    }
    if (templates) {
      setFilteredData(getFilteredArray());
    }
  }, [templates, botType]);

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
    <Fragment>
      {loading ? (
        <FuseLoading />
      ) : (
        <div className="flex flex-col flex-auto flex-shrink-0 w-full">
          <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
            {templates && templates.length > 0 ? (
              <Fragment>
                <div className={classes.filter}>
                  <Typography variant="subtitle1" component="span">
                    Create Chatbot from Template : filter
                  </Typography>
                  <FormControl
                    size="small"
                    variant="outlined"
                    style={{ width: "150px", marginLeft: "10px" }}
                  >
                    <Select
                      id="template_type"
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
                ) : null}
              </Fragment>
            ) : null}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default TemplateCreate;
