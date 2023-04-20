import { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";

import { Context } from "./custom/Context";
import { Header } from "./header";
import { getSurpriseMe, getWml } from "../api";
import Location from "./custom/Location";
import Map from "./custom/Map";
import "./SuggestFood.css";

const SuggestFood = ({ checkAuth }) => {
  const [userChoice, setUserChoice] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [userRecommendation, setUserRecommendation] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    checkAuth();
    refreshUserRecommendation();
  }, []);

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  const refreshUserRecommendation = () => {
    setIsLoading(true);
    if (userChoice === "lunch") {
      getWml().then((res) => {
        setUserRecommendation(res.data.foodchoice[0].name);
        console.log(res.data.foodchoice[0]);
        setIsLoading(false);
      });
    } else {
      getSurpriseMe().then((res) => {
        setUserRecommendation(res.data.foodchoice[0].name);
        console.log(res.data.foodchoice[0]);
        setIsLoading(false);
      });
    }
    setIsLoading(false);
  };

  return (
    <div class="suggest-food">
      <Header />
      <Location onLocationChange={handleLocationChange} />
      <Map location={location} food={userRecommendation} />
      <h1>{`Food Recommendation: ${userRecommendation}`}</h1>
    </div>
  );
};

export default SuggestFood;
