import React, { useState, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import './../styles/GameList.css';

export const GameCard = ({ game }) => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageRef = useRef(null);

  return (
    <div className='game-card'>

      { !isImageLoaded &&
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
          }}
          />
      </Link>
      <div className='game-card__name'>{ game.name }</div>
    </div>
  );
}

const GameList = ({ games, title }) => {

  return (
    <React.Fragment>
      { 
        title && <div className='layout__title'>{ title }</div>
      } 
      <div className='game-card__container'>
        { 
          games.map((game, i) => {
            return <GameCard game={game} key={i}/>
          })
        }
      </div>
    </React.Fragment>
  )
}

export default GameList;