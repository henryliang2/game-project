import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import './../styles/Popular.css';

const Popular = () => {

  const [games, setGames] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:8080/popular')
    .then(jsonData => jsonData.json())
    .then(data => { 
      const gameArray = data.results.slice(0, 6);
      console.log(gameArray);
      setGames(gameArray); 
    })
  }, [])

  return (
    <div className='layout'>
      <div className='layout__title'>Popular</div>
      <div className='game-card__container'>
        {
          games.map((game, i) => {
            return (
              <div className='game-card' key={i}>
                <Link to={`/game/${game.id}`}>
                  <img src={ game.background_image }/>
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

export default Popular;