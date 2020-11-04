import React, { useContext, useRef, useState, useEffect } from 'react';
import { UserContext } from './../App';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import './../styles/ToggleButton.css';

const ToggleButton = ({ game, type, isInCollection }) => {

  const { user, setUser } = useContext(UserContext);

  const spanRef = useRef(null);

  const [showFullIcon, setShowFullIcon] = useState(false);

  useEffect(() => {
    setShowFullIcon(isInCollection)
  }, [isInCollection])

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
        className='add-button' 
        onClick={ () => {
          if(!user.userId) return;
          showFullIcon ? removeGame() : addGame()
        } } 
        ref={ spanRef }>
        {
          (type === 'watchlist' && showFullIcon) && <VisibilityIcon fontSize='large'/>
        }
        {
          (type === 'watchlist' && !showFullIcon) && <VisibilityOutlinedIcon fontSize='large'/>
        }
        {
          (type === 'favourites' && showFullIcon) && <FavoriteIcon fontSize='large'/>
        }
        {
          (type === 'favourites' && !showFullIcon) && <FavoriteBorderOutlinedIcon fontSize='large'/>
        }
      </span>
    </React.Fragment>
  );

}

export default ToggleButton;