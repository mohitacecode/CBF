import React from "react";
import { Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

const FilterButton = props => {
  return (
    <div className="px-32">
      <Button
        disabled={false}
        id="filter"
        onClick={() => props.onPress(true)}
        variant="contained"
        color="secondary"
      >
        <FilterListIcon />
      </Button>
    </div>
  );
};

export default FilterButton;
