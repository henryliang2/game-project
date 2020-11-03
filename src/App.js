import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import Navigation from './components/Navigation';
import Landing from './components/Landing'
import Game from './components/Game';
import Search from './components/Search';
import GameList from './components/GameList';
import './styles/App.css';

export const UserContext = React.createContext(null);
export const BackgroundImageContext = React.createContext(null);

function App() {

  const [user, setUser] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(process.env.PUBLIC_URL + '/default-background.jpg');

  useEffect(() => {
    fetch('http://localhost:8080/user/sync', { credentials: 'include' })
    .then(jsonData => jsonData.json())
    .then(user => {
      if(user.userId) setUser(user);
    })
  }, [])

  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={ { user } }>
          <BackgroundImageContext.Provider value={ { backgroundImage, setBackgroundImage } }>

            <Navigation />

            <div className='game__background' style={{backgroundImage: `url(${backgroundImage})`}}>
              
              <div className='game__background-gradient'></div>

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
                </Route>
              
              </Switch>

            </div>

          </BackgroundImageContext.Provider>
        </UserContext.Provider>
      </Router>    
    </React.Fragment>
  );
}

export default App;
