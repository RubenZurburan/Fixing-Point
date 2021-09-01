import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import bear1 from './bulgaria-bear-1.jpg';
import bear2 from './bulgaria-bear-2.jpg';
import bear3 from './bulgaria-bear-3.jpg';
//import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
//import './Map.js';
//import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function App() {
  const [ page, changePage ] = useState('Home');

  useEffect(() => {
    document.title = `Fixing Point 2021: ${page}`;
  }, [page]);

  if (page === 'Home')
    return <PageHome navigate={changePage} />;
  if (page === 'About')
    return <PageAbout navigate={changePage} />;
  if (page === 'Help')
    return <PageHelp navigate={changePage} />;
  if (page === 'Map')
    return <PageMap navigate={changePage} />;
}

function PageHome(props) {
  const [ timer, changeTimer ] = useState(0);

  const timerHours = Math.floor((timer / (60 * 60 * 60)) % 60).toString().padStart(2, '0');
  const timerMinutes = Math.floor((timer / (60 * 60)) % 60).toString().padStart(2, '0');
  const timerSeconds = Math.floor((timer / 60) % 60).toString().padStart(2, '0');
  const timerThirds = (timer % 60).toString().padStart(2, '0');

  useEffect(() => {
    const currentInterval = setInterval(() => {changeTimer(prevTimer => prevTimer + 1)}, (1000 / 60));
    return () => clearInterval(currentInterval);
    }, [timer]);

  return (
    <div classname="App">
      <header className="App-header">
        <p><img src={bear2} className="Bear-pic" alt="bear2" /></p>
        <h1>Hello, world.</h1>
        <p>You have been watching this page for {timerHours}:{timerMinutes}:{timerSeconds}:{timerThirds}</p>
        <p>
          <button onClick={(() => props.navigate('About'))}>
            About
          </button>
          <button onClick={(() => props.navigate('Help'))}>
            Help
          </button>
          <button onClick={(() => props.navigate('Map'))}>
            Map
          </button>
        </p>
      </header>
    </div>
  );
}
function PageHelp(props) {
  return (
    <div classname="App">
      <header className="App-header">
        <p><img src={bear3} className="Bear-pic" alt="bear3" /></p>
        <h1>Help</h1>
        <p>
          <button onClick={(() => props.navigate('Home'))}>
            Home
          </button>
        </p>
      </header>
    </div>
  )
}
function PageAbout(props) {

  return (
    <div classname="App">
      <header className="App-header">
        <p><img src={bear1} className="Bear-pic" alt="bear1" /></p>
        <h1>About</h1>
        <p>Fixing Point 2021 is an app developed by Ruben Brett for Blast Theory.</p>
        <p>
          <button onClick={(() => props.navigate('Home'))}>
            Home
          </button>
        </p>
      </header>
    </div>
  );
}
function PageMap(props) {
  return (
    <div classname="App">
      <MapContainer id="mapid" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <p>
        <button onClick={(() => props.navigate('Home'))}>
          Home
        </button>
      </p>
    </div>
  )
}
