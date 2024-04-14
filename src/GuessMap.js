

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
import React from "react";
import { View, Text } from 'react-native';

/* This is the map displayed on the right of GuessSpot. Users will use this map to guess where the image showed in GuessSpot was taken */
// props: location, resSetter, setReady, setAttempt, atmp, setDist, setScore, score

// keeps track of all the markers placed in one round
let markers = [];

// define the center of the map and set the current Location state to the center
const center = {
  lat: -3.745,
  lng: -38.523
};

// loading screen
const LoadingScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function GuessMap(props) {
  // the current google map being displayed
  const [map, setMap] = useState(null)
  const mapRef = useRef(null)

  // the location of the image currently displayed in GuessSpot
  var imgLocation = props.location;
  
  // sets the first marker as blank
  let mrk;

  // uses the center the set the current Location
  const [currentLoc, setCurrentLoc] = useState(center);

  // uses center to set the coordinates variable
  let coordinates = {lat: center.lat, lng: center.lng};

  // returns a boolean based on if the current map is loaded or not
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDUTQ1HuxGpIoy8akXAiFz5afqOMSc7JQI"
  })

  // once loaded set the map to the loaded map and zoom out
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    map.setZoom(2);
  }, [])

  // I dont think this is ever even used
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // calculate the distance away the click was from the image location in miles
  const getDistance = (location) => {
    imgLocation = props.location;
    imgLocation = JSON.parse(imgLocation);

    let lat1 = imgLocation[0];
    let lon1 = imgLocation[1];
    let lat2 = location[0];
    let lon2 = location[1];

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    console.log("d: " + d);

    return d;
  }

  // show a marker where the user clicks
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    // set coordinates of click
    coordinates.lat = lat
    coordinates.lng = lng

    var locationObj = new window.google.maps.LatLng(lat, lng);
    var location =[lat, lng];

    // center map around where user clicked
    map.setCenter(locationObj);
    setCurrentLoc(locationObj);

    // if a marker has not yet been initialised create a new marker and add it to the list of active markers
    if(!mrk) {
      mrk = new window.google.maps.Marker({
        markerId: markerId,
        position: locationObj,
        map: map
      });
    } else {
      mrk.setPosition(locationObj);
      map.setZoom(5);
      map.setCenter(locationObj);
    }
    markers.push(mrk);

    // calculate how accurate user was and display appropriate message 
    let diff = getDistance(location);
    diff = Math.round(diff/1609);
    props.setDist(diff);

    // if user guessed within 500 miles display winning message
    if(diff < 500){
      props.resSetter("Win");
      props.setReady(true);
      props.setScore(props.score + 1);
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }      
    // user guessed wrong 
    else {
      // if user still has attempts left let them try again
      if(props.atmp < 2) {
        props.resSetter("Try");
        props.setReady(true);
      }
      // if user has used 3 attempts display lost message
      else {
        props.resSetter("Lost");
        props.setReady(true);
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        var mapcenter = new window.google.maps.LatLng(-3.745, -38.523);
        setCurrentLoc(mapcenter);
        markers = [];
      }
    }
    map.setCenter(locationObj);

    // increase the number of attempts 
    props.setAttempt(props.atmp + 1);
  }

  // if the map is loaded then return the map else return loading screen 
  return isLoaded ? (
      // map
      <GoogleMap
        mapContainerStyle={{width: '30vw', height: '30vw'}}
        center={currentLoc}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={ev => {
            console.log("latitide = ", ev.latLng.lat());
            console.log("longitude = ", ev.latLng.lng());
            onMarkerClick(this, {markerId: 80,lat: ev.latLng.lat(),lng: ev.latLng.lng()});
        }}
        mapId={8008}
      >
          <AdvancedMarker 
          position={{lat: 53.54992, lng: 10.00678}}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        
      </GoogleMap>
  ) : <LoadingScreen/>
}

export default React.memo(GuessMap)
