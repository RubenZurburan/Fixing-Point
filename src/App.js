import logo from './logo.png';
import landfall from './landfall.jpg';
import './App.css';
//import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [ page, changePage ] = useState('Home');
  const [ timer, changeTimer ] = useState(0);
  var currentTimerCount = timer;

  useEffect(() => {
    document.title = `Fixing Point 2021: ${page}`;
    if (page !== 'Home')
      changeTimer(0);
    if (page == 'Home')
      currentTimerCount = setInterval(() => {changeTimer(prevTimer => prevTimer + 1)}, 10);
      return () => clearInterval(currentTimerCount);
  });

  var timerHours = JSON.stringify(Math.floor(currentTimerCount / (3600 * 100)));
  var timerMinutes = JSON.stringify(Math.floor(currentTimerCount / (60 * 100)));
  var timerSeconds = JSON.stringify(Math.floor(currentTimerCount / 100));
  var timerJiffies = JSON.stringify(currentTimerCount % 100);

  function PageHome() {
    return (
      <div classname="App">
        <header className="App-header">
          <p><img src={logo} className="App-logo" alt="logo" /></p>
          <h1>Hello, world. You have been watching this page for:</h1>
          <p>{timerHours.padStart(2, '0')}:{timerMinutes.padStart(2, '0')}:{timerSeconds.padStart(2, '0')}:{timerJiffies.padStart(2, '0')}</p>
          <p>
            <button onClick={(() => changePage('About'))}>
              About
            </button>
            <button onClick={(() => changePage('Help'))}>
              Help
            </button>
          </p>
        </header>
      </div>
    );
  }
  function PageHelp() {
    return (
      <div classname="App">
        <header className="App-header">
          <h1>Help</h1>
          <p>What do you want?</p>
          <button onClick={(() => changePage('Home'))}>
            Home
          </button>
        </header>
      </div>
    )
  }
  function PageAbout() {
    return (
      <div classname="App">
        <header className="App-header">
          <h1>About</h1>
          <p>Fixing Point 2021 is an app developed by Ruben Brett for Blast Theory.</p>
          <button onClick={(() => changePage('Home'))}>
            Home
          </button>
        </header>
      </div>
    );
  }

  if (page == 'Home')
    return PageHome();
  if (page == 'About')
    return PageAbout();
  if (page == 'Help');
    return PageHelp();
}

//  render() {
//      return (
//          <div classname="App">
//            <header className="App-header">
//              <img src={logo} className="App-logo" alt="logo" />
//              <p></p>
//              {this.getPopout()}
//              <button onClick={() => this.setPopoutOpen(!this.state.showPopout)}>
//                  Hello world!
//              </button>
//            </header>
//          </div>
//      );
//  }

//  constructor() {
//      super();
//      this.state = {
//          showPopout: false
//      };
//  };
//
//  // This sets the above state variable
//  setPopoutOpen(open) {
//      this.setState({
//          showPopout: open
//      });
//  };
//
//  // When this component is unloaded, make sure we close the popout
//  componentDidMount() {
//      window.addEventListener('beforeunload', () => {
//          this.setPopoutOpen(false);
//      });
//  };

//  // This returns the HTML for the popout, or null if the popout isn't visible
//  getPopout() {
//      if (!this.state.showPopout) {
//          return null;
//      }

//      return (
//          <Popout title='Hello world!' closeWindow={() => this.setPopoutOpen(false)}>
//              <div><p>Hello again!</p></div>
//          </Popout>
//      );
//  };

// Render the popout and a button to show / hide it
