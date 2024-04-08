

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
import React from "react";
let markers = [];

function GuessMap(props) {
    const [map, setMap] = React.useState(null)
    const setResult = props.setResult;
    const setReady = props.setReady;
    var imgLocation;
    
    let mrk;
    const mapRef = useRef(null)
    const containerStyle = {
    width: '30vw',
    height: '30vw'
    };

    const center = {
    lat: -3.745,
    lng: -38.523
    };
    const [currentLoc, setCurrentLoc] = useState(center);

    let coordinates = {lat: center.lat, lng: center.lng};


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDUTQ1HuxGpIoy8akXAiFz5afqOMSc7JQI"
  })


  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
    map.setZoom(2);

    imgLocation = props.location;
    console.log("props imgLocation: " + imgLocation);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const getDistance = (location) => {
    imgLocation = props.location;
    console.log("imgLocation: " + imgLocation);
    imgLocation = JSON.parse(imgLocation);
    console.log("imgLocation: " + imgLocation);
    console.log("location: " + location);

    let lat1 = imgLocation[0];
    let lon1 = imgLocation[1];
    let lat2 = location[0];
    let lon2 = location[1];
    // console.log("lat1: " + lat1 + ", " + lon1 + "," + lat2 + ", " + lon2);


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

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    
    coordinates.lat = lat
    coordinates.lng = lng
    console.log('This is ->' + lat + ", " + lng)
    var locationObj = new window.google.maps.LatLng(lat, lng);
    var location =[lat, lng];
    map.setCenter(locationObj);
    console.log(map);
    setCurrentLoc(locationObj);

    // inside the map instance you can call any google maps method
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
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

    let diff = getDistance(location);
    diff = Math.round(diff/1609);
    props.setDist(diff);
    console.log("diff: " + diff);
    console.log("attemps: " + props.atmp);
    if(diff < 500){
      console.log("you win!!!");
      props.resSetter("Win");
      props.setReady(true);
      props.setScore(props.score + 1);
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    } else {
      if(props.atmp < 2) {
        props.resSetter("Try");
        props.setReady(true);

      }
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

    props.setAttempt(props.atmp + 1);
  }
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
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
        {/* {coordinates.map(({ lat, lng, name }, index) => ( */}
          <AdvancedMarker 
          position={{lat: 53.54992, lng: 10.00678}}
          >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />

          </AdvancedMarker>
        
        {/* ))} */}
        { /* Child components, such as markers, info windows, etc. */ }
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(GuessMap)
