import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, MenuItem, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";
import FilterDialog from "./FilterDialog";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const metrics = useSelector(({ metrics }) => metrics.metrics);
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const handleChange = event => {
    dispatch(Actions.toggleActiveMetrics(event.target.value));
  };

  useEffect(() => {
    dispatch(Actions.getBots());
    dispatch(Actions.getTeams());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-between items-center w-full">
      <FormControl className={classes.formControl}>
        <Select
          value={metrics.active}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="team">Team</MenuItem>
          <MenuItem value="operator">Operator</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button
          disabled={false}
          id="filter"
          onClick={() => setAreFiltersVisible(true)}
          variant="contained"
          color="secondary"
        >
          <FilterListIcon />
        </Button>
        <FilterDialog
          visible={areFiltersVisible}
          hideDialog={() => setAreFiltersVisible(false)}
          title={`Filter ${metrics.active} metrics`}
          channels={["website", "whatsapp"]}
          bots={metrics.bots}
          teams={metrics.teams}
          filter={metrics.filters}
          setFilter={filter => dispatch(Actions.setFilters(filter))}
        />
      </div>
    </div>
  );
};

export default Header;
