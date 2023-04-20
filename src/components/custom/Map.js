/* global google */
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import "./Map.css";
import { getGoogleNearbyFood } from "../../api";

const Map = ({ location, food }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [closestPlaces, setClosestPlaces] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await refreshNearbyFood();
    })();
  }, [food]);

  const refreshNearbyFood = async () => {
    setIsLoading(true);
    getGoogleNearbyFood({
      radius: 1500,
      location: location,
      keyword: food,
    }).then((res) => {
      setClosestPlaces(res.data.response);
      console.log(res);
      setIsLoading(false);
    });
  };

  console.log("HELLOOOO", closestPlaces);

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({
      lat: location.latitude,
      lng: location.longitude,
    });
    console.log(closestPlaces);
    if (closestPlaces !== []) {
      console.log(closestPlaces);
      closestPlaces?.forEach((place) => {
        bounds.extend({ lat: place.lat, lng: place.lng });
      });
      map.fitBounds(bounds);
    }
  };

  const handleMarkerClick = (id, lat, lng, address, name, rating) => {
    console.log(id, lat, lng, address, name, rating);
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address, name, rating });
    setIsOpen(true);
  };

  return (
    <div className="map">
      {isloading ? (
        <h1>Loading...</h1>
      ) : !isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          <Marker
            key={"curr-pos"}
            position={{ lat: location.latitude, lng: location.longitude }}
            onClick={() => {
              handleMarkerClick(
                "curr-pos",
                location.latitude,
                location.longitude,
                "Current Location",
                5
              );
            }}
          >
            {isOpen && infoWindowData?.id === "curr-pos" && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <h3>{infoWindowData.address}</h3>
              </InfoWindow>
            )}
          </Marker>
          {closestPlaces?.map(({ address, lat, lng, name, rating }, ind) => (
            <Marker
              key={ind}
              position={{ lat, lng }}
              icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, address, name, rating);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{`name:${infoWindowData.address}`}</h3>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;

// import React, { useState, useEffect } from "react";
// import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

// const MapContainer = ({ google, location, food }) => {
//   const [closestPlaces, setClosestPlaces] = useState([]);

//   useEffect(() => {
//     const mapService = new google.maps.places.PlacesService(
//       document.createElement("div")
//     );

//     const request = {
//       location: new google.maps.LatLng(location.latitude, location.longitude),
//       radius: 1000,
//       type: ["restaurant"],
//       keyword: food,
//     };

//     mapService.nearbySearch(request, (results, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         console.log(results);
//         setClosestPlaces(results);
//       }
//     });
//   }, [google, location, food]);

//   return (
//     <div style={{ position: "relative" }}>
//       <Map
//         google={google}
//         zoom={800}
//         initialCenter={{ lat: location.latitude, lng: location.longitude }}
//         style={{
//           height: "80vh",
//           width: "80vw",
//           maxWidth: "1000px",
//           display: "flex",
//         }}
//       >
//         {closestPlaces.map((place) => (
//           <Marker
//             key={place.place_id}
//             position={{
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng(),
//             }}
//           />
//         ))}
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: "", //process.env.REACT_APP_GOOGLE_API_KEY,
// })(MapContainer);
