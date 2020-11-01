import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import GameShowcase from './GameShowcase';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import './../styles/App.css';
import './../styles/Game.css';

const Game = () => {

  const { gameId } = useParams();

  const [game, setGame] = useState({})

  const [starArray, setStarArray] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/game/${gameId}`)
    .then(jsonData => jsonData.json())
    .then(data => { console.log(data); setGame(data) })
  }, []);

  useEffect(() => {
    if (game.stars) {
      console.log(game.stars);
      const stars = [];
      for(let i=0; i < Math.floor(game.stars); i++) {
        stars.push(1);
      }
      if (Math.ceil(game.stars) != game.stars) {
        stars.push(0.5);
      }
      for(let j=5; j > Math.ceil(game.stars); j--) {
        stars.push(0);
      }
      setStarArray(stars);
      console.log(stars)
    }
  }, [game])

  return (
      <div className='game__background' style={{
        backgroundImage: `url(${game.background_image})`
      }}>
        <div className='game__background-gradient'></div>
        <div className='layout'> 
          <div className='game__title'>{ game.name }</div>
          <div className='game__stars'>
            {
              starArray.map((star, i) => {
                if (star === 1) return <StarIcon fontSize='large' key={i}/>
                if (star === 0.5) return <StarHalfIcon fontSize='large' key={i}/>
                if (star === 0) return <StarBorderIcon fontSize='large' key={i}/>
              })
            }
          </div>
          <div className='game__desc'>{ game.description_string }</div>
          <div className='game__showcase'>
            { game.id && 
              <GameShowcase game={ game } gameId={gameId} /> 
            }
          </div>
        </div>
      </div>
  );
}

export default Game;