import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import { UserContext } from './../App'
import './../styles/Navigation.css'

const Navigation = () => {

  const { user } = useContext(UserContext);

  console.log(user);

  return (
    <div className='nav'>
      <div className='nav__layout'>

        <Link to='/'>
          <div className='nav__logo'>Game Project</div>
        </Link>

        <div className='nav__right-col'>
          <div className='nav__searchbar'>
            <input type='text'
              placeholder='Search for a Game ...'
            />
          </div>
          { 
            user.userId

            ? <div className='nav__user'>
                <div className='nav__profile-image'><img src={ user.image } alt='user'/></div>
                <div className='nav__display-name'>{ user.displayName }</div>
              </div>

            : <a href='http://localhost:8080/auth/google'>
                <div className='nav__signin'>Sign In</div>
              </a>

          }
        </div>
      </div>
    </div>
  );

}

export default Navigation;