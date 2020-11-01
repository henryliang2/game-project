import React, { useEffect, useState } from 'react';
import './../styles/Landing.css'

const Landing = () => {

  const [upcomingGames, setUpcomingGames] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/upcoming')
    .then(jsonData => jsonData.json())
    .then(data => {
      setUpcomingGames(data.results.slice(0, 3))
    })
  }, [])

  return (
    <div className='layout'>

    { upcomingGames.length &&

      <div className='landing'>
        <div className='landing__image landing__image--left'>
          
            <img src={ upcomingGames[0].background_image } alt={ upcomingGames[0].name } />
        </div>
        <div className='landing__text landing__text--left'>
          { upcomingGames[0].name }
        </div>
        <div className='landing__image landing__image--right-top'>
          <img src={ upcomingGames[1].background_image } alt={ upcomingGames[1].name } />
        </div>
        <div className='landing__text landing__text--right-top'>
          { upcomingGames[1].name }
        </div>
        <div className='landing__image landing__image--right-top'>
          <img src={ upcomingGames[2].background_image } alt={ upcomingGames[2].name } />
        </div>
        <div className='landing__text landing__text--right-bottom'>
          { upcomingGames[2].name }
        </div>
      </div>

      }

    </div>
  );

}

export default Landing;