import React, { useEffect, useState, useContext, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom"; //eslint-disable-line
import { BackgroundImageContext } from './../App';
import GameList from './GameList';
import './../styles/App.css';
import './../styles/Landing.css';

const Landing = () => {

  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const [popularGames, setPopularGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const landingImageLeft = useRef(null);
  const landingImageRightTop = useRef(null);
  const landingImageRightCenter = useRef(null);

  const history = useHistory();

  const currDate = new Date();
  let threeMonthsAgo = new Date();
  let oneYearForward = new Date();
  let oneYearAgo = new Date();
  threeMonthsAgo.setMonth(currDate.getMonth() - 3);
  oneYearForward.setFullYear(currDate.getFullYear() + 1);
  oneYearAgo.setFullYear(currDate.getFullYear() - 1);
  const currDateString = currDate.toISOString().slice(0, 10);
  const threeMonthsAgoString = threeMonthsAgo.toISOString().slice(0, 10);
  const oneYearForwardString = oneYearForward.toISOString().slice(0, 10);
  const oneYearAgoString = oneYearAgo.toISOString().slice(0, 10);


  useEffect(() => {
    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');

    if(!upcomingGames.length) {
      fetch('https://game-project-server.herokuapp.com/upcoming')
      .then(jsonData => jsonData.json())
      .then(data => {
        setUpcomingGames(data.results.slice(0, 4))
      })
    }

    if(!popularGames.length) {
      fetch('https://game-project-server.herokuapp.com/popular')
      .then(jsonData => jsonData.json())
      .then(data => { 
        const gameArray = data.results.slice(0, 12);
        setPopularGames(gameArray); 
      })
    }
  }, []) // eslint-disable-line

  return (
    <div className='layout'>

      <div className='layout__title'>Most Anticipated Releases</div>
    
      { upcomingGames.length > 0 &&

        <div className='landing'>
          <div className='landing__image landing__image--left'>
            <Link to={`/game/${upcomingGames[0].id}`}> 
              <img 
                className='img'
                ref={landingImageLeft} 
                src={ upcomingGames[0].background_image } 
                alt={ upcomingGames[0].name } 
                onLoad={() => { landingImageLeft.current.classList.add('img--loaded') }}
                />
              <div className='landing__text-overlay'>{ upcomingGames[0].name }</div>
              </Link>
            </div>
          <div className='landing__image landing__image--right-top'>
            <Link to={`/game/${upcomingGames[1].id}`}>
              <img 
                className='img'
                ref={landingImageRightTop} 
                src={ upcomingGames[1].background_image } 
                alt={ upcomingGames[1].name } 
                onLoad={() => { landingImageRightTop.current.classList.add('img--loaded') }}
                />
              <div className='landing__text-overlay'>{ upcomingGames[1].name }</div>
              </Link>
            </div>
          
          <div className='landing__image landing__image--right-center'>
            <Link to={`/game/${upcomingGames[2].id}`}>
              <img 
                className='img'
                ref={landingImageRightCenter} 
                src={ upcomingGames[2].background_image } 
                alt={ upcomingGames[2].name } 
                onLoad={() => { landingImageRightCenter.current.classList.add('img--loaded') }}
                />
              <div className='landing__text-overlay'>{ upcomingGames[2].name }</div>
            </Link>
          </div>

          <div className='landing__select'>
            <div className='layout__title'>Browse for Games</div>
            <form onSubmit={(event) => {
              event.preventDefault();
              if (!selectValue) return;
              history.push(`/browse/${selectValue}`)
            }}>
              <div className='select'>
                <select 
                  value={selectValue}
                  onChange={(event) => { setSelectValue(event.target.value); console.log(event.target) }
                }>
                  <option value=''>
                    Select An Option
                  </option>
                  <option value={`${currDateString},${oneYearForwardString}/-added/Most Anticipated This Year`}>
                    Most Anticipated This Year
                  </option>
                  <option value={`${threeMonthsAgoString},${currDateString}/-added/Popular in Past 3 Months`}>
                    Popular in Past 3 Months
                  </option>
                  <option value={`${oneYearAgoString},${currDateString}/-added/Popular in Past Year`}>
                    Popular in Past Year
                  </option>
                  <option value={`${threeMonthsAgoString},${currDateString}/-rating/Highest Rated in Past 3 Months`}>
                    Highest Rated in Past 3 Months
                  </option>
                  <option value={`${oneYearAgoString},${currDateString}/-rating/Highest Rated in Past Year`}>
                    Highest Rated in Past Year
                  </option>
                </select>
                <input type='submit' value='Browse' className='select__submit' />
              </div>
            </form>
          </div>
        </div>

      }

      <GameList 
        title={ 'Trending' }
        games={ popularGames } 
      />

    </div>
  );

}

export default Landing;