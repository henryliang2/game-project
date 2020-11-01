import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import Navigation from './components/Navigation';
import Landing from './components/Landing'
import Game from './components/Game';
import './styles/App.css';

function App() {
  return (
    <React.Fragment>
      <Router>

        <Navigation />

        <Switch>

          <Route path="/game/:gameId" children={
            <Game />
          }>
          </Route>

          <Route path="/">
            <Landing />
          </Route>
        
        </Switch>
      
      </Router>    
    </React.Fragment>
  );
}

export default App;
