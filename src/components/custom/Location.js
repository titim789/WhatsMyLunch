import React, { useState, useEffect } from "react";

const Location = ({ onLocationChange }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            alert("Please allow location access to use this app");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      onLocationChange(location);
    }
  }, [location, onLocationChange]);

  return;
};

export default Location;
