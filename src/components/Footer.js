import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; //eslint-disable-line
import GitHubIcon from '@material-ui/icons/GitHub';
import './../styles/App.css'
import './../styles/Footer.css'

const Footer = () => {

  return (
    <div className='footer__background'>
      <div className='layout'>
        <div className='footer'>
          <div className='footer__leftcol'>
            <Link to='/'>
              <div className='footer__logo'>Game Project</div>
            </Link>
            <a href='https://github.com/henryliang2' target='_blank' rel='noopener noreferrer'>
              <div className='footer__github'>
                  <GitHubIcon fontSize='large' />
              </div>
            </a>
          </div>
          <a href='https://rawg.io/apidocs' target='_blank' rel='noopener noreferrer'>
            <div className='footer__rawg'>
                data and images from RAWG API
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;