import React from 'react';
import { ReactComponent as BLogo } from '../../assets/nav/b-logo.svg';
import { ReactComponent as Hamburger } from '../../assets/nav/hamburger.svg';

import './Navbar.css';
import NavbarAvatar from './NavbarAvatar';

const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="navbar-icon">
          <BLogo />
        </div>
        <div className="navbar-icon">
          <Hamburger />
        </div>
      </div>
      <div className="navbar-center" />
      <div className="navbar-right">
        <NavbarAvatar firstName="John" lastName="Doe" />
      </div>
    </div>
  )
}

export default Navbar;
