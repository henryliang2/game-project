import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import GameList from './GameList';

const Search = () => {

  const { queryString } = useParams();

  const [returnedGames, setReturnedGames] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/search/${queryString}`)
    .then(jsonData => jsonData.json())
    .then(data => { setReturnedGames(data.array) })
  }, [queryString]) //eslint-disable-line

  return (
    <div className='layout'>

      <GameList 
        title='Search Results'
        games={ returnedGames }
      />

    </div>
  );

}

export default Search;