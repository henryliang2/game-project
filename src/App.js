import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import Navigation from './components/Navigation';
import Landing from './components/Landing'
import Game from './components/Game';
import Search from './components/Search';
import User from './components/User';
import Footer from './components/Footer';
import { SERVER_URL } from './urls';
import './styles/App.css';

export const UserContext = React.createContext(null);
export const BackgroundImageContext = React.createContext(null);

function App() {

  const [user, setUser] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(process.env.PUBLIC_URL + '/default-background.jpg');

  useEffect(() => {
    fetch(`${ SERVER_URL }/user/sync`, { credentials: 'include' })
    .then(jsonData => jsonData.json())
    .then(user => {
      if(user.userId) setUser(user);
    })
  }, [])

  useEffect(() => {
    if(user.userId) {
      fetch(`${ SERVER_URL }/user/update`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ user }),
        credentials: 'include' 
      })
    }
  }, [user])

  return (
    <React.Fragment>
      <Router>
        <UserContext.Provider value={ { user, setUser } }>
          <BackgroundImageContext.Provider value={ { backgroundImage, setBackgroundImage } }>

            <Navigation />

            <main>
              <div className='background' style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className='background-overlay'></div>
              </div>

                <Switch>

                  <Route path="/browse/:dateString/:orderingString/:queryString" children={
                    <Search type='browse' />
                  }>
                  </Route>

                  <Route path="/search/:queryString" children={
                    <Search type='targeted' />
                  }>
                  </Route>

                  <Route path="/game/:gameId" children={
                    <Game />
                  }>
                  </Route>

                  <Route path='/user'>
                    <User />
                  </Route>

                  <Route path="/">
                    <Landing />
                  </Route>
                
                </Switch>
            </main>

            <Footer />

          </BackgroundImageContext.Provider>
        </UserContext.Provider>
      </Router>    
    </React.Fragment>
  );
}

export default App;
