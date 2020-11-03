import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom"; //eslint-disable-line
import { UserContext } from './../App'
import './../styles/Navigation.css'

const Navigation = () => {

  const { user } = useContext(UserContext);

  const [inputfield, setInputfield] = useState('');

  const history = useHistory();

  return (
    <div className='nav'>
      <div className='nav__layout'>

        <Link to='/'>
          <div className='nav__logo'>
            <div className='nav__upper-box'>Game Project</div>
            <div className='nav__lower-triangle'></div>
          </div>
        </Link>

        <div className='nav__right-col'>
          <form onSubmit={(e) => { 
              e.preventDefault();
              history.push(`/search/${inputfield}`)
            }
          }>
            <div className='nav__searchbar'>
              <input 
                type='text' 
                onChange={ (event) => { setInputfield(event.target.value) } }
                placeholder='Search for a Game ...' />
            </div>
            <input className='hidden' type='submit'/>
          </form>

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