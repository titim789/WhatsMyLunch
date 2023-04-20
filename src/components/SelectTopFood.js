import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  getFoodDataset,
  getUserTopFoodChoice,
  setUserTopFoodChoice,
} from "../api";
import { Header } from "./header";
import { toast } from "react-toastify";

const DropdownWithPreset = ({
  presetValue,
  label,
  handleChange,
  dropdownOptions,
}) => (
  <FormControl>
    <InputLabel>{label}</InputLabel>
    <Select value={presetValue} onChange={handleChange}>
      {dropdownOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const SelectTopFood = ({ checkAuth }) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [foodNameToIdMapping, setFoodNameToIdMapping] = useState({});
  const [dropdownValues, setDropdownValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
    refreshFoodDataset();
    refreshUserTopFoodChoice();
  }, []);

  const refreshFoodDataset = () => {
    setIsLoading(true);
    getFoodDataset().then((res) => {
      console.log(res);
      const tempDropDownOptions = [];
      const tempFoodNameToIdMapping = {};
      res.data.map((food) => {
        tempDropDownOptions.push(food.name);
        tempFoodNameToIdMapping[food.name] = food.id;
      });
      setDropdownOptions(tempDropDownOptions);
      setFoodNameToIdMapping(tempFoodNameToIdMapping);
    });
    setIsLoading(false);
  };

  const refreshUserTopFoodChoice = () => {
    setIsLoading(true);
    getUserTopFoodChoice().then((res) => {
      console.log(res);
      setDropdownValues(
        res.data.usertopfoodchoice.map((userchoice) => {
          return userchoice.name;
        })
      );
    });
    setIsLoading(false);
  };

  const handleChange = (event, index) => {
    const newValues = [...dropdownValues];
    newValues[index] = event.target.value;
    setDropdownValues(newValues);
  };

  const handleSubmit = () => {
    // Submit dropdownValues array
    const mappedDropdownValues = dropdownValues?.map((choice) => {
      return foodNameToIdMapping[choice];
    });
    console.log(mappedDropdownValues);
    setUserTopFoodChoice(mappedDropdownValues)
      .then(toast.success("Your Taste Palette has been updated!"))
      .catch((err) => {
        console.log(err);
        toast.error(
          "Error Occured. Unable to send request at the moment. Sorry for the inconvinience."
        );
      });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "70px",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        {dropdownValues.map((value, index) => (
          <DropdownWithPreset
            key={index}
            label={`Rank ${index + 1}`}
            presetValue={value ? value : ""}
            handleChange={(event) => handleChange(event, index)}
            dropdownOptions={dropdownOptions}
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SelectTopFood;
