import logo from './logo.png';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import './Popout.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-fixing-point">About Fixing Point</Link>
            </li>
            <li>
              <Link to="/play">Play</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about-fixing-point">
            <About />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function AboutFixingPoint() {
  return <h2>About Fixing Point</h2>;
}

function Play() {
  return <h2>Play</h2>;
}
