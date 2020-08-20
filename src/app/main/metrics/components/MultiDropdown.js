import React from "react";
import {
  FormControl,
  Checkbox,
  ListItemText,
  MenuItem,
  Typography,
  Select,
  Input,
} from "@material-ui/core";

export default ({ items, title, className, selected, onChange }) => {
  return (
    <FormControl className={className} variant="outlined">
      <Typography variant="button" display="block" gutterBottom>
        {title} :
      </Typography>
      <Select
        multiple
        value={selected}
        input={<Input style={{ fontSize: "1.5rem" }} />}
        renderValue={selected => selected.join(", ")}
        onChange={e => onChange(e.target.value)}
      >
        {items.map((item, i) => {
          return (
            <MenuItem key={i} value={item}>
              <Checkbox checked={selected.indexOf(item) !== -1} />
              <ListItemText primary={item} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
