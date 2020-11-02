import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import Navigation from './components/Navigation';
import Landing from './components/Landing'
import Game from './components/Game';
import GameList from './components/GameList';
import './styles/App.css';

function App() {

  const [user, setUser] = useState({});
  const [popularGames, setPopularGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/user/sync', { credentials: 'include' })
    .then(jsonData => jsonData.json())
    .then(user => {
      if(user.userId) setUser(user);
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/popular')
    .then(jsonData => jsonData.json())
    .then(data => { 
      const gameArray = data.results.slice(0, 6);
      setPopularGames(gameArray); 
    })
  }, [])

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
            <GameList games={ popularGames } />
          </Route>
        
        </Switch>
      
      </Router>    
    </React.Fragment>
  );
}

export default App;
