import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import GameShowcase from './GameShowcase';
import { BackgroundImageContext, UserContext } from './../App';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LinkIcon from '@material-ui/icons/Link';
import ToggleButton from './ToggleButton';
import { SERVER_URL } from './../urls';
import './../styles/App.css';
import './../styles/Game.css';

const Game = () => {

  const { gameId } = useParams();

  const { user } = useContext(UserContext);
  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const [starArray, setStarArray] = useState([]);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [isInFavourites, setIsInFavourites] = useState(false);
  const [game, setGame] = useState({
    name: '',
    id: null,
    platforms: [],
    stars: null,
    description_string: ''
  });

  useEffect(() => {
    fetch(`${ SERVER_URL }/game/${gameId}`)
    .then(jsonData => jsonData.json())
    .then(data => { 
      setGame(data);
      if(data.background_image) setBackgroundImage(data.background_image);
    })
  }, []) //eslint-disable-line

  useEffect(() => {
    // Check if game is in watchlist or favourites
    if(user.userId) {
      user.watchlist.forEach((game, i) => {
        if(game.id.toString() === gameId) setIsInWatchList(true);
      })
      user.favourites.forEach((game, i) => {
        if(game.id.toString() === gameId) setIsInFavourites(true);
      })
    }

    // Create an Array representing stars of the form [1, 1, 1, 0.5, 0]
    if (game.stars) {
      const stars = [];
      for(let i=0; i < Math.floor(game.stars); i++) {
        stars.push(1);
      }
      if (Math.ceil(game.stars) !== game.stars) {
        stars.push(0.5);
      }
      for(let j=5; j > Math.ceil(game.stars); j--) {
        stars.push(0);
      }
      setStarArray(stars);
    }
  }, [game, user]) //eslint-disable-line

  return (
        <div className='layout'> 

          <div className='game__title'>
            { game.name }
            <div className='game__toggle-buttons'>
              <ToggleButton 
                type='watchlist' 
                isInCollection={ isInWatchList } 
                game={ game } 
                />
              <ToggleButton 
                type='favourites' 
                isInCollection={ isInFavourites } 
                game={ game } 
                />
            </div>
          </div>

          <div className='game__stars'>
            { starArray.map((star, i) => {
                if (star === 1) return <StarIcon fontSize='large' key={i}/>
                if (star === 0.5) return <StarHalfIcon fontSize='large' key={i}/>
                else return <StarBorderIcon fontSize='large' key={i}/>
              })}
          </div>

          <div className='game__showcase'>
            <GameShowcase game={ game } gameId={gameId} /> 
          </div>
          
          <div className='game__info'>
            <div className='game__description'>
              <div className='layout__title'>About This Game</div>
              { game.description_string }
            </div>
            <div className='game__rightcol'>
              { game.website &&
                <div className='game__website'>
                  <div className='layout__title'>Official Website</div>
                  <div className='website'>
                    <div className='website__icon'><LinkIcon fontSize='large'/></div>
                    <div className='website__link'>
                      <a href={game.website} alt='game website' target='_blank' rel='noopener noreferrer'>
                        { game.website }
                      </a>
                    </div>
                  </div>
                </div>
              }
              <div className='game__platforms'>
                <div className='layout__title'>Platforms</div>
                { game.platforms.map((platform, i) => {
                    return (
                      <div className='platform' key={i}>
                        <div className='platform__icon'>{ 
                          ['PC', 'macOS', 'Linux'].includes(platform.platform.name)
                          ? <DesktopWindowsIcon fontSize='large' />
                          : <SportsEsportsIcon fontSize='large' />
                        }</div>
                        <div className='platform__name'>{ platform.platform.name }</div>
                      </div>);
                })}
              </div>
            </div>
          </div>
        </div>
  );
}

export default Game;