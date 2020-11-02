import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import './../styles/GameList.css';

const GameList = ({ games }) => {

  return (
    <div className='layout'>
      <div className='layout__title'>Popular</div>
      <div className='game-card__container'>
        {
          games.map((game, i) => {
            return (
              <div className='game-card' key={i}>
                <Link to={`/game/${game.id}`}>
                  <img src={ game.background_image } alt={ game.name }/>
                </Link>
                <div className='game-card__name'>{ game.name }</div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default GameList;