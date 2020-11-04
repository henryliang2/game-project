import React, { useContext, useRef, useState, useEffect } from 'react';
import { UserContext } from './../App';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ReactTooltip from 'react-tooltip';
import './../styles/ToggleButton.css';

const ToggleButton = ({ game, type, isInCollection }) => {

  const { user, setUser } = useContext(UserContext);

  const spanRef = useRef(null);

  const [showFullIcon, setShowFullIcon] = useState(false);

  useEffect(() => {
    setShowFullIcon(isInCollection)
  }, [isInCollection])

  useEffect(() => {
    if(type === 'watchlist') {
      spanRef.current.classList.add('toggle-button--watchlist');
    } else {
      spanRef.current.classList.add('toggle-button--favourites');
    }
    
  })

  const addGame = () => {
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
    setShowFullIcon(true);
  }

  const removeGame = () => {
    const userCopy = { ...user };

    if (type === 'watchlist') {
      user.watchlist.forEach((collectionGame, i) => {
        if (collectionGame.id === game.id ){
          userCopy.watchlist.splice(i, 1)
        }
      })
    } else {
      user.favourites.forEach((collectionGame, i) => {
        if (collectionGame.id === game.id ){
          userCopy.favourites.splice(i, 1)
        }
      })
    }

    setUser(userCopy);
    setShowFullIcon(false);
  }

  return (
    <React.Fragment>
      <span 
        className='toggle-button' 
        ref={ spanRef }
        onClick={ () => {
          if(!user.userId) return;
          showFullIcon ? removeGame() : addGame()
        }}>
        {
          (type === 'watchlist' && showFullIcon) && 
            <VisibilityIcon style={{ fill: 'green' }} fontSize='large'/>
        }
        {
          (type === 'watchlist' && !showFullIcon) && 
            <VisibilityOutlinedIcon 
              data-tip={ user.userId ? 'Add this game to your watchlist!' : 'Sign in to add this game to your watchlist!' }
              fontSize='large'
            />
        }
        {
          (type === 'favourites' && showFullIcon) && 
            <FavoriteIcon style={{ fill: 'red' }} fontSize='large'/>
        }
        {
          (type === 'favourites' && !showFullIcon) && 
            <FavoriteBorderOutlinedIcon 
              data-tip={ user.userId ? 'Add this game to your favourites!' : 'Sign in to add this game to your favourites!' }
              fontSize='large'
            />
        }
      </span>

      { // Show Tooltip if no user signed in
        user.userId 
        ? <ReactTooltip type='dark' effect='solid'/>
        : <ReactTooltip type='error' effect='solid'/>
      }
    </React.Fragment>
  );

}

export default ToggleButton;