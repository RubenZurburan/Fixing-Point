import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import bear1 from './bulgaria-bear-1.jpg';
import bear1sound from './bulgaria-bear-1.mp3';
//import bear2sound from './bulgaria-bear-2.mp3';
import bear2 from './bulgaria-bear-2.jpg';
import bear3 from './bulgaria-bear-3.jpg';
import icon from 'leaflet/dist/images/marker-icon.png';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

export default function App() {
  const [ page, changePage ] = useState('Home');
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ currentAudio, setCurrentAudio ] = useState(new Audio(undefined));

  useEffect(() => {
    document.title = `Fixing Point: ${page}`;
  }, [page]);

  useEffect(() => setIsPlaying(false), [page]);

  if (page === 'Home')
    return <PageHome navigate={changePage} page={page} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />;
  if (page === 'Help')
    return <PageHelp navigate={changePage} page={page} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />;
  if (page === 'Play')
    return <PageMap navigate={changePage} page={page} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentAudio={currentAudio} setCurrentAudio={setCurrentAudio} />;
};

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
    <div className="App">
      <header className="Map-background">
        <p>
          <button className="Button-container" onClick={(() => props.navigate('Help'))}>
            Help
          </button>
          {" "}
          <button className="Button-container" onClick={(() => props.navigate('Play'))}>
            Play
          </button>
        </p>
        <p><img src={bear2} className="Bear-pic" alt="bear2" /></p>
        <h1>Hello, world.</h1>
        <p>You have been watching this page for {timerHours}:{timerMinutes}:{timerSeconds}:{timerThirds}</p>
      </header>
    </div>
  );
}
function PageHelp(props) {
  return (
    <div className="App">
      <header className="Map-background">
        <p>
          <button className="Button-container" onClick={(() => props.navigate('Home'))}>
            Home
          </button>
          {" "}
          <button className="Button-container" onClick={(() => props.navigate('Play'))}>
            Play
          </button>
        </p>
        <p><img src={bear3} className="Bear-pic" alt="bear3" /></p>
        <p>To play Fixing Point, navigate to the map page and follow the markers. <br />
           You need to enable location services in your browser in order to play. <br />
           The map should centre on your current location. <br />
           If it doesn't update when you move, check your network connection.</p>
      </header>
    </div>
  )
}
function PageMap(props) {
  const [ map, setMap ] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => setCurrentLocation([position.coords.latitude, position.coords.longitude])
  )});
  useEffect(() => { return playPause(props.currentAudio) }, [props.isPlaying]);

  //const bearSound = new Audio(bear1);
  function playPause(snd) {
    if (!props.isPlaying) {
      snd.pause();
    }
    if (props.isPlaying) {
      snd.play();
    }
  }
  function buttonPlayPause() {
    if (!props.isPlaying) {
      props.setIsPlaying(true);
    }
    if (props.isPlaying) {
      props.setIsPlaying(false);
    }
  }

  const markerIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: icon,
    iconAnchor: [5, 55],
    popupAnchor: [7, -44],
    iconSize: [24, 41],
  });

  return (
    <div className="App">
      <div className="Map-background">
        <p>
          <button className="Button-container" onClick={(() => props.navigate('Home'))}>
            Home
          </button>
          {" "}
          <button className="Button-container" onClick={(() => props.navigate('Help'))}>
            Help
          </button>
        </p>
        <MapContainer className="Map-container" center={currentLocation} zoom={9} scrollWheelZoom={false} zoomControl={false} whenCreated={map => setMap(map)}>
          <TileLayer
            attribution='Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA. . .. '
            url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
          />
          <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
          <Marker icon={markerIcon} position={[51.59, -0.09]}> <Popup className="Map-popup"> <button className="Button-container" onClick={() => props.setCurrentAudio(new Audio(bear1sound)) && buttonPlayPause()}> Click to listen </button> </Popup> </Marker>
          <Marker icon={markerIcon} position={[51.35, -0.57]}> <Popup className="Map-popup"> <button className="Button-container" onClick={(() => props.setCurrentAudio(undefined) && buttonPlayPause())}> Click to listen </button> </Popup> </Marker>
          <Marker icon={markerIcon} position={[51.103, -0.0838]}> <Popup className="Map-popup"> <button className="Button-container" onClick={(() => undefined)}> Click to listen </button> </Popup> </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
