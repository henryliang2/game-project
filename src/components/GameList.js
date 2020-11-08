import React, { useState, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import ScrollIndicator from './../resources/scroll-indicator.png';
import './../styles/App.css';
import './../styles/GameList.css';

export const GameCard = ({ game }) => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageRef = useRef(null);

  return (
    <div className='game-card'>
      { // Display loading spinner if not yet loaded
        !isImageLoaded &&
        <div className='game-card__spinner'>
          <CircularProgress color="secondary" />
        </div>
      }
      <Link to={`/game/${game.id}`}>
        <img 
          className='game-card__image'
          ref={ imageRef }
          src={ game.background_image } 
          alt={ game.name }
          onLoad={() => { 
            setIsImageLoaded(true);
            imageRef.current.classList.add('game-card__image--loaded') ;
          }}/>
      </Link>
      <div className='game-card__name'>{ game.name }</div>
    </div>
  );
}

const GameList = ({ games, title }) => {

  return (
    <React.Fragment>
      <div className='layout__title'>{ title }</div>
      <div className='game-card__container'>
        { games.length > 1 &&
          <img className='game-card__scroll-indicator' src={ ScrollIndicator } alt='scroll indicator'/>
        }
        { games.map((game, i) => {
            return <GameCard game={game} key={i}/>
          })
        }
        { !games.length &&
          <div className='spinner spinner--gamelist'>
            <CircularProgress size={160} color='secondary' />
          </div>
        }
      </div>
    </React.Fragment>
  )
}

export default GameList;