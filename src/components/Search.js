import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import GameList from './GameList';
import { BackgroundImageContext } from './../App';

const Search = () => {

  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const { queryString } = useParams();

  const [returnedGames, setReturnedGames] = useState([]);

  useEffect(() => {

    setReturnedGames([]);

    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');

    fetch(`http://localhost:8080/search/${queryString}`)
    .then(jsonData => jsonData.json())
    .then(data => { setReturnedGames(data.array) })
  }, [queryString]) //eslint-disable-line

  return (
    <div className='layout' >

      <GameList 
        title={ `Results for "${ queryString }"` }
        games={ returnedGames }
      />

    </div>
  );

}

export default Search;