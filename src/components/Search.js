import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import './../styles/User.css';
import GameList from './GameList';
import { BackgroundImageContext } from './../App';

const Search = ({type}) => {

  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const { queryString, dateString, orderingString } = useParams();

  const [returnedGames, setReturnedGames] = useState([]);

  useEffect(() => {

    setReturnedGames([]);

    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');
    if (type === 'targeted') {
      fetch(`https://game-project-server.herokuapp.com/search/${queryString}`)
      .then(jsonData => jsonData.json())
      .then(data => { setReturnedGames(data.array); console.log(data) })
    } else if (type === 'browse') {
      fetch(`https://game-project-server.herokuapp.com/browse/${dateString}/${orderingString}`)
      .then(jsonData => jsonData.json())
      .then(data => { setReturnedGames(data.array) })
    }
    
  }, [queryString]) //eslint-disable-line

  return (
    <div className='layout' >

      { returnedGames.length 

        ? <GameList 
            title={ `Results for "${ queryString }"` }
            games={ returnedGames }
          />
        : <React.Fragment>
            <div className='layout__title'>{`Results for "${ queryString }"`}</div>
            <div className='blank-list__area'>No Results Found! Try a different search term.</div>
          </React.Fragment>
      }

      

    </div>
  );

}

export default Search;