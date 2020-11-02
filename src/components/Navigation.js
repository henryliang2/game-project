import React from 'react';
import './../styles/Navigation.css'

const Navigation = () => {

  return (
    <div className='nav'>
      <div className='nav__layout'>
        <div className='nav__logo'>Game Project</div>
        <div className='nav__signin'><a href='http://localhost:8080/auth/google'>Login</a></div>
      </div>
    </div>
  );

}

export default Navigation;