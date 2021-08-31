import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function MapContainer() {
  const [ myMap, moveMyMap ] = useState(L.map('mapid', { center: [37.7749, -122.4194], zoom: 13 }));
  const [ currentLatitude, setLatitude ] = useState(37.7749);
  const [ currentLongitude, setLongitude ] = useState(-122.4194);
  const [ currentZoom, setZoom ] = useState(12);

  useEffect(() => {

  })

  render() {
    return (
      <div></div>
    )
  }
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'your.mapbox.access.token' }
).addTo(myMap);
const marker = L.marker([37.7544, -122.4477]).addTo(myMap);
marker.bindPopup("I am pointing to Twin Peaks");
