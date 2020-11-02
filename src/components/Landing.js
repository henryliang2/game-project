import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import './../styles/Landing.css';

const Landing = () => {

  const [upcomingGames, setUpcomingGames] = useState([]);
  
  useEffect(() => {
    if(!upcomingGames.length) {
      fetch('http://localhost:8080/upcoming')
      .then(jsonData => jsonData.json())
      .then(data => {
        setUpcomingGames(data.results.slice(0, 3))
      })
    }
  }, []) // eslint-disable-line

  return (
    <div className='layout'>

      <div className='layout__title'>Upcoming</div>
    
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

    </div>
  );

}

export default Landing;