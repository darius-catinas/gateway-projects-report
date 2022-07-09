import React from 'react';
import './Navbar.css';

interface NavbarAvatarProps{
    firstName: string,
    lastName: string
}

const NavbarAvatar = ({ firstName, lastName }: NavbarAvatarProps) => {
  return (
    <div className="navbar-avatar-container">
      <div className="navbar-avatar-rect">
        {`${firstName[0]} ${lastName[0]}`}
      </div>
      <div className="navbar-avatar-name">
        {`${firstName} ${lastName}` }
      </div>
    </div>
  )
}

export default NavbarAvatar;
