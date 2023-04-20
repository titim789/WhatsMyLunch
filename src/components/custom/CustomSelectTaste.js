import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  paper: {
    overflowY: "scroll",
    outerHeight: 100,
    innerHeight: 50,
  },
});

export const CustomSelectTaste = ({
  value,
  label,
  options,
  handleChange,
  disabledOptions,
}) => (
  <FormControl>
    <InputLabel>{label}</InputLabel>
    <Select
      displayEmpty
      value={value}
      onChange={handleChange}
      label={"TESTING"}
      MenuProps={{
        PaperProps: { sx: { maxHeight: "30vh" } },
      }}
    >
      <MenuItem value="">{value.name}</MenuItem>
      {options.map(
        (option) =>
          ~disabledOptions.includes(option) && (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
      )}
    </Select>
  </FormControl>
);
