import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/User.css';
import './../styles/App.css';
import GameList from './GameList';
import { BackgroundImageContext, UserContext } from './../App';

const User = () => {

  const { user } = useContext(UserContext);
  const { setBackgroundImage } = useContext(BackgroundImageContext);

  useEffect(() => {
    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');
  }, []) //eslint-disable-line

  return (
    <div className='layout' >
      { user.watchlist.length
        ? <GameList 
            title={ `My Watch List` }
            games={ user.watchlist }
          />
        : <React.Fragment>
            <div className='layout__title'>My Watchlist</div>
            <div className='blank-list__area'>Add games to your watchlist to save them here!</div>
          </React.Fragment>
      }
      { user.favourites.length
        ? <GameList 
            title={ `My Favourites` }
            games={ user.favourites }
          />
        : <React.Fragment>
            <div className='layout__title'>My Favourites</div>
            <div className='blank-list__area'>Add games to your favourites to save them here!</div>
          </React.Fragment>
      }
    </div>
  );

}

export default User;