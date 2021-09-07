import L from 'leaflet';
import bear1sound from './bulgaria-bear-1.mp3';
import bear2sound from './after-you-ve-gone.mp3';
import bear2 from './bulgaria-bear-2.jpg';
import bear3 from './bulgaria-bear-3.jpg';
import icon from 'leaflet/dist/images/marker-icon.png';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

const listen1 = () => return (
  <Marker icon={markerIcon} position={[51.59, -0.09]}> <Popup className="Map-popup"> <button className="Button-container" onClick={() => props.setCurrentAudio(new Audio(bear1sound)) && buttonPlayPause()}> Click to listen </button> </Popup> </Marker>
);

const listen2 = () => return (
  <Marker icon={markerIcon} position={[51.35, -0.57]}> <Popup className="Map-popup"> <button className="Button-container" onClick={(() => props.setCurrentAudio(new Audio(bear2sound)) && buttonPlayPause())}> Click to listen </button> </Popup> </Marker>
);

const listen3 = () => return (
  <Marker icon={markerIcon} position={[51.103, -0.0838]}> <Popup className="Map-popup"> <button className="Button-container" onClick={(() => undefined)}> Click to listen </button> </Popup> </Marker>
);

export { listen1, listen2, listen3 };
