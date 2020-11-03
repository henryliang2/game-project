import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import Navigation from './components/Navigation';
import Landing from './components/Landing'
import Game from './components/Game';
import Search from './components/Search';
import GameList from './components/GameList';
import './styles/App.css';

export const UserContext = React.createContext(null);

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
    if(!popularGames.length) {
      fetch('http://localhost:8080/popular')
      .then(jsonData => jsonData.json())
      .then(data => { 
        const gameArray = data.results.slice(0, 6);
        setPopularGames(gameArray); 
      })
    }
  }, []) // eslint-disable-line

  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={ { user } }>

          <Navigation />

          <Switch>

            <Route path="/search/:queryString" children={
              <Search />
            }>
            </Route>

            <Route path="/game/:gameId" children={
              <Game />
            }>
            </Route>

            <Route path="/">
              <Landing />
              <GameList 
                title={ 'Popular Games' }
                games={ popularGames } />
            </Route>
          
          </Switch>

        </UserContext.Provider>
      </Router>    
    </React.Fragment>
  );
}

export default App;
