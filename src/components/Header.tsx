import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='app-header'>
      <h2>Sales pipeline</h2>
      <div className='app-header--user-container'>
        <img src="/generic-user-icon.jpg" className="user-img" alt="User image" />
        <span>User name</span>
      </div>
    </header>
  );
}

export default Header;
