import React, { useContext, useRef, useEffect } from 'react';
import { UserContext } from './../App';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import './../styles/AddButton.css';

const AddButton = ({ game, type }) => {

  const { user, setUser } = useContext(UserContext);

  const spanRef = useRef(null);

  const addGameToWatchList = () => {
    const userCopy = { ...user };

    const gameObject = {
      id: game.id,
      name: game.name,
      stars: game.stars,
      background_image: game.background_image,
      description_string: game.description_string,
    };

    if(game.clip) gameObject.clip = game.clip;

    if (type === 'watchlist') {
      userCopy.watchlist = [...user.watchlist, gameObject];
    }
    else {
      userCopy.favourites = [...user.favourites, gameObject];
    }

    setUser(userCopy);
  }

  return (
    <React.Fragment>
      <span 
        className='add-button' 
        onClick={ addGameToWatchList } 
        ref={ spanRef } 
      >
        {
          type === 'watchlist'
          ? <VisibilityOutlinedIcon fontSize='large'/>
          : <FavoriteBorderOutlinedIcon fontSize='large'/>
        }
        
      </span>
    </React.Fragment>
  );

}

export default AddButton;