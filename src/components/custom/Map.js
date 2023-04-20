import React, { useState, useEffect } from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

const MapContainer = ({ google, location, food }) => {
  const [closestPlaces, setClosestPlaces] = useState([]);

  useEffect(() => {
    const mapService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: new google.maps.LatLng(location.latitude, location.longitude),
      radius: 1000,
      type: ["restaurant"],
      keyword: food,
    };

    mapService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        setClosestPlaces(results);
      }
    });
  }, [google, location, food]);

  return (
    <div style={{}}>
      <Map
        google={google}
        zoom={800}
        initialCenter={{ lat: location.latitude, lng: location.longitude }}
        style={{ height: "80vh", width: "80vw", maxWidth: "1000px" }}
      >
        {closestPlaces.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
          />
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
