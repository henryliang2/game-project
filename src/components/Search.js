import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom"; //eslint-disable-line
import './../styles/App.css';
import './../styles/User.css';
import { SERVER_URL } from './../urls';
import GameList from './GameList';
import { BackgroundImageContext } from './../App';
import { CircularProgress } from '@material-ui/core';

const Search = ({type}) => {

  const { setBackgroundImage } = useContext(BackgroundImageContext);

  const { queryString, dateString, orderingString } = useParams();

  const [returnedGames, setReturnedGames] = useState([]);
  const [hasApiResponse, setHasApiResponse] = useState(false);

  useEffect(() => {

    setReturnedGames([]);
    setHasApiResponse(false);

    setBackgroundImage(process.env.PUBLIC_URL + '/default-background.jpg');
    if (type === 'targeted') {
      fetch(`${ SERVER_URL }/search/${queryString}`)
      .then(jsonData => jsonData.json())
      .then(data => { 
        setReturnedGames(data.array);
        setHasApiResponse(true); 
      })
      .catch(e => { setHasApiResponse(true) })
    } else if (type === 'browse') {
      fetch(`${ SERVER_URL }/browse/${dateString}/${orderingString}`)
      .then(jsonData => jsonData.json())
      .then(data => { 
        setReturnedGames(data.array);
        setHasApiResponse(true); 
      })
      .catch(e => { setHasApiResponse(true) })
    }
    
  }, [queryString]) //eslint-disable-line

  return (
    <div className='layout' >

      { hasApiResponse && returnedGames.length === 0

        ? <React.Fragment>
            <div className='layout__title'>{`Results for "${ queryString }"`}</div>
            <div className='blank-list__area'>No Results Found! Try a different search term.</div>
          </React.Fragment>

        : <GameList 
            title={ `Results for "${ queryString }"` }
            games={ returnedGames }
          />
      }

      { // Show spinner if API Response not received
        !hasApiResponse && 
          <div className='search__spinner'>
            <CircularProgress size={180} color='secondary' />
          </div>
      }
      

    </div>
  );

}

export default Search;