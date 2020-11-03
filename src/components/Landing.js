import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import { BackgroundImageContext } from './../App';
import GameList from './GameList';
import './../styles/App.css';
import './../styles/Landing.css';

const Landing = () => {

  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const [popularGames, setPopularGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {

    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');

    if(!upcomingGames.length) {
      fetch('http://localhost:8080/upcoming')
      .then(jsonData => jsonData.json())
      .then(data => {
        setUpcomingGames(data.results.slice(0, 3))
      })
    }

    if(!popularGames.length) {
      fetch('http://localhost:8080/popular')
      .then(jsonData => jsonData.json())
      .then(data => { 
        const gameArray = data.results.slice(0, 6);
        setPopularGames(gameArray); 
      })
    }
  }, []) // eslint-disable-line

  return (
    <div className='layout'>

      <div className='layout__title'>Most Anticipated Games</div>
    
      { upcomingGames.length &&

        <div className='landing'>
          <div className='landing__image landing__image--left'>
            <Link to={`/game/${upcomingGames[0].id}`}> 
              <img src={ upcomingGames[0].background_image } alt={ upcomingGames[0].name } />
              <div className='landing__text-overlay'>{ upcomingGames[0].name }</div>
              </Link>
            </div>
          <div className='landing__image landing__image--right-top'>
            <Link to={`/game/${upcomingGames[1].id}`}>
              <img src={ upcomingGames[1].background_image } alt={ upcomingGames[1].name } />
              <div className='landing__text-overlay'>{ upcomingGames[1].name }</div>
              </Link>
            </div>
          
          <div className='landing__image landing__image--right-top'>
            <Link to={`/game/${upcomingGames[2].id}`}>
              <img src={ upcomingGames[2].background_image } alt={ upcomingGames[2].name } />
              <div className='landing__text-overlay'>{ upcomingGames[2].name }</div>
              </Link>
            </div>
          
        </div>

      }

      <GameList 
        title={ 'Popular Games' }
        games={ popularGames } 
      />

    </div>
  );

}

export default Landing;