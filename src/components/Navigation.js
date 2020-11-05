import React, { useContext, useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom"; //eslint-disable-line
import { UserContext } from './../App'
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './../styles/Navigation.css'

const Navigation = () => {

  const { user } = useContext(UserContext);

  const history = useHistory();
  const rightColRef = useRef(null);

  const [inputfield, setInputfield] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleClick = (e) => { 
      if (!rightColRef.current.contains(e.target)) {      // inside click     
       setShowDropdown(false)    
      } 
    };

    document.addEventListener('mousedown', handleClick);
  })

  return (
    <div className='nav'>
      <div className='nav__layout'>

        <Link to='/'>
          <div className='nav__logo'>
            <div className='nav__upper-box'>Game Project</div>
            <div className='nav__lower-triangle'></div>
          </div>
        </Link>

        <div className='nav__right-col' ref={ rightColRef }>
          <form onSubmit={(e) => { 
              e.preventDefault();
              history.push(`/search/${inputfield}`);
              setInputfield('');
            }
          }>
            <div className='nav__searchbar'>
              <input 
                type='text' 
                value={ inputfield }
                onChange={ (event) => { setInputfield(event.target.value) } }
                maxLength='24'
                placeholder='Search for a Game ...' 
                required />
            </div>
            <input className='hidden' type='submit'/>
          </form>

          { 
            user.userId

            ? <div 
                className='nav__user' 
                onClick={() => { if(user.userId) setShowDropdown(!showDropdown) 
                }}>
                  <div className='nav__profile-image'><img src={ user.image } alt='user'/></div>
                  <div className='nav__display-name'>{ user.displayName }</div>
                  { 
                    showDropdown && 
                    <div className='nav__dropdown' >
                      <Link to='/user'>
                        <div className='nav__dropdown-link'><PersonIcon />&nbsp;My Profile</div>
                      </Link>
                      <a href='https://game-project-server.herokuapp.com/auth/logout'>
                        <div className='nav__dropdown-link'><ExitToAppIcon />&nbsp;Logout</div>
                      </a>
                    </div> 
                  }
              </div>

            : <a href='https://game-project-server.herokuapp.com/auth/google'>
                <div className='nav__signin'>Sign In</div>
              </a>

          }
        </div>
      </div>
    </div>
  );

}

export default Navigation;