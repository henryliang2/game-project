import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import GameList from './GameList';
import { BackgroundImageContext, UserContext } from './../App';

const User = () => {

  const { user } = useContext(UserContext);
  const { setBackgroundImage } = useContext(BackgroundImageContext);

  useEffect(() => {
    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');

    console.log(user);
  }, [])

  return (
    <div className='layout' >

      <GameList 
        title={ `My Watch List` }
        games={ user.watchlist }
      />

      <GameList 
        title={ `My Favourites` }
        games={ user.favourites }
      />

    </div>
  );

}

export default User;