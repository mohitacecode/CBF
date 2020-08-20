import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Box,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import MultiDropdown from "./MultiDropdown";

const FilterDialog = props => {
  const { visible, hideDialog, title, channels, bots, teams, filter, setFilter } = props;
  const [fromDate, setFromDate] = useState(filter.date?.[0] || "");
  const [toDate, setToDate] = useState(filter.date?.[1] || "");
  const [filterChannels, setFilterChannels] = useState(filter.channels);
  const [filterBots, setFilterBots] = useState([]);
  const [filterTeams, setFilterTeams] = useState([]);

  const resetFilters = () => {
    setFilterChannels(channels);
    setFilterBots(bots);
    setFilterTeams(teams);
    setFromDate("");
    setToDate("");
  };

  const applyFilters = () => {
    const filter = {
      channels: filterChannels,
      bots: filterBots,
      teams: filterTeams,
    };
    if (fromDate) {
      filter.date = [];
      filter.date[0] = fromDate;
      if (toDate) filter.date[1] = toDate;
    }
    setFilter(filter);
    hideDialog();
  };

  useEffect(() => {
    setFilterBots(filter.bots);
    setFilterTeams(filter.teams);
  }, [filter]);

  return (
    <Dialog open={visible}>
      <DialogTitle id="form-dialog-title">
        <Box>{title}</Box>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col">
          <MultiDropdown
            selected={filterChannels}
            onChange={setFilterChannels}
            title="Channels"
            className="mb-24"
            items={channels}
          />
          <MultiDropdown
            selected={filterBots}
            onChange={setFilterBots}
            title="Bots"
            className="mb-24"
            items={bots}
          />
          <MultiDropdown
            selected={filterTeams}
            onChange={setFilterTeams}
            title="Teams"
            className="mb-24"
            items={teams}
          />
        </div>
        <div className="flex justify-between">
          <TextField
            id="date"
            label="From"
            type="date"
            value={fromDate}
            className="mr-24"
            onChange={e => {
              setFromDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="To"
            type="date"
            value={toDate}
            onChange={e => {
              setToDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={resetFilters} color="secondary">
          Reset
        </Button>
        <Button onClick={applyFilters} color="secondary" disabled={false}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
